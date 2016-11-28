/**********************************************************************
* Purpose: This functions gets the last three minigames a profile played.
		Parameters: ProfileID
		Returns: table
***********************************************************************/
DROP FUNCTION func_GetPrevMiniGames;
GO
CREATE FUNCTION func_GetPrevMiniGames
		(@profileID INT)
		RETURNS TABLE

RETURN(SELECT MiniGameID
	FROM ProfileProgressHistory
	WHERE ProfileID = @profileID);
GO

/**********************************************************************
* Purpose: This function gets the image and sound for a map. 
		Parameters: MapID
		Returns: table
***********************************************************************/
DROP FUNCTION func_GetMapMedia;
GO
CREATE FUNCTION func_GetMapMedia
		(@mapID INT)
		RETURNS TABLE

RETURN(SELECT Images, Sound
	FROM Maps
		JOIN Images ON Maps.ImageID = Images.ImageID
		JOIN Sounds ON Maps.SoundID = Sounds.SoundID
	WHERE Maps.MapID = @mapID);
GO

/**********************************************************************
* Purpose: This function gets the nodes for the current map.
		Parameters: MapID
		Returns: table
***********************************************************************/
DROP FUNCTION func_GetMapNodes
GO
CREATE FUNCTION func_GetMapNodes
		(@mapID INT)
		RETURNS TABLE

RETURN(SELECT NodeID, XCoordinate, YCoordinate
		FROM Maps
			JOIN Nodes ON Maps.MapID = Nodes.MapID
		WHERE Maps.MapID = @mapID);
GO


--Note, return val of 1 is true and return val of 0 is false

/**********************************************************************
* Purpose: This function checks to see if the user entered an 
* existing username. A return value of 1 means the username exists,
* 0 means the username does not exist.
***********************************************************************/
DROP FUNCTION IsExistingUserName
GO
CREATE FUNCTION IsExistingUserName
	(@userName VARCHAR(50))
	RETURNS BIT
BEGIN
	DECLARE @existingUserName BIT = 0;
	IF EXISTS (SELECT UserName FROM Users WHERE Username = @userName)
	SET @existingUserName = 1; 
RETURN @existingUserName;
END;
GO

/**********************************************************************
* Purpose: This function checks to see if the user entered a 
* correct password. A return value of 1 means that the user entered
* a correct password, a return value of 0 means that the user entered
* an incorrect password.
***********************************************************************/
DROP FUNCTION IsValidPassword
GO 
CREATE FUNCTION IsValidPassword
	(@userName VARCHAR(50), @password VARCHAR(50))
	RETURNS BIT
BEGIN
	DEClARE @validPassword BIT = 0;
	IF EXISTS (SELECT UserPassword FROM Users WHERE Username = @userName AND UserPassword = @password)
		SET @validPassword = 1;
RETURN @validPassword;
END;
GO

/**********************************************************************
* Purpose: This function gets a profile's current map, 
* current node and ID of the animal to be saved at the end of 
* the current map (Essentially the information in the ProfileProgress 
* table).
***********************************************************************/
DROP FUNCTION GetProfileProgressInfo
GO
CREATE FUNCTION GetProfileProgressInfo
	(@profileID int)
	RETURNS TABLE
RETURN
(SELECT CurrentMap, CurrentNode, AnimalID
FROM ProfileProgress
WHERE ProfileID = @profileID);
GO

GO
CREATE FUNCTION GetProfileID
	(@userID INT,
	@profileName VARCHAR(50),
	@avatar VARBINARY(MAX))
	RETURNS INT
BEGIN
	

/************************************************************
* This Function returns the profile row associated with the 
* provided ProfileID
************************************************************/
DROP FUNCTION GetProfile
GO
CREATE FUNCTION GetProfile
				(@profileID2 INT)
				RETURNS TABLE

RETURN(SELECT ProfileName, AvatarID, ReadingDifficultyLevel, MathDifficultyLevel
			, ReadingPerformanceStat, MathPerformanceStat
			,SubjectFilter, ToggleSound, ToggleMusic
		FROM Profiles
		WHERE ProfileID = @profileID2);
GO

/************************************************************
* This Function returns the avatar associated with the  
* provided ProfileID
************************************************************/
DROP FUNCTION GetProfileAvatar
GO
CREATE FUNCTION GetProfileAvatar
				(@profileID3 INT)
				RETURNS TABLE

RETURN(SELECT Images
		FROM Images 
		INNER JOIN Profiles
		ON Images.ImageID = Profiles.AvatarID
		WHERE Profiles.ProfileID = @profileID3);
GO

/************************************************************
* This Function returns the the current animal a user is trying 
* to save associated with the provided ProfileID
************************************************************/
DROP FUNCTION GetCurrentAnimal
GO
CREATE FUNCTION GetCurrentAnimal
				(@profileID4 INT)
				RETURNS TABLE

RETURN(SELECT Images
		FROM Profiles 
		INNER JOIN ProfileProgress
		ON Profiles.ProfileID = ProfileProgress.ProfileID
		INNER JOIN Animals
		ON ProfileProgress.AnimalID = Animals.AnimalID
		INNER JOIN Images
		ON Animals.ImageID = Images.ImageID
		WHERE Profiles.ProfileID = @profileID4);
GO

/**********************************************************************
* Purpose: Grabs the nodes for the current map.
***********************************************************************/
DROP FUNCTION GrabMapNodes;

GO
CREATE FUNCTION GrabMapNodes
	(@mapID int)
	RETURNS TABLE
RETURN 	
   (SELECT NodeID, XCoordinate, YCoordinate
	FROM Maps
	JOIN Nodes on Maps.MapID = Nodes.MapID
	WHERE Maps.MapID = @mapID)
GO

/**********************************************************************
* Purpose: Grabs all of the animals in a profile's sanctuary. 
***********************************************************************/
DROP FUNCTION GrabAnimals;

GO
CREATE FUNCTION GrabAnimals
	(@profileID int)
	RETURNS TABLE
RETURN 	
   (SELECT Funfact, Images, Sound, Active
	FROM ProfileAnimals
	JOIN Animals on ProfileAnimals.AnimalID = Animals.AnimalID
	JOIN Images on Animals.ImageID = Images.ImageID
	JOIN Sounds on Animals.SoundID = Sounds.SoundID
	WHERE ProfileAnimals.ProfileID = @profileID)
GO

/**********************************************************************
* Purpose: Grabs the information about a MiniGame. 
***********************************************************************/
DECLARE @minigameID int = 5

IF NOT EXISTS (SELECT MiniGameID FROM Minigames WHERE MiniGameID = @minigameID)
	THROW 50011, 'Invalid game ID', 1;

SELECT MiniGameCode, MiniGameName
FROM Minigames
WHERE Minigames.MiniGameID = @minigameID;

DROP FUNCTION GrabMiniGame;

GO
CREATE FUNCTION GrabMiniGame
	(@minigameID int)
	RETURNS TABLE
RETURN 	
   (SELECT MiniGameCode, MiniGameName
	FROM Minigames
	WHERE Minigames.MiniGameID = @minigameID)
GO

/**********************************************************************
* Purpose: Grabs the media for a MiniGame.
***********************************************************************/
USE ToTheRescue;  
GO  
CREATE PROCEDURE proc_UpdateProgressHistory  
    @MiniGameID int,
	@Difficulty int
AS   
	SELECT MiniGameMedia
	FROM Minigames
	JOIN MiniGameMedia on Minigames.MiniGameID = MiniGameMedia.MiniGameID
	WHERE Minigames.MiniGameID = @MiniGameID AND (Difficulty = @Difficulty OR Difficulty IS NULL);
GO
