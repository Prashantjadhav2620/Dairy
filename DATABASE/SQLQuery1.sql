
--DROP TABLE Animaldetails;

CREATE TABLE Animaldetails (
    id INT IDENTITY(1,1) PRIMARY KEY,
    calfno INT,
    date DATE,
    type VARCHAR(50),
    photo_name VARCHAR(255)
);


CREATE PROCEDURE sp_GetPhoto_nameAnimaldetails
    @inputId INT
AS
BEGIN
    SELECT photo_name
    FROM Animaldetails
    WHERE id = @inputId;
END;
