CREATE TABLE NotificationsV2
(
    NotificationId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    Message NVARCHAR(MAX),
    Timestamp DATETIME,
    IsRead BIT,
    NotificationTypeId INT
);


CREATE TABLE NotificationTypes
(
    NotificationTypeId INT PRIMARY KEY IDENTITY(1,1),
    TypeName NVARCHAR(500),
    TypeDescription NVARCHAR(500)
);


-- SQL script for project update notifications table
CREATE TABLE ProjectUpdateNotifications
(
    NotificationId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    Message NVARCHAR(MAX),
    Timestamp DATETIME,
    IsRead BIT,
    ProjectId INT
);
-- Add foreign key constraints, indexes, etc. as needed
