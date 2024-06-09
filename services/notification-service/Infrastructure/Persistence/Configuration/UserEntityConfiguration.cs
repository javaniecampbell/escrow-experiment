using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Notifications.Api.Domain.Entities;
using System.Reflection.Emit;

namespace Notifications.Api.Infrastructure.Persistence.Configuration
{
	public class UserEntityConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.ToTable("Users");

			builder
			.HasKey(u => u.Id);

			builder.Property(u => u.Id)
				.HasMaxLength(32);

			builder.HasMany(u => u.Notifications)
				.WithOne(n => n.User)
				.HasForeignKey(n => n.UserId);
			
			builder
			.HasOne(u => u.NotificationSetting)
			.WithOne(n => n.User)
			.HasForeignKey<NotificationSetting>(n => n.UserId);
			
			#region Ownership Relationship with NotificationSetting - Questionable
			//builder.OwnsOne(u => u.NotificationSetting, n =>
			//{
			//	n.Property(n => n.NotificationSettingId)
			//	.HasMaxLength(32);

			//	n.Property(n => n.UserId)
			//	.HasMaxLength(32);

			//	n.Property(n => n.ProjectUpdates)
			//	.HasColumnType("BIT")
			//	.HasDefaultValue(false);

			//	n.Property(n => n.BillingReminders)
			//	.HasColumnType("BIT")
			//	.HasDefaultValue(false);

			//	n.Property(n => n.NewMessages)
			//	.HasColumnType("BIT")
			//	.HasDefaultValue(false);
			//});
			#endregion
			
		}
	}
}
