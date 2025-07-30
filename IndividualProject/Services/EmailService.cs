using IndividualProject.Services.IServices;
using System.Net;
using System.Net.Mail;

namespace IndividualProject.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        private SmtpClient ConfigureSmtpClient()
        {
            var smtpHost = _config["EmailConfiguration:Host"];
            var smtpPort = int.Parse(_config["EmailConfiguration:Port"]);
            var smtpUsername = _config["EmailConfiguration:Username"];
            var smtpPassword = _config["EmailConfiguration:Password"];

            if (string.IsNullOrEmpty(smtpHost)||string.IsNullOrEmpty(smtpPort.ToString())||
                string.IsNullOrEmpty(smtpUsername)||string.IsNullOrEmpty(smtpPassword)) 
            {
                throw new InvalidOperationException("Email configuration settings are not properly set.");
            }

            var smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true,
                UseDefaultCredentials =false
            };

            return smtpClient;
        }

        public async Task SendEmailAsync(string recipient, string subject, string body)
        {
            var smtpClient = ConfigureSmtpClient();
            var smtpFrom = _config["EmailConfiguration:From"];

            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpFrom),
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
                Console.WriteLine($"Error Sending Email:{ex.Message}");
                throw new InvalidOperationException("Failed to send Email.", ex);
            }
        }

        public async Task SendVerificationCodeAsync(string email, string verificationCode)
        {
            if (string.IsNullOrEmpty(verificationCode)) 
            {
                throw new ArgumentNullException(nameof(verificationCode), "Verification Code Cannot be Null or Empty");
            }

            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException(nameof(email), "Email Cannot be Null or Empty");
            }

            var emailSubject = "Verification Code For Tribalist";
            var emailMessage = $@"";

            await SendEmailAsync(email, emailSubject, emailMessage);
        }
    }
}
