namespace Notifications.Api.Domain.Entities
{
	public class User
	{
        public User()
        {
            Id = string.Empty;
			Email = string.Empty;
			NotificationSetting = new NotificationSetting();
			Notifications = new List<Notification>();
        }
        public string Id { get; set; }
		public string Email { get; set; }
		public NotificationSetting NotificationSetting { get; set; }

		public virtual ICollection<Notification> Notifications { get; set; }
	}

}
