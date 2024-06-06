namespace NotificationService.Api.Domain.Entities;

public class Notification
{
    public int NotificationId { get; set; }
    public int UserId { get; set; }
    public int EscrowId { get; set; }

    public DateTimeOffset Timestamp { get; set; }
    public string Message { get; set; }

    public bool IsRead { get; set; }

    public NotificationType NotificationType { get; set; }
    public bool IsDeleted { get; set; }

    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }
    public DateTimeOffset? ReadAt { get; set; }

    public int CreatedBy { get; set; }
    public int? UpdatedBy { get; set; }
    public int? DeletedBy { get; set; }
    public int? ReadBy { get; set; }


    public Notification()
    {
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = DateTimeOffset.UtcNow;
        Message = string.Empty;
        IsRead = false;
        IsDeleted = false;
    }

    public Notification(int userId, int escrowId, string message)
    : this()
    {
        UserId = userId;
        EscrowId = escrowId;
        Message = message;

    }
}