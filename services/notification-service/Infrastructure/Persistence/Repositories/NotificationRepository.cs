using Microsoft.EntityFrameworkCore;
using Notifications.Api.Application.Interfaces;
using Notifications.Api.Domain.Entities;
using Notifications.Api.Infrastructure.Persistence.Context;

namespace Notifications.Api.Infrastructure.Persistence.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly NotificationDbContext _context;

        public NotificationRepository(NotificationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Notification>> GetNotificationsAsync(string userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Notification>> GetUnreadNotificationsAsync(string userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task MarkNotificationAsReadAsync(int notificationId)
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

        public async Task<IEnumerable<Notification>> GetBillingNotificationsAsync(string userId, string billingId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId && n.BillingId == billingId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Notification>> GetMessageNotificationsAsync(string userId, string messageId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId && n.MessageId == messageId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Notification>> GetCustomNotificationsAsync(string userId, string customIdentifier)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId && n.CustomIdentifier == customIdentifier)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        //public async Task<IEnumerable<Notification>> GetProjectUpdateNotificationsAsync(string userId, string projectId)
        //{
        //	return await _context.Notifications
        //		.Where(n => n.UserId == userId && n.ProjectId == projectId 
        //		&& n.Type == NotificationType.ProjectUpdate)
        //		.OrderByDescending(n => n.CreatedAt)
        //		.ToListAsync();
        //}

        // GetBillingNotificationsAsync extension
        //public async Task<IEnumerable<Notification>> GetBillingNotificationsAsync(string userId, string billingId)
        //{
        //	return await _context.Notifications
        //		.Where(n => n.UserId == userId && n.BillingId == billingId)
        //		.OrderByDescending(n => n.CreatedAt)
        //		.ToListAsync();
        //}

        // GetMessageNotificationsAsync extension
        //public async Task<IEnumerable<Notification>> GetMessageNotificationsAsync(string userId, string messageId)
        //{
        //	return await _context.Notifications
        //		.Where(n => n.UserId == userId && n.MessageId == messageId)
        //		.OrderByDescending(n => n.CreatedAt)
        //		.ToListAsync();
        //}

        //// GetCustomNotificationsAsync extension
        //public async Task<IEnumerable<Notification>> GetCustomNotificationsAsync(string userId, string customIdentifier)
        //{
        //	return await _context.Notifications
        //		.Where(n => n.UserId == userId && n.CustomIdentifier == customIdentifier)
        //		.OrderByDescending(n => n.CreatedAt)
        //		.ToListAsync();
        //}

        // GetProjectUpdateNotificationsAsync extension
        public async Task<IEnumerable<Notification>> GetProjectUpdateNotificationsAsync(string userId, string projectId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId && n.ProjectId == projectId
                //&& n.Type == NotificationType.ProjectUpdate
                && n.NotificationType.Contains("ProjectUpdate")
                )
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task Create(Notification notification)
        {
            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
        }
    }
}
