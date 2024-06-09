using Microsoft.EntityFrameworkCore;
using Notifications.Api.Domain.Entities;

namespace Notifications.Api.Infrastructure.Persistence.Context;

public class NotificationDbContext : DbContext
{
	public NotificationDbContext(DbContextOptions<NotificationDbContext> options) : base(options)
	{
	}

	public DbSet<User> Users { get; set; }
	public DbSet<NotificationSetting> NotificationSettings { get; set; }
	public DbSet<Notification> Notifications { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(NotificationDbContext).Assembly);
	}
}