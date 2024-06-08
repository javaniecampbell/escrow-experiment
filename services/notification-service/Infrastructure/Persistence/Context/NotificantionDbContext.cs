using Microsoft.EntityFrameworkCore;
using NotificationService.Api.Domain.Entities;

namespace NotificationService.Api.Infrastructure.Persistence.Context;

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
		modelBuilder.Entity<Notification>()
		.HasKey(n => n.NotificationId);

		modelBuilder.Entity<NotificationSetting>()
	 .HasKey(n => n.NotificationSettingId);

		modelBuilder.Entity<User>()
		.HasKey(u => u.Id);

		modelBuilder.Entity<User>()
		.HasOne(u => u.NotificationSetting)
		.WithOne(n => n.User)
		.HasForeignKey<NotificationSetting>(n => n.UserId);


		modelBuilder.Entity<NotificationSetting>()
		.HasOne(n => n.User)
		.WithOne(u => u.NotificationSetting)
		.HasForeignKey<NotificationSetting>(n => n.UserId);



		modelBuilder.Entity<Notification>().ToTable("Notifications");
	}
}