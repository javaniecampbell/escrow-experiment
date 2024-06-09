namespace Notifications.Api.Application.Extensions
{
	public static class DependencyInjectionExtensions
	{
		public static IServiceCollection AddApplication(this IServiceCollection services)
		{
			//services.AddScoped<INotificationService, NotificationService>();

			return services;
		}
		public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
		{
			//services.AddScoped<INotificationService, NotificationService>();

			return services;
		}
	}
}
