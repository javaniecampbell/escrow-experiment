-- CREATE DATABASE escrowservice;
-- USE EscrowService;
-- GO
CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(255),
    TotalAmount DECIMAL(10, 2)
);

CREATE TABLE Milestones (
    MilestoneID INT PRIMARY KEY,
    ProjectID INT,
    MilestoneName VARCHAR(255),
    Amount DECIMAL(10, 2),
    Status VARCHAR(50), -- e.g., 'pending', 'completed'
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

CREATE TABLE DigitalAssets (
    AssetID INT PRIMARY KEY,
    MilestoneID INT,
    AssetURL VARCHAR(255), -- URL to the Azure Blob Storage resource
    ExpiryDate TIMESTAMP,
    FOREIGN KEY (MilestoneID) REFERENCES Milestones(MilestoneID)
);
