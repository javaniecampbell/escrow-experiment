
namespace Notifications.Api.Domain.Entities;

public class Notification
{
    public string NotificationId { get; set; }
    public string UserId { get; set; }
    public virtual User User { get; set; }
    public string EscrowId { get; set; }

    public string Title { get; set; }
    public DateTime Timestamp { get; set; }
    public string Message { get; set; }

    public bool IsRead { get; set; }

    public string NotificationType { get; set; }
    //public NotificationType NotificationType { get; set; }
    public bool IsDeleted { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime? ReadAt { get; set; }

    public string CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public string? DeletedBy { get; set; }
    public string? ReadBy { get; set; }

    public string? ProjectId { get; set; }
	public string? CustomIdentifier { get; set; }
	public string? MessageId { get; set; }
	public string? BillingId { get; set; }

	public Notification()
    {
        NotificationId = string.Empty;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        Title = string.Empty;
        Message = string.Empty;
        IsRead = false;
        IsDeleted = false;
        NotificationType = string.Empty;
        UserId = string.Empty;
        CreatedBy = string.Empty;
        EscrowId = string.Empty;
        User = new User(); 
    }

    public Notification(string userId, string escrowId,string title, string message, string? projectId)
    : this()
    {
        UserId = userId;
        EscrowId = escrowId;
        Title = title;
        Message = message;
        CreatedBy = userId;
        ProjectId = projectId;
    }
}