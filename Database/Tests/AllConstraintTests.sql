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


--=====================================================================
-- Test that Active in Sanctuary defaults to 1 in Profile Animals table
--=====================================================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO ProfileAnimals(ProfileID, AnimalID)
	VALUES (2, 23);
	
	DECLARE @active int

	SELECT active = Active
	FROM ProfileAnimals
	WHERE ProfileAnimalID = @@IDENTITY
		
	IF (@active = 1)
		PRINT 'Success, Active in Sanctuary defaulted to 1 in ProfileAnimals table';
	ELSE
		PRINT 'Failure, Active in Sanctuary didn''t defaulted to 1 in ProfileAnimals table';

	DELETE FROM ProfileAnimals		--Delete inserted row
	WHERE ProfileAnimalID = @@IDENTITY;
	PRINT 'Deleted newly inserted test row'
END TRY
BEGIN CATCH
	PRINT 'Failure, Active in Sanctuary didn''t defaulted to 1 in ProfileAnimals table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

/**********************************************************************
* Purpose: Tests that a valid row of data can be inserted into the Users table.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123', 'testUser@hotmail.com');
	PRINT 'SUCCESS: a new row was inserted into the Users table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: the new row was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';
	
/**********************************************************************
* Purpose: Tests that a row of data can be deleted from the Users table.
***********************************************************************/
BEGIN TRY
	DELETE FROM Users
		WHERE Username = 'testUser@hotmail.com';
	PRINT 'SUCCESS: a row was deleted from the Users table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: a row was not deleted from the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that you can't have a username longer than 50 characters.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123', 'testUser@hotmail.comtestUser@hotmail.comtestUser@hotmail.com');
	PRINT 'FAILURE: a username longer than 50 characters was inserted into the Users table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: the username longer than 50 characters was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that you can't have a password longer than 50 characters.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123123123123123123123123123123123123123123123123123123', 'testUser@hotmail.com');
	PRINT 'FAILURE: a password longer than 50 characters was inserted into the Users table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: the password longer than 50 characters was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that you can't have a null username be inserted into the
* Users table.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword)
	VALUES
		('123');
	PRINT 'FAILURE: a null username was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: the null username was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that you can't have a null password be inserted into the
* Users table.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(Username)
	VALUES
		('testUser@hotmail.com');
	PRINT 'FAILURE: a null password was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: the null password was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that only unique usernames get inserted into the Users
* table.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123', 'fakeUser1@gmail.com');
	PRINT 'FAILURE: a row with a non-unique username was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a row with a non-unique username was not inserted into the Users table.';       
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that the UserID can't have values explicitly inserted 
* (it is an identity column).
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username, UserID)
	VALUES
		('123', 'testUser@hotmail.com', 5);
	PRINT 'FAILURE: a row with a non-unique UserID was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a row with a non-unique UserID was not inserted into the Users table.';   
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a valid row of data can be deleted form the ProfileProgress
* table.
***********************************************************************/
BEGIN TRY
	DELETE FROM ProfileProgress
		WHERE ProfileID = 35;
	PRINT 'SUCCESS: a row was deleted from the ProfileProgress table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: a row was not deleted from the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a valid row of data can be inserted into the ProfileProgress
* table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentMap, CurrentNode, AnimalID)
	VALUES
		(35, 1, 3, 12);
	PRINT 'SUCCESS: a new row was inserted into the ProfileProgress table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: the new row was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a repeated ProfileID can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentMap, CurrentNode, AnimalID)
	VALUES
		(35, 1, 3, 12);
	PRINT 'FAILURE: a repeated ProfileID was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a repeated ProfileID was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null CurrentMap can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentNode, AnimalID)
	VALUES
		(36, 3, 12);
	PRINT 'FAILURE: a null CurrentMap was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null CurrentMap was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null CurrentMap can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentNode, AnimalID)
	VALUES
		(36, 3, 12);
	PRINT 'FAILURE: a null CurrentMap was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null CurrentMap was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null AnimalID can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentMap, CurrentNode)
	VALUES
		(36, 3, 12);
	PRINT 'FAILURE: a null AnimalID was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null AnimalID was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null ProfileID can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(AnimalID, CurrentMap, CurrentNode)
	VALUES
		(36, 3, 12);
	PRINT 'FAILURE: a null ProfileID was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null ProfileID was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

--Testing ProfileProgressHistory
/**********************************************************************
* Purpose: Tests that a valid row of data can be deleted form the ProfileProgressHistory
* table.
***********************************************************************/
BEGIN TRY
	DELETE FROM ProfileProgressHistory
		WHERE ProgressID = 104;
	PRINT 'SUCCESS: a row was deleted from the ProfileProgressHistory table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: a row was not deleted from the ProfileProgressHistory table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a valid row of data can be inserted into the ProfileProgressHistory
* table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgressHistory
		(ProfileID, MiniGameID)
	VALUES
		(6, 20);
	PRINT 'SUCCESS: a new row was inserted into the ProfileProgressHistory table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: the new row was not inserted into the ProfileProgressHistory table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a valid row of data can be inserted into the ProfileProgressHistory
* table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgressHistory
		(ProgressID, ProfileID, MiniGameID)
	VALUES
		(106, 6, 20);
	PRINT 'FAILURE: an explicit Identity column value was inserted into the table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: an explicit Identity column value was not inserted into the table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null ProfileID won't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgressHistory
		(MiniGameID)
	VALUES
		(20);
	PRINT 'FAILURE: a null ProfileID was inserted into the table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null ProfileID  was not inserted into the table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null MiniGameID won't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgressHistory
		(ProfileID)
	VALUES
		(106);
	PRINT 'FAILURE: a null MiniGameID was inserted into the table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null MiniGameID  was not inserted into the table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';