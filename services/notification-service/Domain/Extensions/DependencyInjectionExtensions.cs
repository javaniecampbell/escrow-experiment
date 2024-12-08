namespace Notifications.Api.Domain.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddDomain(this IServiceCollection services, IConfiguration configuration)
        {

            return services;
        }
    }
}
