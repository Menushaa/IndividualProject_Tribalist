using IndividualProject.Data;
using IndividualProject.Models;
using IndividualProject.Repository.IRepository;
using IndividualProject.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace IndividualProject.Services
{
    public class PasswordService : IPasswordService
    {
        private readonly IEmailService _emailService;
        private readonly ISellerRepository _sellerRepository;
        private readonly ApplicationDbContext _context;

        public PasswordService(IEmailService emailService, ISellerRepository sellerRepository, ApplicationDbContext context)
        {
            _emailService = emailService;
            _sellerRepository = sellerRepository;
            _context = context;
        }

        private string GenerateOtp()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        public async Task SendVerificationCodeAsync(string email)
        {
            var seller = _sellerRepository.GetByMail(email);
            if (seller == null)
                throw new Exception("Seller not found");

            var code = GenerateOtp();
            var expiry = DateTime.UtcNow.AddMinutes(5);

            var otpRecord = new OtpRecord
            {
                Email = email.ToLower().Trim(),
                Code = code,
                ExpiryTime = expiry
            };

            _context.OtpRecords.Add(otpRecord);
            await _context.SaveChangesAsync();

            await _emailService.SendVerificationCodeAsync(email, code);
        }

        public async Task<bool> VerifyOtpAsync(string email, string verificationCode)
        {
            var otp = await _context.OtpRecords
                .Where(o => o.Email == email.ToLower().Trim())
                .OrderByDescending(o => o.ExpiryTime)
                .FirstOrDefaultAsync();

            if (otp == null || otp.ExpiryTime < DateTime.UtcNow)
                return false;

            return otp.Code.Trim() == verificationCode.Trim();
        }

        public async Task SendOtpAsync(string email)
        {
            var code = GenerateOtp();
            var expiry = DateTime.UtcNow.AddMinutes(5);

            var otpRecord = new OtpRecord
            {
                Email = email.ToLower().Trim(),
                Code = code,
                ExpiryTime = expiry
            };

            _context.OtpRecords.Add(otpRecord);
            await _context.SaveChangesAsync();

            await _emailService.SendVerificationCodeAsync(email, code);
        }

        public async Task<bool> ResetPasswordAsync(string email, string verificationCode, string newPassword)
        {
            var isValid = await VerifyOtpAsync(email, verificationCode);
            if (!isValid) return false;

            var seller = _sellerRepository.GetByMail(email);
            if (seller == null) return false;

            PasswordHash ph = new PasswordHash();
            seller.Password = ph.HashPassword(newPassword);

            await _sellerRepository.UpdateAsync(seller);

            var otpRecords = _context.OtpRecords.Where(o => o.Email == email.ToLower().Trim());
            _context.OtpRecords.RemoveRange(otpRecords);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
