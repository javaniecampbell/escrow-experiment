var builder = DistributedApplication.CreateBuilder(args);

var database = builder.AddPostgres("escrowdb");

var notificationServiceApi = builder.AddProject<Projects.NotificationService_Api>("notificationservice-api");

var paymentServiceApi = builder.AddNpmApp("paymentservice-api","../payment-service", "dev")
	.WithReference(database)
	.WithReference(notificationServiceApi)
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.PublishAsDockerFile();

builder.AddNpmApp("dashboard-nextjs", "../../apps/dashboard", "dev")
	.WithReference(paymentServiceApi)
	.WithReference(notificationServiceApi)
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.PublishAsDockerFile();

builder.AddNpmApp("clientportal-nextjs", "../../apps/client-portal", "dev")
	.WithReference(paymentServiceApi)
	.WithReference(notificationServiceApi)
	.WithHttpEndpoint(env: "PORT")
	.WithExternalHttpEndpoints()
	.PublishAsDockerFile();



builder.Build().Run();
