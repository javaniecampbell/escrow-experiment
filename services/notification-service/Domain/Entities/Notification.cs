namespace NotificationService.Api.Domain.Entities;

public class Notification
{
    public int NotificationId { get; set; }
    public int UserId { get; set; }
    public int EscrowId { get; set; }

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

    public int CreatedBy { get; set; }
    public int? UpdatedBy { get; set; }
    public int? DeletedBy { get; set; }
    public int? ReadBy { get; set; }


    public Notification()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        Message = string.Empty;
        IsRead = false;
        IsDeleted = false;
        NotificationType = string.Empty;
    }

    public Notification(int userId, int escrowId, string message)
    : this()
    {
        UserId = userId;
        EscrowId = escrowId;
        Message = message;
    }
}