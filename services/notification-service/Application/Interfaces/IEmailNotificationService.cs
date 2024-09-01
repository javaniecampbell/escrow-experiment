
namespace Notifications.Api.Application.Interfaces
{
	public interface IEmailNotificationService
	{
		Task SendEmailNotificationAsync(string toEmail, string subject, string message);
	}
}