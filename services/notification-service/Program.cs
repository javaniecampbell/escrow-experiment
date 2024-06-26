using Microsoft.EntityFrameworkCore;
using Notifications.Api.Application.Extensions;
using Notifications.Api.Hubs;
using Notifications.Api.Infrastructure.Extensions;
using Notifications.Api.Infrastructure.Persistence.Context;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddControllers();
// custom configuration
builder.Services.AddApplication();
builder.Services.AddInfrastructure();

if (builder.Environment.IsProduction())
{
	builder.AddCosmosDbContext<NotificationDbContext>("notificationsCosmos", "escrownotificationsdb");
	builder.EnrichCosmosDbContext<NotificationDbContext>();

	// builder.Services.AddNpgsqlDbContext<NotificationDbContext>("notificationsNpgsql");

	//builder.Services.AddDbContext<NotificationDbContext>(options =>
	//{
	//    // options.UseInMemoryDatabase("NotificationService");
	//    // options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
	//    // use postgres
	//    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
	//});
}else{
	builder.Services.AddDbContext<NotificationDbContext>(options =>
	{
		options.UseInMemoryDatabase("NotificationService");
	});
}


var app = builder.Build();

app.MapDefaultEndpoints();
var baseUrl = "/api";
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
	"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet($"{baseUrl}/weatherforecast", () =>
{
	var forecast = Enumerable.Range(1, 5).Select(index =>
		new WeatherForecast
		(
			DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
			Random.Shared.Next(-20, 55),
			summaries[Random.Shared.Next(summaries.Length)]
		))
		.ToArray();
	return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.UseHttpsRedirection();
app.UseHsts();

app.MapHub<NotificationsHub>("/notificationsHub");
app.MapControllers();

app.Run();

public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
	public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
