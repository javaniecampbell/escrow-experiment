namespace Notifications.Api.Domain.Entities
{
	public class User
	{
		public string Id { get; set; }
		public string Email { get; set; }
		public NotificationSetting NotificationSetting { get; set; }

		public virtual ICollection<Notification> Notifications { get; set; }
	}

}
