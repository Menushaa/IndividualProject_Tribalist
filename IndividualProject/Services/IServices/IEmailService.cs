namespace IndividualProject.Services.IServices
{
    public interface IEmailService
    {
        Task SendVerificationCodeAsync(string email, string verificationCode);
        public Task SendEmailAsync(string recipient, string subject, string body);
    }
}
