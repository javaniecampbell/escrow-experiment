using Notifications.Api.Domain.Entities;

namespace Notifications.Api.Application.Services
{
	public interface INotificationService
	{
		Task DisableNotificationTypeAsync(string userId, string type);
		Task EnableNotificationTypeAsync(string userId, string type);
		Notification GenerateNotification(NotificationType notificationType);
		Task<IEnumerable<Notification>> GetAllNotificationsAsync(string userId);
		Task<IEnumerable<Notification>> GetBillingNotificationsAsync(string userId, int billingId);
		Task<IEnumerable<Notification>> GetCustomNotificationsAsync(string userId, string customIdentifier);
		Task<IEnumerable<Notification>> GetMessageNotificationsAsync(string userId, int messageId);
		Task<IEnumerable<Notification>> GetNotificationsAsync(string userId);
		Task<IEnumerable<Notification>> GetProjectNotificationsAsync(string userId, string projectId);
		Task<IEnumerable<Notification>> GetProjectUpdateNotificationsAsync(string userId, string projectId);
		Task<IEnumerable<Notification>> GetUnreadNotificationsAsync(string userId);
		Task<IEnumerable<Notification>> GetUnreadNotificationsOrderedByCreateAtAsync(string userId);
		Task MarkNotificationAsReadAsync(int notificationId);
		Task MarkNotificationAsReadAsync(string notificationId);
		Task NavigateToProjectAsync(int projectId);
		Task SendNotificationAsync(Notification notification, string userId);
	}
}