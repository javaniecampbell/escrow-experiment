using Notifications.Api.Application.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net.Mail;
using System.Threading.Tasks;


namespace Notifications.Api.Infrastructure.Services
{
    public class EmailNotificationService : IEmailNotificationService
    {
        private readonly string _sendGridApiKey;

        public EmailNotificationService(string sendGridApiKey)
        {
            _sendGridApiKey = sendGridApiKey;
        }

        public async Task SendEmailNotificationAsync(string toEmail, string subject, string message)
        {
            var client = new SendGridClient(_sendGridApiKey);
            ///TODO: Replace email with some from configuration or better yet the email of user or freelancer that want to receive the notification
            var from = new EmailAddress("your_email@example.com", "Your Name");
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, message, message);
            var response = await client.SendEmailAsync(msg);
        }
    }

}
