using Microsoft.AspNetCore.SignalR;
using NotificationService.Api.Domain.Entities;
using NotificationService.Api.Hubs;
using NotificationService.Api.Infrastructure.Persistence.Context;

namespace NotificationService.Api.Application.Services
{
	public class NotificationService
	{
		private readonly IHubContext<NotificationsHub> _hubContext;
		private readonly NotificationDbContext _context;

		public NotificationService(IHubContext<NotificationsHub> hubContext, NotificationDbContext context)
		{
			_hubContext = hubContext;
			_context = context;
		}

		public async Task SendNotificationAsync(Notification notification, string userId)
		{
			// Save the notification to the database
			_context.Notifications.Add(notification);
			await _context.SaveChangesAsync();

			// Send the notification to the user
			await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", notification);
		}

		// Add methods for managing notifications, enabling/disabling notification types, etc.
	}
}
