using NotificationService.Api.Application.Services;
using NotificationService.Api.Domain.Entities;

namespace NotificationService.Api.Application.Common
{
	public enum NotificationType
	{
		ProjectUpdate,
		BillingReminder,
		NewMessage,
		MilestoneCompleted,
		MessageReceived,
		NewProjectAssigned,
		DocumentUploaded,
		Custom
	}
	public class NotificationGenerator
	{
		public Notification GenerateProjectUpdateNotificationForProject(string message, string projectId, string userId)
		{
			// Generate and return a project update notification
			var notification = new Notification
			{
				UserId = userId,
				//Type = NotificationType.ProjectUpdate,
				NotificationType = "Project Update",
				Message = message,
				//ProjectId = projectId
			};
			return notification;
		}

		// Add methods for generating other notification types
		public Notification GenerateProjectUpdateNotification(string userId, string projectTitle, string message)
		{
			var notification = new Notification
			{
				UserId = userId,
				//Type = NotificationType.ProjectUpdate,
				//Title = "Project Update: " + projectTitle,
				Message = message,
				CreatedAt = DateTime.UtcNow
			};
			return notification;
		}

		///TODO: Add method to generate billing reminder notification for a project should be a DTO
		public Notification GenerateBillingReminderNotification(string userId, string projectTitle, DateTime dueDate)
		{
			var notification = new Notification
			{
				UserId = userId,
				//Type = NotificationType.BillingReminder,
				//Title = "Billing Reminder: " + projectTitle,
				Message = $"A payment for {projectTitle} is due on {dueDate:d}.",
				CreatedAt = DateTime.UtcNow
			};

			//await _notificationService.SendNotificationAsync(notification, userId);
			return notification;
		}

		public Notification GenerateMessageReceivedNotification(string userId, string senderName)
		{
			var notification = new Notification
			{
				UserId = userId,
				//Type = NotificationType.MessageReceived,
				//Title = "New Message",
				Message = $"You have received a new message from {senderName}.",
				CreatedAt = DateTime.UtcNow
			};

			//await _notificationService.SendNotificationAsync(notification, userId);
			return notification;
		}

		public Notification GenerateMilestoneCompletedNotification(string userId, string projectName, string milestoneTitle)
		{
			var notification = new Notification
			{
				UserId = userId,
				//Type = NotificationType.MilestoneCompleted,
				//Title = "Milestone Completed: " + projectName,
				Message = $"{milestoneTitle} in {projectName} has been completed.",
				CreatedAt = DateTime.UtcNow
			};

			//await _notificationService.SendNotificationAsync(notification, userId);
			return notification;
		}

		public Notification GenerateNewProjectAssignedNotification(string userId, string projectName)
		{
			var notification = new Notification
			{
				UserId = userId,
				//Type = NotificationType.NewProjectAssigned,
				//Title = "New Project Assigned",
				Message = $"You have been assigned to a new project: {projectName}.",
				CreatedAt = DateTime.UtcNow
			};

			//await _notificationService.SendNotificationAsync(notification, userId);
			return notification;
		}

		public Notification GenerateDocumentUploadedNotification(string userId, string projectName, string documentName)
		{
			var notification = new Notification
			{
				UserId = userId,
				//Type = NotificationType.DocumentUploaded,
				//Title = "Document Uploaded: " + projectName,
				Message = $"A new document, {documentName}, has been uploaded to {projectName}.",
				CreatedAt = DateTime.UtcNow
			};

			//await _notificationService.SendNotificationAsync(notification, userId);
			return notification;
		}

		public Notification GenerateCustomNotification(string userId, string title, string message)
		{
			var notification = new Notification
			{
				UserId = userId,
				//Type = NotificationType.Custom,
				//Title = title,
				Message = message,
				CreatedAt = DateTime.UtcNow
			};

			//await _notificationService.SendNotificationAsync(notification, userId);
			return notification;
		}
	}
}
