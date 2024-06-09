using Microsoft.AspNetCore.SignalR;

namespace Notifications.Api.Hubs
{
	public class NotificationsHub : Hub
	{
		/// <summary>
		/// Send a notification to a specific user
		/// </summary>
		/// <param name="userId">The user we want tp receive the notification</param>
		/// <param name="message">the body of the notification</param>
		/// <returns></returns>
		public async Task SendNotification(string userId, string message)
		{
			// This method is called from the client to send a notification
			await Clients.User(userId).SendAsync("ReceiveNotification", message);
		}
	}
}
