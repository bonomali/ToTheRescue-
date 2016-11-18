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

	SELECT @active = Active
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
		(UserPassword, UserName)
	VALUES
		('test', 'test')

	DECLARE @tempUserName varchar(50)

	SELECT @tempUserName = Username
	FROM Users
	where UserID = @@IDENTITY

	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123', @tempUserName)

	PRINT 'FAILURE: a row with a non-unique username was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a row with a non-unique username was not inserted into the Users table.';       
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
	
	DELETE FROM Users
	WHERE UserID = @@IDENTITY
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
* Purpose: Tests that a repeated ProfileID can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	BEGIN TRAN;
	INSERT INTO ProfileProgress
		(ProfileID, CurrentMap, CurrentNode, AnimalID)
	VALUES
		(1, 1, 3, 12);

	INSERT INTO ProfileProgress
		(ProfileID, CurrentMap, CurrentNode, AnimalID)
	VALUES (1, 2, 4, 5);

	COMMIT TRAN;
	PRINT 'FAILURE: a repeated ProfileID was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a repeated ProfileID was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
	ROLLBACK TRAN;
END CATCH
PRINT '-------------------------------------------------------------------';
select * from ProfileProgress
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

/**********************************************************************
* Purpose: Tests the default constraint of the MathDifficultyLevel column
* in the Profiles. The default is 1
***********************************************************************/
BEGIN TRY
	INSERT INTO Profiles
		(UserID, AvatarID, ProfileName, ToggleSound, ToggleMusic, MathPerformanceStat, ReadingDifficultyLevel, ReadingPerformanceStat, SubjectFilter)
	VALUES
		(3, 2, 'Matt', 0, 1, 22.2, 3, 17.2, 0);

		DECLARE @mathDiff int

		SELECT @mathDiff = MathDifficultyLevel
		FROM Profiles
		where ProfileID = @@IDENTITY

		PRINT @mathDiff;

		DELETE FROM Profiles
		WHERE ProfileID = @@IDENTITY

		IF (@mathDiff = 1)
			PRINT 'SUCCESS: MathDifficultyLevel defaulted to 1.'
		ELSE
			PRINT 'FAILURE: MathDifficultyLevel did not default to 1.'
END TRY
BEGIN CATCH   
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH
PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests the default constraint of the ReadingDifficultyLevel column
* in the Profiles. The default is 1
***********************************************************************/
BEGIN TRY
	INSERT INTO Profiles
		(UserID, AvatarID, ProfileName, ToggleSound, ToggleMusic, MathPerformanceStat, MathDifficultyLevel, ReadingPerformanceStat, SubjectFilter)
	VALUES
		(3, 2, 'Matt', 0, 1, 22.2, 3, 17.2, 0);

		DECLARE @readDiff int

		SELECT @readDiff = ReadingDifficultyLevel
		FROM Profiles
		where ProfileID = @@IDENTITY

		PRINT @readDiff;

		DELETE FROM Profiles
		WHERE ProfileID = @@IDENTITY

		IF (@readDiff = 1)
			PRINT 'SUCCESS: ReadingDifficultyLevel defaulted to 1.'
		ELSE
			PRINT 'FAILURE: ReadingDifficultyLevel did not default to 1.'
END TRY
BEGIN CATCH   
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH
PRINT '-------------------------------------------------------------------';

