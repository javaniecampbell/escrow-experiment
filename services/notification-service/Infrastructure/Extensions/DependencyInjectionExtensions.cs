namespace Notifications.Api.Infrastructure.Extensions
{
	public static class DependencyInjectionExtensions
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection services)
		{
			//services.AddDbContext<NotificationDbContext>(options =>
			//	options.UseSqlServer(configuration.GetConnectionString("NotificationDbConnection")));

			//services.AddScoped<INotificationRepository, NotificationRepository>();

			return services;
		}
		
		public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
		{
			//services.AddDbContext<NotificationDbContext>(options =>
			//	options.UseSqlServer(configuration.GetConnectionString("NotificationDbConnection")));

			//services.AddScoped<INotificationRepository, NotificationRepository>();

			return services;
		}
	}
}
