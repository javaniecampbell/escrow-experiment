using NotificationService.Api.Domain.Entities;

namespace NotificationService.Api.Application.Common
{
	public class NotificationGenerator
	{
		public Notification GenerateProjectUpdateNotification(string message, int projectId, string userId)
		{
			// Generate and return a project update notification
			return new Notification
			{
				Message = message,
				//ProjectId = projectId,
				//UserId = userId,
				// Set other notification properties as needed
			};
		}

		// Add methods for generating other notification types
	}
}
