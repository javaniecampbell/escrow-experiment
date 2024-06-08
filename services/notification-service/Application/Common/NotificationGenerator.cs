using NotificationService.Api.Domain.Entities;

namespace NotificationService.Api.Application.Common
{
	public class NotificationGenerator
	{
		public Notification GenerateProjectUpdateNotification(string message, string projectId, string userId)
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
	}
}
