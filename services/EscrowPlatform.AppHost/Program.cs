using Aspire.Hosting;
using Microsoft.Extensions.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var database = builder.AddPostgres("escrowdb");
var storage = builder.AddAzureStorage("escrowstorage");

if (builder.Environment.IsDevelopment())
{
	storage.RunAsEmulator();
}

var blobStorage = storage.AddBlobs("escrowblobstorage");

var notificationServiceApi = builder.AddProject<Projects.NotificationService_Api>("notificationservice-api");

var paymentServiceApi = builder.AddNpmApp("paymentservice-api","../payment-service", "dev")
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.WithReference(database)
	.WithEnvironment("DATABSE_URL", database)
	.WithReference(notificationServiceApi)
	// How to add environment variables in .dotnet aspire
	.WithEnvironment("AZURE_STORAGE_CONNECTION_STRING",blobStorage)
	.PublishAsDockerFile();

builder.AddNpmApp("dashboard-nextjs", "../../apps/dashboard", "dev")
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.WithReference(paymentServiceApi)
	.WithReference(notificationServiceApi)
	.PublishAsDockerFile();

builder.AddNpmApp("clientportal-nextjs", "../../apps/client-portal", "dev")
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.WithReference(paymentServiceApi)
	.WithReference(notificationServiceApi)
	.PublishAsDockerFile();



builder.Build().Run();
