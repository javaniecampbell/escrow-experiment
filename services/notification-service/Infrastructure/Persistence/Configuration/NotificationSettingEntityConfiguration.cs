using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Notifications.Api.Domain.Entities;

namespace Notifications.Api.Infrastructure.Persistence.Configuration
{
	public class NotificationSettingEntityConfiguration : IEntityTypeConfiguration<NotificationSetting>
	{
		public void Configure(EntityTypeBuilder<NotificationSetting> builder)
		{
			builder.ToTable("NotificationSettings");
			builder.HasKey(n => n.NotificationSettingId);

			builder.Property(n => n.NotificationSettingId)
				.HasMaxLength(32);

			builder.Property(n => n.UserId)
				.HasMaxLength(32);

			builder.Property(n => n.ProjectUpdates)
				.HasColumnType("BIT")
				.HasDefaultValue(false);

			builder.Property(n => n.BillingReminders)
				.HasColumnType("BIT")
				.HasDefaultValue(false);

			builder.Property(n => n.NewMessages)
				.HasColumnType("BIT")
				.HasDefaultValue(false);

			builder.HasOne(n => n.User)
				.WithOne(u => u.NotificationSetting)
				.HasForeignKey<NotificationSetting>(n => n.UserId);
		}
	}
}
