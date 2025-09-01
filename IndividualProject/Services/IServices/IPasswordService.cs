namespace IndividualProject.Services.IServices
{
    public interface IPasswordService
    {
        Task SendVerificationCodeAsync(string email);
        public Task<bool> VerifyOtpAsync( string verificationCode);
        public Task SendOtpAsync(string email);
        public Task<bool> ResetPasswordAsync(string newPassword);
    }
}
