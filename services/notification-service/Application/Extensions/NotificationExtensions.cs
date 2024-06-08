using NotificationService.Api.Domain.Entities;

namespace NotificationService.Api.Application.Extensions
{
	public static class NotificationExtensions
	{
		public static Notification MarkAsRead(this Notification notification)
		{
			notification.IsRead = true;
			return notification;
		}
		// Add more notification-related extensions as needed
	}
}
