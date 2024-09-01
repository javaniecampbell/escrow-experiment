using Notifications.Api.Domain.Entities;

namespace Notifications.Api.Application.Interfaces
{
	public interface INotificationRepository
	{
		Task Create(Notification notification);
	}
}
