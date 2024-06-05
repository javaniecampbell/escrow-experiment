using Microsoft.EntityFrameworkCore;
using NotificationService.Api.Domain.Entities;

namespace NotificationService.Api.Infrastructure.Persistence.Context;

public class NotificationContext : DbContext
{
    public NotificationContext(DbContextOptions<NotificationContext> options) : base(options)
    {
    }

    public DbSet<Notification> Notifications { get; set; }
}