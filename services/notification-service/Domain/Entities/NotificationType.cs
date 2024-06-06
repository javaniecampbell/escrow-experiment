namespace NotificationService.Api.Domain.Entities;

public class NotificationType
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public DateTimeOffset DeletedAt { get; set; }
    public bool IsDeleted { get; set; }
    public int CreatedBy { get; set; }
    public int? UpdatedBy { get; set; }
    public int? DeletedBy { get; set; }

    public NotificationType()
    {
        Name = string.Empty;
        Description = string.Empty;
    }

}
