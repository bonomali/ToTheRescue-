--==============================================================
-- Test that MiniGameCategoryID can't be null in MiniGames table
--==============================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGames(MiniGameCategoryID, MiniGameCode, MiniGameName, MinDifficulty, MaxDifficulty)
	VALUES (NULL, 'Code here', 'MiniGameName', 1, 4);
	PRINT 'Failure, null MiniGameCategoryID inserted in MiniGames table';
END TRY
BEGIN CATCH
	PRINT 'Success, null MiniGameCategoryID not inserted in MiniGames table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--========================================================
-- Test that MiniGameCode can't be null in MiniGames table
--========================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGames(MiniGameCategoryID, MiniGameCode, MiniGameName, MinDifficulty, MaxDifficulty)
	VALUES (3, NULL, 'MiniGameName', 1, 4);
	PRINT 'Failure, null MiniGameCode inserted in MiniGames table';
END TRY
BEGIN CATCH
	PRINT 'Success, null MiniGameCode not inserted in MiniGames table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--========================================================
-- Test that MiniGameName can't be null in MiniGames table
--========================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGames(MiniGameCategoryID, MiniGameCode, MiniGameName, MinDifficulty, MaxDifficulty)
	VALUES (3, 'Code here', NULL, 1, 4);
	PRINT 'Failure, null MiniGameName inserted in MiniGames table';
END TRY
BEGIN CATCH
	PRINT 'Success, null MiniGameName not inserted in MiniGames table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--=============================================================================
-- Test that MiniGameName can't be longer than 50 characters in MiniGames table
--=============================================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGames(MiniGameCategoryID, MiniGameCode, MiniGameName, MinDifficulty, MaxDifficulty)
	VALUES (3, 'Code here', 'This is a very long minigame name is not allowed!!!', 1, 4);
	--MiniGameName 51 characters
	PRINT 'Failure, MiniGameName length over 50 chars inserted in MiniGames table';
END TRY
BEGIN CATCH
	PRINT 'Success, MiniGameName length over 50 chars not inserted in MiniGames table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--=========================================================
-- Test that MinDifficulty can't be null in MiniGames table
--=========================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGames(MiniGameCategoryID, MiniGameCode, MiniGameName, MinDifficulty, MaxDifficulty)
	VALUES (3, 'Code here', 'MiniGameName', NULL, 4);
	PRINT 'Failure, null MinDifficulty inserted in MiniGames table';
END TRY
BEGIN CATCH
	PRINT 'Success, null MinDifficulty not inserted in MiniGames table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--=========================================================
-- Test that MaxDifficulty can't be null in MiniGames table
--=========================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGames(MiniGameCategoryID, MiniGameCode, MiniGameName, MinDifficulty, MaxDifficulty)
	VALUES (3, 'Code here', 'MiniGameName', 1, NULL);
	PRINT 'Failure, null MaxDifficulty inserted in MiniGames table';
END TRY
BEGIN CATCH
	PRINT 'Success, null MaxDifficulty not inserted in MiniGames table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--==========================================================
-- Test that MiniGameID can't be null in MiniGameMedia table
--==========================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGameMedia(MiniGameID, Difficulty, MiniGameMedia)
	VALUES (NULL, 3, 0xFFD8FFE00);
	PRINT 'Failure, null MiniGameID inserted in MiniGameMedia table';
END TRY
BEGIN CATCH
	PRINT 'Success, null MiniGameID not inserted in MiniGameMedia table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--==========================================================
-- Test that Difficulty defaults to null in MiniGameMedia table
--==========================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGameMedia(MiniGameID, MiniGameMedia)
	VALUES (3, 0xFFD8FFE00);
	
	DECLARE @diff int

	SELECT diff = Difficulty
	FROM MiniGameMedia
	WHERE MediaID = @@IDENTITY
		
	IF (@diff IS NULL)
		PRINT 'Success, Difficulty defaulted to null in MiniGameMedia table';
	ELSE
		PRINT 'Failure, Difficulty didn''t default to null in MiniGameMedia table';

	DELETE FROM MiniGameMedia		--Delete inserted row
	WHERE MediaID = @@IDENTITY;
	PRINT 'Deleted newly inserted test row'
