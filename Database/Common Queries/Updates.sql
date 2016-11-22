--ToTheRescue 
--Update and Delete

--Can't use Functions with multiple input variables, updates, or deletes.
--List stored procedures with:
	SELECT 
		name AS procedure_name,
		SCHEMA_NAME(schema_id) AS schema_name,
		type_desc,
		create_date, 
		modify_date  
	FROM sys.procedures;  

--Delete Stored Procedures with: 
	DROP PROCEDURE <stored procedure name>;  
	GO  

/**********************************************************************
* Purpose: Updates history when a user finishes a minigame. 
***********************************************************************/

--Original
DECLARE @MiniGameID int = 3
DECLARE @ProfileID int = 6

INSERT INTO ProfileProgressHistory (MiniGameID, ProfileID)
VALUES
(@MiniGameID, @ProfileID);

--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_UpdateProgressHistory  
    @MiniGameID int,
	@ProfileID int
AS   
	INSERT INTO ProfileProgressHistory (MiniGameID, ProfileID)
	VALUES
	(@MiniGameID, @ProfileID);
GO

/**********************************************************************
* Purpose: Updates progress when a user finishes a minigame. 
***********************************************************************/

--Original
DECLARE @ProfileID int = 6

UPDATE ProfileProgress
SET CurrentNode = CurrentNode + 1
WHERE ProfileID = @ProfileID;

--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_UpdateProgressNode
	@ProfileID int
AS  
	UPDATE ProfileProgress
	SET CurrentNode = CurrentNode + 1
	WHERE ProfileID = @ProfileID;
GO

/**********************************************************************
* Purpose: Updates toggle sound. 
***********************************************************************/

--Original
DECLARE @ProfileID int 
DECLARE @SoundBit bit = 1

UPDATE Profiles
SET ToggleSound = @SoundBit
WHERE ProfileID = @ProfileID;

--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_UpdateToggleSound
	@ProfileID int,
	@SoundBit bit
AS  
	UPDATE Profiles
	SET ToggleSound = @SoundBit
	WHERE ProfileID = @ProfileID;
GO

/**********************************************************************
* Purpose: Updates toggle music.
***********************************************************************/

--Original
DECLARE @ProfileID int = 6
DECLARE @MusicBit bit = 1

UPDATE Profiles
SET ToggleMusic = @MusicBit
WHERE ProfileID = @ProfileID;

--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_UpdateToggleMusic
	@ProfileID int,
	@MusicBit bit
AS  
	UPDATE Profiles
	SET ToggleMusic = @MusicBit
	WHERE ProfileID = @ProfileID;
GO

/**********************************************************************
* Purpose: Updates Difficulty
***********************************************************************/

--Original
DECLARE @ProfileID int = 6
DECLARE @NewMathDifficulty int = 3
DECLARE @NewReadingDifficulty int = 3

UPDATE Profiles
SET MathDifficultyLevel = @NewMathDifficulty , ReadingDifficultyLevel = @NewReadingDifficulty
WHERE ProfileID = @ProfileID;


--DROP PROCEDURE proc_UpdateDifficulty; GO  
--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_UpdateDifficulty
	@ProfileID int,
	@NewMathDifficulty int,
	@NewReadingDifficulty int
AS  
	UPDATE Profiles
	SET MathDifficultyLevel = @NewMathDifficulty , ReadingDifficultyLevel = @NewReadingDifficulty
	WHERE ProfileID = @ProfileID;
GO

/**********************************************************************
* Purpose: Update Filter
***********************************************************************/

--Original
DECLARE @ProfileID int = 6
DECLARE @Filter varchar(50) = 'Math'

UPDATE Profiles
SET SubjectFilter = @Filter
WHERE ProfileID = @ProfileID;

--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_UpdateSubjectFilter
	@ProfileID int,
	@Filter varchar(50)
AS  
	UPDATE Profiles
	SET SubjectFilter = @Filter
	WHERE ProfileID = @ProfileID;
GO


/**********************************************************************
* Purpose: Update Password
***********************************************************************/

--Original
DECLARE @UserName nvarchar(50) = 'fakeUser12@gmail.com'
DECLARE @OldPassword nvarchar(50) = 'WeJcFMQ/8+8QJ/w0hHh+0g=='
DECLARE @NewPassword nvarchar(50) = 'hkDTYvfnl%=+2nfshgioh^&*5ryr9'

UPDATE Users
SET UserPassword = @NewPassword
WHERE Username = @UserName AND UserPassword = @OldPassword

--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_UpdateUserPassword
	@UserID int,
	@OldPassword nvarchar(50),
	@NewPassword nvarchar(50)
AS  
	UPDATE Users
	SET UserPassword = @NewPassword
	WHERE UserID = @UserID AND UserPassword = @OldPassword
GO


/**********************************************************************
* Purpose: Insert a new profile animal
***********************************************************************/

--Original
DECLARE @ProfileID int = 6
DECLARE @AnimalID int = 2

INSERT INTO ProfileAnimals(ProfileID, AnimalID)
VALUES(@ProfileID, @AnimalID);

--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_InsertProfileAnimal
	@ProfileID int,
	@AnimalID int
AS  
	INSERT INTO ProfileAnimals(ProfileID, AnimalID)
	VALUES(@ProfileID, @AnimalID);
GO

/**********************************************************************
* Purpose: Delete an old profile animal
***********************************************************************/

--Original
DECLARE @ProfileID int = 6
DECLARE @AnimalID int = 2


DELETE TOP (1)
FROM ProfileAnimals
WHERE ProfileID = @ProfileID AND AnimalID = @AnimalID

--Function
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_DeleteProfileAnimal
	@ProfileID int,
	@AnimalID int
AS  
	DELETE TOP (1)
	FROM ProfileAnimals
	WHERE ProfileID = @ProfileID AND AnimalID = @AnimalID
GO

/**********************************************************************
* Purpose: Delete a profile
***********************************************************************/

--Original
DECLARE @ProfileID int = 6

DELETE 
FROM ProfileAnimals
WHERE ProfileID = @ProfileID;

DELETE 
FROM ProfileProgress
WHERE ProfileID = @ProfileID;

DELETE 
FROM ProfileProgressHistory
WHERE ProfileID = @ProfileID;

DELETE 
FROM Profiles
WHERE ProfileID = @ProfileID;

--Function
USE ToTheRescue;
GO  
CREATE PROCEDURE proc_DeleteProfile
	@ProfileID int
AS  
	DELETE 
	FROM ProfileAnimals
	WHERE ProfileID = @ProfileID;

	DELETE 
	FROM ProfileProgress
	WHERE ProfileID = @ProfileID;

	DELETE 
	FROM ProfileProgressHistory
	WHERE ProfileID = @ProfileID;

	DELETE 
	FROM Profiles
	WHERE ProfileID = @ProfileID;
GO

