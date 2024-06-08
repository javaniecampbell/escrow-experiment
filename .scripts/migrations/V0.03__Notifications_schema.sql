CREATE TABLE Notifications
(
    NotificationId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    Message NVARCHAR(MAX),
    Timestamp DATETIME,
    IsRead BIT,
    NotificationType VARCHAR(250)
);


CREATE TABLE NotificationTypes
(
    NotificationTypeId INT PRIMARY KEY IDENTITY(1,1),
    TypeName NVARCHAR(500),
    TypeDescription NVARCHAR(500)
);
