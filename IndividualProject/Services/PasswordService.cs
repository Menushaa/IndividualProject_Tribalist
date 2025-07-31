using IndividualProject.Repository.IRepository;
using IndividualProject.Services.IServices;

namespace IndividualProject.Services
{
    public class PasswordService : IPasswordService
    {
        private readonly IEmailService _emailService;
        private readonly Dictionary<string, string> _otpStore = new();
        private readonly ISellerRepository _sellerRepository;

        public PasswordService(IEmailService emailService, ISellerRepository sellerRepository)
        {
            _emailService = emailService;
            _sellerRepository = sellerRepository;
        }

        public async Task SendVerificationCodeAsync(string email)
        {
            var seller = _sellerRepository.GetByMail(email);
            if (seller == null)
                throw new Exception("Seller not found");

            var verificationCode = new Random().Next(100000, 999999).ToString();

            // Store code temporarily
            _otpStore[email.ToLower()] = verificationCode;

            await _emailService.SendVerificationCodeAsync(email, verificationCode);
        }

        public Task<bool> VerifyOtpAsync(string email, string verificationCode)
        {
            var key = email.ToLower();
            if (_otpStore.TryGetValue(key, out string storedCode))
            {
                return Task.FromResult(storedCode == verificationCode);
            }
            return Task.FromResult(false);
        }

        public async Task<bool> ResetPasswordAsync(string email, string verificationCode, string newPassword)
        {
            var verified = await VerifyOtpAsync(email, verificationCode);
            if (!verified) return false;

            var seller = _sellerRepository.GetByMail(email);
            if (seller == null) return false;

            PasswordHash ph = new PasswordHash();
            seller.Password = ph.HashPassword(newPassword);

            await _sellerRepository.UpdateAsync(seller);
            _otpStore.Remove(email.ToLower()); // Clear used code

            return true;
        }
    }

}
