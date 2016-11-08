--ToTheRescue!
--Tests

--====================================
-- This try catch block creates profiles with a specified UserID 
-- until the ninth profile is created and the trigger catches it
--====================================
USE ToTheRescue;
BEGIN TRY
	WHILE 
		(SELECT COUNT(ProfileID)
		FROM Profiles
		WHERE UserID = 12) < 9
	BEGIN
		INSERT INTO Profiles
		(UserID, AvatarID, ProfileName, ToggleSound, ToggleMusic, Difficulty, PerformanceStat, SubjectFilter)
		VALUES
		(12, 1, 'ASUYWEIURWIEURYWIE', 1, 1, 1, 1, 1)
	END
	DELETE Profiles
	where Profiles.ProfileName = 'ASUYWEIURWIEURYWIE'
	PRINT 'Failure, 9th profile was added to the Profiles Table';
END TRY
BEGIN CATCH
	DELETE Profiles
	where Profiles.ProfileName = 'ASUYWEIURWIEURYWIE'
	PRINT 'Success, 9th profile was removed from the Profiles Table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block creates animals with a specified ProfileID
-- until the 21st animal is created and the trigger catches it
--====================================
USE ToTheRescue;
BEGIN TRY
	WHILE 
		(SELECT COUNT(AnimalID)
		FROM ProfileAnimals
		WHERE ProfileID = 25) < 21
	BEGIN
		INSERT INTO ProfileAnimals
		(AnimalID, ProfileID)
		VALUES
		(5, 28)
	END
	ROLLBACK TRAN
	PRINT 'Failure, 21st animal was added to the ProfileAnimals Table';
END TRY
BEGIN CATCH
	PRINT 'Success, 21st profile was removed from the ProfileAnimals Table';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '---------------------------------------------------------------'
--====================================
-- This try catch block tests the Animals.FunFact
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO ANIMALS
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
-- This try catch block tests the Animals.FunFact
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
-- This try catch block tests the Animals.SoundID
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
-- This try catch block tests the Animals.ImageID
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
-- This try catch block tests the ProfileAnimals.AnimalID
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
-- This try catch block tests the ProfileAnimals.ProfileID
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
-- This try catch block tests the Profiles.UserID
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
-- This try catch block tests the Profiles.AvatarID
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
-- This try catch block tests the Profiles.AvatarID
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
-- This try catch block tests the Profiles.AvatarID
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
-- This try catch block tests the Profiles.ProfileName not null
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
-- This try catch block tests the Profiles.Difficulty not null
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(Difficulty)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.Difficulty';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.Difficulty';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.ToggleSound not null
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
-- This try catch block tests the Profiles.ToggleMusic not null
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
-- This try catch block tests the Profiles.PerformanceStat not null
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(PerformanceStat)
	VALUES
	(NULL)
	PRINT 'Failure, null value added to Profiles.PerformanceStat';
	ROLLBACK TRAN
END TRY
BEGIN CATCH
	PRINT 'Success, null value NOT added to Profiles.PerformanceStat';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
		+ ': ' + ERROR_MESSAGE();
END CATCH
PRINT '--------------------------------------------------------'

--====================================
-- This try catch block tests the Profiles.SubjectFilter not null
--====================================
USE ToTheRescue
BEGIN TRY 
	INSERT INTO Profiles
	(SubjectFilter)
	VALUES
	('lllllllllllllllllllllllllllllllllllllllllllllllllll')
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
-- This try catch block tests the Profiles.ProfileName not null
--====================================
USE ToTheRescue
BEGIN 
	INSERT INTO Profiles
	(UserID, AvatarID, Difficulty, PerformanceStat, ProfileName)
	VALUES
	(1, 1, 1, 1, 'aksdjfhalksdfhaiwueyrqislkj')
	IF EXISTS 
		(SELECT ToggleSound, ToggleMusic
			FROM Profiles
			where ProfileName = 'aksdjfhalksdfhaiwueyrqislkj'
			and 
			ToggleSound = 1
			and 
			ToggleMusic = 1)
		PRINT 'Success, proper default values set for ToggleSound and ToggleMusic';
	ELSE
		PRINT 'Failure, proper defualt values NOT set for ToggleSound and ToggleMusic';
END
	DELETE Profiles
	where ProfileName = 'aksdjfhalksdfhaiwueyrqislkj'
PRINT '--------------------------------------------------------'