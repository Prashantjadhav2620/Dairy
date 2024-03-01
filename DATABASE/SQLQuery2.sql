SELECT TOP (1000) [User_Id]
      ,[User_Name]
      ,[User_Mobile]
      ,[User_Email]
      ,[User_Password]
  FROM [Dairy].[dbo].[Users]

CREATE TABLE [dbo].[User]
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    EmailId NVARCHAR(100) NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    MobileNumber NVARCHAR(20) NOT NULL,
    [Date] DATETIME NOT NULL
);


SELECT * FROM [User];