END TRY
BEGIN CATCH
	PRINT 'Failure, Difficulty didn''t default to null in MiniGameMedia table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--==========================================================
-- Test that MiniGameMedia can't be null in MiniGameMedia table
--==========================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO MiniGameMedia(MiniGameID, Difficulty, MiniGameMedia)
	VALUES (3, 3, NULL);
	PRINT 'Failure, null MiniGameMedia inserted in MiniGameMedia table';
END TRY
BEGIN CATCH
	PRINT 'Success, null MiniGameMedia not inserted in MiniGameMedia table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--=================================================================
-- Test that GameCategoryName can't be null in GamesCateories table
--=================================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO GameCategories(GameCategoryName)
	VALUES (NULL);
	PRINT 'Failure, null GameCategoryName inserted in GameCateories table';
END TRY
BEGIN CATCH
	PRINT 'Success, null GameCategoryName not inserted in GameCategories table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--======================================================================================
-- Test that GameCategoryName can't be longer than 50 characters in GamesCateories table
--======================================================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO GameCategories(GameCategoryName)
	VALUES ('This is a very long game category, not allowed!!!!!');
	--GameCategoryName 51 characters
	PRINT 'Failure, GameCateoryName length over 50 chars inserted in GameCategories table';
END TRY
BEGIN CATCH
	PRINT 'Success, GameCategoryName length over 50 chars not inserted in GameCategories table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'


/**********************************************************************
* Purpose: This functions gets the last three minigames a profile played.
		Parameters: ProfileID
		Returns: table
***********************************************************************/
DROP FUNCTION GetPrevMiniGames;
GO
CREATE FUNCTION GetPrevMiniGames
		(@profileID INT)
		RETURNS TABLE

RETURN(SELECT MiniGameID
	FROM ProfileProgressHistory
	WHERE ProfileID = @profileID);

/**********************************************************************
* Purpose: This procedure gets the image and sound for a map. 
		Parameters: MapID
***********************************************************************/
GO
CREATE PROC GetMapMedia
		@mapID INT
AS
	IF NOT EXISTS (SELECT MapID FROM Maps WHERE MapID = @mapID)
		THROW 50007, 'Invalid map ID', 1;

	SELECT Images, Sound
	FROM Maps
		JOIN Images ON Maps.ImageID = Images.ImageID
		JOIN Sounds ON Maps.SoundID = Sounds.SoundID
	WHERE Maps.MapID = @mapID;


/**********************************************************************
* Purpose: This procedure gets the nodes for the current map.
		Parameters: MapID
***********************************************************************/
GO
CREATE PROC GetMapNodes
		@mapID INT
AS
	IF NOT EXISTS (SELECT MapID FROM Maps WHERE MapID = @mapID)
		THROW 50008, 'Invalid map ID', 1;

	SELECT NodeID, XCoordinate, YCoordinate
	FROM Maps
		JOIN Nodes ON Maps.MapID = Nodes.MapID
	WHERE Maps.MapID = @mapID;


/**********************************************************************
* Purpose: Tests the GetPrevMiniGames procedure.
  Should return last three minigames played for profile (or fewer if user
  hasn't played three games)
		Parameters: ProfileID
***********************************************************************/
GO
DROP TABLE #temp

CREATE TABLE #temp(MiniGameID INT)INSERT INTO #temp
VALUES (2), (14), (16)

IF(SELECT COUNT(*) AS UnMatchedIDs
FROM dbo.GetPrevMiniGames(4) as retTable
	FULL OUTER JOIN (SELECT *
	   	  FROM #temp) AS expected ON (retTable.MiniGameID = expected.MiniGameID)
WHERE (retTable.MiniGameID IS NULL) OR (expected.MiniGameID IS NULL))
	 > 0	PRINT 'Failure, didn''t return correct MiniGameIDs'ELSE	PRINT 'Success, correct MiniGameIDs returned'
DROP TABLE #temp; --drop temp table


/**********************************************************************
* Purpose: Tests the GetMapMedia procedure.
  Should return background sound and background image for map
		Parameters: MapID
***********************************************************************/



/**********************************************************************
* Purpose: Tests the GetMapNodes procedure
  Should return rows for all nodes for map
		Parameters: MapID
***********************************************************************/