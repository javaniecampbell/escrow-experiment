using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NotificationService.Api.Application.Extensions;
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
		public async Task MarkNotificationAsReadAsync(int notificationId)
		{
			var notification = await _context.Notifications.FindAsync(notificationId);
			if (notification != null)
			{
				notification.MarkAsRead();
				await _context.SaveChangesAsync();
			}
		}

		public async Task<IEnumerable<Notification>> GetUnreadNotificationsAsync(string userId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId && !n.IsRead)
				.ToListAsync();
		}

		public async Task<IEnumerable<Notification>> GetAllNotificationsAsync(string userId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId)
				.ToListAsync();
		}

		public async Task EnableNotificationTypeAsync(string userId, string type)
		{
			var user = await _context.Users.Include(u => u.NotificationSetting)
				.FirstOrDefaultAsync(u => u.Id == userId);

			if (user != null)
			{
				user.NotificationSetting ??= new NotificationSetting();
				user.NotificationSetting.EnableNotificationType(type);
				await _context.SaveChangesAsync();
			}
		}

		public async Task DisableNotificationTypeAsync(string userId, string type)
		{
			var user = await _context.Users.Include(u => u.NotificationSetting)
				.FirstOrDefaultAsync(u => u.Id == userId);

			if (user != null)
			{
				user.NotificationSetting ??= new NotificationSetting();
				user.NotificationSetting.DisableNotificationType(type);
				await _context.SaveChangesAsync();
			}
		}

		public async Task<IEnumerable<Notification>> GetNotificationsAsync(string userId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();
		}

		public async Task<IEnumerable<Notification>> GetUnreadNotificationsOrderedByCreateAtAsync(string userId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId && !n.IsRead)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();
		}

		public async Task MarkNotificationAsReadAsync(string notificationId)
		{
			var notification = await _context.Notifications.FindAsync(notificationId);
			if (notification != null)
			{
				notification.IsRead = true;
				await _context.SaveChangesAsync();
			}
		}

		public async Task<IEnumerable<Notification>> GetProjectNotificationsAsync(string userId, string projectId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId && n.ProjectId == projectId)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();
		}

		public async Task NavigateToProjectAsync(int projectId)
		{
			// Implement the logic to navigate to the relevant project using projectId.
			// This could involve redirecting the user to the project's page or taking some other action.
			// You can use routing or other relevant mechanisms based on your application structure.
		}

	}
}
