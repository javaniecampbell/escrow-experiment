﻿using Microsoft.AspNetCore.Mvc;
using Notifications.Api.Application.Services;
using Notifications.Api.Application.Extensions;
using Notifications.Api.Domain.Entities;
using Notifications.Api.Infrastructure.Persistence.Context;
using Notifications.Api.Application.Common;

namespace Notifications.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly NotificationDbContext _dbContext;
	private readonly INotificationService _notificationService;
	private readonly INotificationGenerator _notificationGenerator;
	private readonly ILogger<NotificationsController> _logger;

	public NotificationsController(NotificationDbContext dbContext, INotificationService notificationService, INotificationGenerator notificationGenerator, ILogger<NotificationsController> logger)
    {
		_logger = logger;
        _dbContext = dbContext;
		_notificationService = notificationService; 
		_notificationGenerator = notificationGenerator;
	}

	// GET: api/notifications/{userId}
	[HttpGet("{userId}")]
    public IActionResult GetNotifications(string userId)
    {
        _logger.LogInformation("Fetching notifications for user");
        try
        {
			//var notifications = _notificationService.GetAllNotificationsAsync(userId);
            var notifications = _dbContext.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.Timestamp)
                .ToList();
            _logger.LogInformation("Successfully fetched {count} notifications for user ", notifications.Count);
            return Ok(notifications);
        }
        catch (Exception ex)
        {
            // Handle exceptions appropriately
            _logger.LogError(ex, "An error occurred while fetching notifications");
            return StatusCode(500, "Internal server error");
        }
    }

	// GET: api/notifications
	[HttpGet]
	public ActionResult<IEnumerable<Notification>> GetNotifications()
	{
		var notifications = _dbContext.Notifications.ToList();
		return Ok(notifications);
	}

	// GET: api/notifications/{userId}/unread
	[HttpGet("{userId}/unread")]
	public ActionResult<IEnumerable<Notification>> GetUnreadNotifications(string userId)
	{
		//var unreadNotifications = _notificationService.GetUnreadNotificationsAsync(userId);
		var unreadNotifications = _dbContext.Notifications.Where(n => !n.IsRead).ToList();
		return Ok(unreadNotifications);
	}

	//// POST: api/notifications/{userId}/markasread/{id}
	// POST: api/notifications/markasread/{id}
	[HttpPost("markasread/{id}")]
	//[HttpPost("{userId}/markasread/{id}")]
	//public IActionResult MarkNotificationAsRead(string userId, string id)
	public IActionResult MarkNotificationAsRead(string id)
	{
		//var notification = _notificationService.MarkNotificationAsReadAsync(id);
		var notification = _dbContext.Notifications.FirstOrDefault(n => n.NotificationId == id);
		if (notification == null)
		{
			return NotFound();
		}

		// Check if the notification is already read
		if (!notification.IsRead)
		{
			// Mark the notification as read and persist the change
			notification.MarkAsRead();
			_dbContext.SaveChanges();
			return Ok(new { message = "Notification marked as read." });
		}

		return Ok(new { message = "Notification is already read." });
	}

	// Implement other actions for managing notifications as needed

	// POST: api/notifications/generate
	[HttpPost("generate")]
	public IActionResult GenerateNotification([FromBody] NotificationType notificationType) // Might need to replace notification type with an enum
	{
		// Generate the notification using your notification generator
		//var notification = _notificationGenerator.GenerateNotification(notificationType);

		var notification = _notificationService.GenerateNotification(notificationType);
		if (notification == null)
		{
			return BadRequest(new { message = "Failed to generate notification." });
		}

		// Save the generated notification to the database
		//_notificationService.SaveNotification(notification);

		_dbContext.Notifications.Add(notification);
		_dbContext.SaveChanges();

		return Ok(new { message = "Notification generated and saved." });
	}
}

