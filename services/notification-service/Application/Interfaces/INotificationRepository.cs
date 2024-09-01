using Notifications.Api.Domain.Entities;

namespace Notifications.Api.Application.Interfaces
{
	public interface INotificationRepository
	{
		Task Create(Notification notification);
		Task<IEnumerable<Notification>> GetBillingNotificationsAsync(string userId, string billingId);
		Task<IEnumerable<Notification>> GetCustomNotificationsAsync(string userId, string customIdentifier);
		Task<IEnumerable<Notification>> GetMessageNotificationsAsync(string userId, string messageId);
		Task<IEnumerable<Notification>> GetNotificationsAsync(string userId);
		Task<IEnumerable<Notification>> GetProjectNotificationsAsync(string userId, string projectId);
		Task<IEnumerable<Notification>> GetProjectUpdateNotificationsAsync(string userId, string projectId);
		Task<IEnumerable<Notification>> GetUnreadNotificationsAsync(string userId);
		Task MarkNotificationAsReadAsync(int notificationId);
		Task NavigateToProjectAsync(int projectId);
	}
}
