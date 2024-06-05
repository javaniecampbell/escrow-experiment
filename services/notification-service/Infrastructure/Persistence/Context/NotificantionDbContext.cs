using Microsoft.EntityFrameworkCore;
using NotificationService.Api.Domain.Entities;

namespace NotificationService.Api.Infrastructure.Persistence.Context;

public class NotificationDbContext : DbContext
{
	public NotificationDbContext(DbContextOptions<NotificationDbContext> options) : base(options)
    {
    }

    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Notification>()
        .HasKey(n => n.NotificationId);
        modelBuilder.Entity<Notification>().ToTable("Notifications");
    }
}