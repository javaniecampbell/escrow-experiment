using Aspire.Hosting;
using Microsoft.Extensions.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var database = builder.AddPostgres("postgres").AddDatabase("escrowservice");
var storage = builder.AddAzureStorage("escrowstorage");
var cosmosdb = builder.AddAzureCosmosDB("notificationsCosmos");
var notificationCosmosDb = cosmosdb.AddDatabase("escrownotificationsdb");

if (builder.Environment.IsDevelopment())
{
	notificationCosmosDb.RunAsEmulator();
	storage.RunAsEmulator();
}

var blobStorage = storage.AddBlobs("escrowblobstorage");

var notificationServiceApi = builder.AddProject<Projects.NotificationService_Api>("notificationservice-api")
	.WithReference(notificationCosmosDb)
	.WithOtlpExporter();

var paymentServiceApi = builder.AddNpmApp("paymentservice-api", "../payment-service", "dev")
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.WithReference(database)
	.WithEnvironment("DATABSE_URL", database)
	.WithReference(notificationServiceApi)
	// How to add environment variables in .dotnet aspire
	.WithEnvironment("AZURE_STORAGE_CONNECTION_STRING",blobStorage)
	.WithEnvironment("AZURE_CONTAINER_NAME", "digitalAssets")
	.WithEnvironment("STRIPE_SECRET_KEY","")
	.WithEnvironment("STRIPE_WEBHOOK_SECRET","")
	.WithEnvironment("SHOULD_REDIRECT_PAYMENT_SESSION", "true")
	.WithEnvironment("AZURE_CONTAINER_NAME", "digitalAssets")
	.PublishAsDockerFile();

var dashboardFrontend = builder.AddNpmApp("dashboard-nextjs", "../../apps/dashboard", "dev")
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.WithReference(paymentServiceApi)
	.WithReference(notificationServiceApi)
	.WithEnvironment("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "")
	.WithEnvironment("CLERK_SECRET_KEY", "")
	.WithOtlpExporter()
	.PublishAsDockerFile();

var clientFrontend = builder.AddNpmApp("clientportal-nextjs", "../../apps/client-portal", "dev")
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.WithReference(paymentServiceApi)
	.WithReference(notificationServiceApi)
	.WithOtlpExporter()
	.PublishAsDockerFile();

if (builder.Environment.IsDevelopment() && builder.Configuration["DOTNET_LAUNCH_PROFILE"] == "https")
{
	// Disable TLS certificate validation in development, see https://github.com/dotnet/aspire/issues/3324 for more details.
	dashboardFrontend.WithEnvironment("NODE_TLS_REJECT_UNAUTHORIZED", "0");
	clientFrontend.WithEnvironment("NODE_TLS_REJECT_UNAUTHORIZED", "0");
}


builder.Build().Run();
