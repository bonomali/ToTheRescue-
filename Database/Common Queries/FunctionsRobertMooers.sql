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

/**********************************************************************
* Purpose: Grabs all of the animals in a profile's sanctuary. 
***********************************************************************/
DROP FUNCTION GrabAnimals;

GO
CREATE FUNCTION GrabAnimals
	(@profileID int)
	RETURNS TABLE
RETURN 	
   (SELECT Funfact, Images, Sound
	FROM ProfileAnimals
	JOIN Animals on ProfileAnimals.AnimalID = Animals.AnimalID
	JOIN Images on Animals.ImageID = Images.ImageID
	JOIN Sounds on Animals.SoundID = Sounds.SoundID
	WHERE ProfileAnimals.ProfileID = @profileID)


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
