namespace IndividualProject.Services.IServices
{
    public interface IPasswordService
    {
        Task SendVerificationCodeAsync(string email);
        public Task<bool> VerifyOtpAsync(string email, string verificationCode);
        public Task<bool> ResetPasswordAsync(string email, string verificationCode, string newPassword);
    }
}
