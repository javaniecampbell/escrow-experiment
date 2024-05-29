var builder = DistributedApplication.CreateBuilder(args);

var database = builder.AddPostgres("escrowdb");

var notificationServiceApi = builder.AddProject<Projects.NotificationService_Api>("notificationservice-api");

var paymentServiceApi = builder.AddNpmApp("paymentservice-api","../payment-service", "dev")
	.WithReference(notificationServiceApi)
	.WithReference(database)
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.PublishAsDockerFile();

var dashboardFrontend = builder.AddNpmApp("dashboard-nextjs", "../../apps/dashboard", "dev")
	.WithReference(notificationServiceApi)
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.PublishAsDockerFile();



builder.Build().Run();
