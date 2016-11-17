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
