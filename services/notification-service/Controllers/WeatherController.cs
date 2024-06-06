using Microsoft.AspNetCore.Mvc;

namespace NotificationService.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class WeatherController : ControllerBase
	{
        public WeatherController()
        {
            
        }

		[HttpGet]
		public ActionResult<WeatherForecast[]> GetWeatherForecasts()
		{
			var summaries = new[]
			{
				"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
			};
			var forecast = Enumerable.Range(1, 5).Select(index =>
			   new WeatherForecast
			   (
				   DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
				   Random.Shared.Next(-20, 55),
				   summaries[Random.Shared.Next(summaries.Length)]
			   ))
			   .ToArray();

			return Ok(forecast);
		}

	

	}
}
