namespace NotificationService.Api.Domain.Entities;

public class Notification
{
    public int NotificationId { get; set; }
    public string UserId { get; set; }
    public string EscrowId { get; set; }

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
    public Notification()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        Message = string.Empty;
        IsRead = false;
        IsDeleted = false;
        NotificationType = string.Empty;
        UserId = string.Empty;
        CreatedBy = string.Empty;
        EscrowId = string.Empty;
    }

    public Notification(string userId, string escrowId, string message, string? projectId)
    : this()
    {
        UserId = userId;
        EscrowId = escrowId;
        Message = message;
        CreatedBy = userId;
        ProjectId = projectId;
    }
}