using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Notifications.Api.Domain.Entities;
using System.Reflection.Emit;

namespace Notifications.Api.Infrastructure.Persistence.Configuration
{
	public class NotificationEntityConfiguration : IEntityTypeConfiguration<Notification>
	{
		public void Configure(EntityTypeBuilder<Notification> builder)
		{
			builder.ToTable("Notifications");
			builder.HasKey(n => n.NotificationId);

			builder.Property(n => n.NotificationId)
				.HasMaxLength(32);

			builder.Property(n => n.Title)
				.IsRequired()
				.HasMaxLength(100);

			builder.Property(n => n.Message)
				.IsRequired()
				.HasColumnType("NVARCHAR(MAX)");

			builder.Property(n => n.Timestamp)
				.IsRequired()
				.HasColumnType("DATETIME");

			builder.Property(n => n.IsRead)
				.IsRequired()
				.HasColumnType("BIT")
				.HasDefaultValue(false);

			builder.Property(n => n.NotificationType)
				.IsRequired()
				.HasMaxLength(250)
				.HasColumnType("VARCHAR(250)");

			// audit fields
			builder.Property(n => n.IsDeleted)
				.IsRequired()
				.HasColumnType("BIT")
				.HasDefaultValue(false);

			builder.Property(n => n.CreatedAt)
				.IsRequired()
				.HasColumnType("DATETIME");

			builder.Property(n => n.UpdatedAt)
				.HasColumnType("DATETIME");

			builder.Property(n => n.DeletedAt)
				.HasColumnType("DATETIME");

			builder.Property(n => n.ReadAt)
				.HasColumnType("DATETIME");

			builder.Property(n => n.CreatedBy)
				.IsRequired()
				.HasMaxLength(50);

			builder.Property(n => n.UpdatedBy)
				.HasMaxLength(50);

			builder.Property(n => n.DeletedBy)
				.HasMaxLength(50);

			builder.Property(n => n.ReadBy)
				.HasMaxLength(50);

			builder.Property(n => n.ProjectId)
				.HasMaxLength(50);

			builder.HasOne(n => n.User)
				.WithMany(u => u.Notifications)
				.HasForeignKey(n => n.UserId);

		
		}
	}
}
