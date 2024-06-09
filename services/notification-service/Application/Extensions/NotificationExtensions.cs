using Notifications.Api.Domain.Entities;

namespace Notifications.Api.Application.Extensions
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
