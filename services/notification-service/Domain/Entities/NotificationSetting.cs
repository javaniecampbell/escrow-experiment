namespace Notifications.Api.Domain.Entities
{
	public class NotificationSetting
	{
		public int NotificationSettingId { get; set; }
		public string UserId { get; set; }
		public bool ProjectUpdates { get; set; }
		public bool BillingReminders { get; set; }
		public bool NewMessages { get; set; }

		public virtual User User { get; set; }


		public NotificationSetting()
		{
			ProjectUpdates = false;
			BillingReminders = false;
			NewMessages = false;
			UserId = string.Empty;
			User = new User();
		}

		public void EnableNotificationType(string type)
		{
			switch (type)
			{
				case "ProjectUpdates":
					ProjectUpdates = true;
					break;
				case "BillingReminders":
					BillingReminders = true;
					break;
				case "NewMessages":
					NewMessages = true;
					break;
			}
		}

		public void DisableNotificationType(string type)
		{
			switch (type)
			{
				case "ProjectUpdates":
					ProjectUpdates = false;
					break;
				case "BillingReminders":
					BillingReminders = false;
					break;
				case "NewMessages":
					NewMessages = false;
					break;
			}
		}
	}

}
