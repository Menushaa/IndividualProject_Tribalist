using IndividualProject.Services.IServices;
using System.Net;
using System.Net.Mail;

namespace IndividualProject.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailService(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }

        private SmtpClient ConfigureSmtpClient()
        {
            var smtpClient = new SmtpClient(_emailConfig.Host, _emailConfig.Port)
            {
                Credentials = new NetworkCredential(_emailConfig.Username, _emailConfig.Password),
                EnableSsl = true,
                UseDefaultCredentials = false
            };

            return smtpClient;
        }

        public async Task SendEmailAsync(string recipient, string subject, string body)
        {
            var smtpClient = ConfigureSmtpClient();

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_emailConfig.From),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mailMessage.To.Add(recipient);

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error Sending Email: {ex.Message}");
                throw new InvalidOperationException("Failed to send Email.", ex);
            }
        }

        public async Task SendVerificationCodeAsync(string email, string verificationCode)
        {
            if (string.IsNullOrWhiteSpace(verificationCode))
                throw new ArgumentNullException(nameof(verificationCode), "Verification code cannot be null or empty.");

            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentNullException(nameof(email), "Email cannot be null or empty.");

            var emailSubject = "Verification Code For Tribalist";
            var emailMessage = $@"
                <h3>Your verification code</h3>
                <p>Please use the following code to reset your password:</p>
                <h2>{verificationCode}</h2>
                <p>This code will expire shortly. Do not share it with anyone.</p>";

            await SendEmailAsync(email, emailSubject, emailMessage);
        }
    }
}
