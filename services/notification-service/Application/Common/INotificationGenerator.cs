using Notifications.Api.Domain.Entities;

namespace Notifications.Api.Application.Common
{
	public interface INotificationGenerator
	{
		Notification GenerateBillingReminderNotification(string userId, string projectTitle, DateTime dueDate);
		Notification GenerateCustomNotification(string userId, string title, string message);
		Notification GenerateDocumentUploadedNotification(string userId, string projectName, string documentName);
		Notification GenerateMessageReceivedNotification(string userId, string senderName);
		Notification GenerateMilestoneCompletedNotification(string userId, string projectName, string milestoneTitle);
		Notification GenerateNewProjectAssignedNotification(string userId, string projectName);
		Notification GenerateProjectUpdateNotification(string userId, string projectTitle, string message);
		Notification GenerateProjectUpdateNotificationForProject(string message, string projectId, string userId);
	}
}