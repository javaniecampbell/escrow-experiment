using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Notifications.Api.Application.Extensions;
using Notifications.Api.Application.Interfaces;
using Notifications.Api.Domain.Entities;
using Notifications.Api.Hubs;
using Notifications.Api.Infrastructure.Persistence.Context;

namespace Notifications.Api.Application.Services
{
	public class NotificationService : INotificationService
	{
		private readonly IHubContext<NotificationsHub> _hubContext;
		private readonly NotificationDbContext _context;
		private readonly ILogger _logger;
		private readonly INotificationRepository _notificationRepository;

		public NotificationService(IHubContext<NotificationsHub> hubContext, NotificationDbContext context, INotificationRepository notificationRepository, ILogger<NotificationService> logger)
		{
			_hubContext = hubContext;
			_context = context;
			_logger = logger;
			_notificationRepository = notificationRepository;
		}

		public async Task SendNotificationAsync(Notification notification, string userId)
		{
			// Save the notification to the database
			_context.Notifications.Add(notification);
			await _context.SaveChangesAsync();
			//_notificationRepository.Create(notification);

			// Send the notification to the user
			await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", notification);
		}

		// Add methods for managing notifications, enabling/disabling notification types, etc.
		public async Task MarkNotificationAsReadAsync(int notificationId)
		{
			var notification = await _context.Notifications.FindAsync(notificationId);
			// var notification = _notificationRepository.GetNotification(notificationId);
			if (notification != null)
			{
				notification.MarkAsRead();
				await _context.SaveChangesAsync();
			}

			//_notificationRepository.MarkAsRead(notificationId);
		}

		public async Task<IEnumerable<Notification>> GetUnreadNotificationsAsync(string userId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId && !n.IsRead)
				.ToListAsync();

			// return _notificationRepository.GetUnreadNotifications(userId);
		}

		public async Task<IEnumerable<Notification>> GetAllNotificationsAsync(string userId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId)
				.ToListAsync();

			// return _notificationRepository.GetAllNotifications(userId);
		}

		public async Task EnableNotificationTypeAsync(string userId, string type)
		{
			var user = await _context.Users.Include(u => u.NotificationSetting)
				.FirstOrDefaultAsync(u => u.Id == userId);

			// var user = _notificationRepository.GetUser(userId);
			if (user != null)
			{
				user.NotificationSetting ??= new NotificationSetting();
				user.NotificationSetting.EnableNotificationType(type);
				await _context.SaveChangesAsync();
			}

			// _notificationRepository.EnableNotificationType(userId, type);
		}

		public async Task DisableNotificationTypeAsync(string userId, string type)
		{
			var user = await _context.Users.Include(u => u.NotificationSetting)
				.FirstOrDefaultAsync(u => u.Id == userId);

			// var user = _notificationRepository.GetUser(userId);

			if (user != null)
			{
				user.NotificationSetting ??= new NotificationSetting();
				user.NotificationSetting.DisableNotificationType(type);
				await _context.SaveChangesAsync();

				// _notificationRepository.DisableNotificationType(userId, type);
			}
		}

		public async Task<IEnumerable<Notification>> GetNotificationsAsync(string userId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();

			// return _notificationRepository.GetNotificationsOrderedByCreatedAt(userId);
		}

		public async Task<IEnumerable<Notification>> GetUnreadNotificationsOrderedByCreateAtAsync(string userId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId && !n.IsRead)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();

			// return _notificationRepository.GetUnreadNotificationsOrderedByCreateAt(userId);
		}

		public async Task MarkNotificationAsReadAsync(string notificationId)
		{
			var notification = await _context.Notifications.FindAsync(notificationId);
			// var notification = _notificationRepository.GetNotification(notificationId);
			if (notification != null)
			{
				notification.IsRead = true;
				await _context.SaveChangesAsync();
			}

			// _notificationRepository.MarkAsRead(notificationId);
		}

		public async Task<IEnumerable<Notification>> GetProjectNotificationsAsync(string userId, string projectId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId && n.ProjectId == projectId)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();

			// return _notificationRepository.GetProjectNotifications(userId, projectId);
		}

		// GetBillingNotificationsAsync extension
		public async Task<IEnumerable<Notification>> GetBillingNotificationsAsync(string userId, int billingId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId
				//&& n.BillingId == billingId
				)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();

			// return _notificationRepository.GetBillingNotifications(userId, billingId);
		}

		// GetMessageNotificationsAsync extension
		public async Task<IEnumerable<Notification>> GetMessageNotificationsAsync(string userId, int messageId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId
				//&& n.MessageId == messageId
				)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();

			// return _notificationRepository.GetMessageNotifications(userId, messageId);
		}

		// GetCustomNotificationsAsync extension
		public async Task<IEnumerable<Notification>> GetCustomNotificationsAsync(string userId, string customIdentifier)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId
				//&& n.CustomIdentifier == customIdentifier
				)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();

			// return _notificationRepository.GetCustomNotifications(userId, customIdentifier);
		}

		// GetProjectUpdateNotificationsAsync extension
		public async Task<IEnumerable<Notification>> GetProjectUpdateNotificationsAsync(string userId, string projectId)
		{
			return await _context.Notifications
				.Where(n => n.UserId == userId
				&& n.ProjectId == projectId
				//&& n.Type == NotificationType.ProjectUpdate
				)
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();

			// return _notificationRepository.GetProjectUpdateNotifications(userId, projectId);
		}

		public async Task NavigateToProjectAsync(int projectId)
		{
			// Implement the logic to navigate to the relevant project using projectId.
			// This could involve redirecting the user to the project's page or taking some other action.
			// You can use routing or other relevant mechanisms based on your application structure.
		}

		/// <summary>
		/// Generates a new notification using the notification service and saves it to the database.
		/// </summary>
		/// <param name="notificationType"></param>
		/// <returns></returns>
		/// <exception cref="NotImplementedException"></exception>
		public Notification GenerateNotification(NotificationType notificationType)
		{
			// Generates a new notification using the notification service and saves it to the database.

			// var notification = _notificationGenerator.GenerateFromType(notificationType); 

			// _notificationRepository.SaveNotification(notification);

			return new Notification();
		}
	}
}
