var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.NotificationService_Api>("notificationservice-api");

builder.Build().Run();