--====================================
-- This try catch block tests the Animals.FunFact
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Animals
	(FunFact)
	VALUES
	('llllllllllllllllllllllllllllllllllllllllllllllllll
	  llllllllllllllllllllllllllllllllllllllllllllllllll
	  llllllllllllllllllllllllllllllllllllllllllllllllll
	  llllllllllllllllllllllllllllllllllllllllllllllllll
	  llllllllllllllllllllllllllllllllllllllllllllllllll1')
	  --exactly 251 characters
	  PRINT 'Failure, 251 character varchar added to the FunFact column';
	  ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, 251 character varchar NOT added to the FunFact column';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH 
PRINT '----------------------------------------------------------------'

--====================================
-- This try catch block tests the Animals.FunFact Shiny NOT NULL constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Animals
	(Shiny)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Animals.Shiny';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Animals.Shiny';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Animals.SoundID Not NULL constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Animals
	(SoundID)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Animals.SoundID';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Animals.SoundID';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Animals.ImageID not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Animals
	(ImageID)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Animals.ImageID';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Animals.ImageID';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the ProfileAnimals.AnimalID not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO ProfileAnimals
	(AnimalID)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to ProfileAnimals.AnimalID';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to ProfileAnimals.AnimalID';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the ProfileAnimals.ProfileID not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO ProfileAnimals
	(ProfileID)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to ProfileAnimals.ProfileID';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to ProfileAnimals.ProfileID';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.UserID not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(UserID)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.UserID';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.UserID';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.AvatarID not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(AvatarID)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.AvatarID';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.AvatarID';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.AvatarID not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(AvatarID)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.AvatarID';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.AvatarID';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.ProfileName not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(ProfileName)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.ProfileName';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.ProfileName';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.ProfileName nvarchar(30)
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(ProfileName)
	VALUES
	('lllllllllllllllllllllllllllll31')
	PRINT 'Failure, nvarchar value added to Profiles.ProfileName';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, 31 characters value NOT added to Profiles.ProfileName';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.ReadingDifficultyLevel not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(ReadingDifficultyLevel)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.ReadingDifficultyLevel';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.ReadingDifficultyLevel';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.MathDifficultyLevel not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(MathDifficultyLevel)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.MathDifficultyLevel';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.MathDifficultyLevel';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.ToggleSound not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(ToggleSound)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.ToggleSound';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.ToggleSound';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.ToggleMusic not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(ToggleMusic)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.ToggleMusic';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.ToggleMusic';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.PerformanceStat not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(MathPerformanceStat)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.MathPerformanceStat';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.MathPerformanceStat';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.ReadingPerformanceStat not null constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(ReadingPerformanceStat)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.ReadingPerformanceStat';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.ReadingPerformanceStat';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.SubjectFilter varchar(30) constraint
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(SubjectFilter)
	VALUES
	('lllllllllllllllllllllllllllllllllllllllllllllllllll') --exactly 31 l's
	PRINT 'Failure, varchar(31) value added to Profiles.SubjectFilter';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, varchar(31) NOT added to Profiles.SubjectFilter';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'


--====================================
-- This try catch block tests the Profiles defaults
--====================================
USE ToTheRescue
BEGIN 
	INSERT INTO Profiles
	(UserID, AvatarID, MathPerformanceStat, ReadingPerformanceStat, ProfileName)
	VALUES
	(1, 1, 1, 1, 'aksdjfhalksdfhaiwueyrqislkj')
	IF EXISTS 
		(SELECT ToggleSound, ToggleMusic
			FROM Profiles
			where ProfileName = 'aksdjfhalksdfhaiwueyrqislkj'
			AND
			ToggleSound = 1
			AND
			ToggleMusic = 1
			AND 
			ReadingDifficultyLevel = 1
			AND
			MathDifficultyLevel = 1)
		PRINT 'Success, proper default values set for ToggleSound, ToggleMusic, MathDifficultyLevel, and ReadingDifficultyLevel';
	ELSE
		PRINT 'Failure, proper defualt values NOT set for ToggleSound, ToggleMusic, MathDifficultyLevel, and ReadingDifficultyLevel';
END
	DELETE Profiles
	where ProfileName = 'aksdjfhalksdfhaiwueyrqislkj'
PRINT '--------------------------------------------------------'

--====================================
-- NULL MapID
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (NULL, 0, 0);
	PRINT 'FAILURE: Null MapID was inserted in Nodes.'
	DELETE FROM Nodes
	WHERE MapID IS NULL AND XCoordinate = 0 AND YCoordinate = 0;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into MapID of Nodes.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL X
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (1, NULL, 0);
	PRINT 'FAILURE: Null Record was inserted into XCoordinate.'
	DELETE FROM Nodes
	WHERE MapID = 1 AND XCoordinate IS NULL AND YCoordinate = 0;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into XCoordinate.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL Y
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (1, 0, NULL);
	PRINT 'FAILURE: Null Record was inserted into YCoordinate.'
	DELETE FROM Nodes
	WHERE MapID = 1 AND XCoordinate = 0 AND YCoordinate IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into YCoordinate.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;
	PRINT '-----------------------------------------------------------'

--====================================
-- Invalid MapID
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (25, 0, 0);
	PRINT 'FAILURE: Node added to map that doesnt exist.'
	DELETE FROM Nodes
	WHERE MapID = 25 AND XCoordinate = 0 AND YCoordinate = 0;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Node not added to map that doesnt exist.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;
	PRINT '-----------------------------------------------------------'

--====================================
-- Insert map name longer than 50 characters.
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES ('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', 1, 1);
	PRINT 'FAILURE: A map name longer than 50 characters was inserted into Map table.'
	DELETE FROM Maps
	WHERE MapName = 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm' AND ImageID = 1 AND SoundID = 1;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: A map name longer than 50 characters was not inserted into Map table.'
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL MapName
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES (NULL, 1, 1);
	PRINT  'FAILURE: Null MapName was inserted in Maps.'
	DELETE FROM Maps
	WHERE MapName IS NULL AND ImageID = 1 AND SoundID = 1;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into MapName of Maps.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL ImageID
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES ('Derpfish', NULL, 1);
	PRINT  'FAILURE: Null ImageID was inserted in Maps.'
	DELETE FROM Maps
	WHERE MapName = 'Derpfish' AND ImageID IS NULL AND SoundID = 1;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into ImageID of Maps.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
		PRINT '-----------------------------------------------------------'

--====================================
-- NULL SoundID
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES ('Derpfish', 1, NULL);
	PRINT  'FAILURE: Null SoundID was inserted in Maps.'
	DELETE FROM Maps
	WHERE MapName = 'Derpfish' AND ImageID = 1 AND SoundID IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into SoundID of Maps.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
		PRINT '-----------------------------------------------------------'

--====================================
-- ImageName longer than 50 characters.
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (1, 0xFFD8FFE00, 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
	PRINT  'FAILURE: An ImageNamename longer than 50 characters was inserted into Images table.'
	DELETE FROM Images
	WHERE ImageClass = 1 AND Images = 0xFFD8FFE00 AND ImageName = 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: An ImageName longer than 50 characters was not inserted into Images table.'
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'


--====================================
-- NULL ImageClass
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (NULL, 0xFFD8FFE00, 'Test');
	PRINT  'FAILURE: Null ImageClass was inserted into Images.'
	DELETE FROM Images
	WHERE ImageClass IS NULL AND Images = 0xFFD8FFE00 AND ImageName = 'Test';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null ImageClass not insertable into Images.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL Images
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (1, NULL, 'Test');
	PRINT  'FAILURE: Null Images inserted into Images.'
	DELETE FROM Images
	WHERE ImageClass = 1 AND Images IS NULL AND ImageName = 'Test';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null Images not insertable into Images.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL ImageName
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (1, 0xFFD8FFE00, NULL);
	PRINT  'FAILURE: Null ImageName was inserted into Images.'
	DELETE FROM Images
	WHERE ImageClass = 1 AND Images = 0xFFD8FFE00 AND ImageName IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null ImageName not insertable into Images.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- SoundName longer than 50 characters.
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Sounds(SoundClass, Sound, SoundName)
	VALUES (1, 0xFFD8FFE00, 'sssssssssssssssssssssssssssssssssssssssssssssssssss');
	PRINT  'FAILURE: An ImageNamename longer than 50 characters was inserted into Images table.'
	DELETE FROM Sounds
	WHERE SoundClass = 1 AND Sound = 0xFFD8FFE00 AND SoundName = 'sssssssssssssssssssssssssssssssssssssssssssssssssss';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: An ImageName longer than 50 characters was not inserted into Images table.'
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL SoundClass
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Sounds(SoundClass, Sound, SoundName)
	VALUES (NULL, 0xFFD8FFE00, 'Test');
	PRINT  'FAILURE: Null SoundClass was inserted into Sounds.'
	DELETE FROM Sounds
	WHERE SoundClass IS NULL AND Sound = 0xFFD8FFE00 AND SoundName = 'Test';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null SoundClass not insertable into Sounds.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL Sound
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Sounds(SoundClass, Sound, SoundName)
	VALUES (1, NULL, 'Test');
	PRINT  'FAILURE: Null Sound was inserted into Sounds.'
	DELETE FROM Sounds
	WHERE SoundClass = 1 AND Sound IS NULL AND SoundName = 'Test';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null ImageClass not insertable into Images.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL SoundName
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Sounds(SoundClass, Sound, SoundName)
	VALUES (1, 0xFFD8FFE00, NULL);
	PRINT  'FAILURE: Null SoundName was inserted into Sounds.'
	DELETE FROM Sounds
	WHERE SoundClass = 1 AND Sound = 0xFFD8FFE00 AND SoundName IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null SoundName not insertable into Sounds.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'
