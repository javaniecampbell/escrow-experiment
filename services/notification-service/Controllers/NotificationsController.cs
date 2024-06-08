using Microsoft.AspNetCore.Mvc;
using NotificationService.Api.Infrastructure.Persistence.Context;

namespace NotificationService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly NotificationDbContext _dbContext;
	private readonly ILogger<NotificationsController> _logger;

	public NotificationsController(NotificationDbContext dbContext,ILogger<NotificationsController> logger)
    {
        _dbContext = dbContext;
		_logger = logger;
	}

    [HttpGet("{userId}")]
    public IActionResult GetNotifications(int userId)
    {
        _logger.LogInformation("Fetching notifications for user");
        try
        {
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
}

