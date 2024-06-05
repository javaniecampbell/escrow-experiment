using Microsoft.AspNetCore.Mvc;
using NotificationService.Api.Infrastructure.Persistence.Context;

namespace NotificationService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly NotificationDbContext _dbContext;

    public NotificationsController(NotificationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("{userId}")]
    public IActionResult GetNotifications(int userId)
    {
        try
        {
            var notifications = _dbContext.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.Timestamp)
                .ToList();

            return Ok(notifications);
        }
        catch (Exception ex)
        {
            // Handle exceptions appropriately
            return StatusCode(500, "Internal server error");
        }
    }
}

