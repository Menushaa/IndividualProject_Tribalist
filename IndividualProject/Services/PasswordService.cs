using IndividualProject.Data;
using IndividualProject.Models;
using IndividualProject.Repository.IRepository;
using IndividualProject.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace IndividualProject.Services
{
    public class PasswordService : IPasswordService
    {
        private static string _tempEmail; //temp email

        private readonly IEmailService _emailService;
        private readonly ISellerRepository _sellerRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly ApplicationDbContext _context;

        public PasswordService(IEmailService emailService, ISellerRepository sellerRepository,ICustomerRepository customerRepository, ApplicationDbContext context)
        {
            _emailService = emailService;
            _sellerRepository = sellerRepository;
            _customerRepository = customerRepository;
            _context = context;
        }

        private string GenerateOtp()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        public async Task SendVerificationCodeAsync(string email)
        {
            _tempEmail = email;

            var seller =  _sellerRepository.GetByMail(email);
            var customer = await _customerRepository.GetCustomerByEmailAsync(email);

            if (seller == null && customer == null)
                throw new KeyNotFoundException("Email not found");

            var otp = GenerateOtp();

            if (seller != null)
            {
                seller.Otp = otp;
                await _sellerRepository.UpdateAsync(seller);
            }
            else
            {
                customer.Otp = otp;
                await _customerRepository.UpdateAsync(customer);
            }

            await _emailService.SendVerificationCodeAsync(email, otp);
        }


        public async Task<bool> VerifyOtpAsync(string verificationCode)
        {
            var email = _tempEmail;

            var seller = await _sellerRepository.GetSellerByEmailAsync(email);
            var customer = await _customerRepository.GetCustomerByEmailAsync(email);

            if (seller != null && seller.Otp == verificationCode)
                return true;

            if (customer != null && customer.Otp == verificationCode)
                return true;

            return false;
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

        public async Task<bool> ResetPasswordAsync(string newPassword)
        {
            var email = _tempEmail;

            // ✅ Remove used OTP records from DB (keep your existing logic)
            var otpRecords = _context.OtpRecords.Where(o => o.Email == email.ToLower().Trim());
            _context.OtpRecords.RemoveRange(otpRecords);
            await _context.SaveChangesAsync();

            // ✅ Get seller & customer by email
            var seller = await _sellerRepository.GetSellerByEmailAsync(email);
            var customer = await _customerRepository.GetCustomerByEmailAsync(email);

            // ✅ Create instance of your existing password hashing class
            PasswordHash ph = new PasswordHash();

            if (seller != null)
            {
                seller.Password = ph.HashPassword(newPassword);
                seller.Otp = null; // Clear verification code after reset
                await _sellerRepository.UpdateAsync(seller);
                return true;
            }
            else if (customer != null)
            {
                customer.Password = ph.HashPassword(newPassword);
                customer.Otp = null; // Clear verification code after reset
                await _customerRepository.UpdateAsync(customer);
                return true;
            }

            return false; // If no matching user found
        }

    }
}
