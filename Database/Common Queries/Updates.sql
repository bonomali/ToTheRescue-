-- totherescue 
/**********************************************************************
* Purpose: Updates history when a user finishes a minigame. 
***********************************************************************/
USE totherescue;  

DELIMITER $$
CREATE PROCEDURE proc_UpdateProgressHistory(MiniGameID int,ProfileID int)
BEGIN
	INSERT INTO ProfileProgressHistory (MiniGameID, ProfileID)
	VALUES
	(MiniGameID, ProfileID);
END 

/**********************************************************************
* Purpose: Updates progress when a user finishes a minigame. 
***********************************************************************/
-- Function  
DELIMITER $$  
CREATE PROCEDURE proc_UpdateProgressNode(ProfileID int)
BEGIN
	UPDATE ProfileProgress
	SET CurrentNode = CurrentNode + 1
	WHERE ProfileID = ProfileID;
END

/**********************************************************************
* Purpose: Updates map when user rescues animal 
***********************************************************************/
DELIMITER $$
CREATE PROCEDURE proc_UpdateCurrentMap(ProfileID int)
BEGIN
	UPDATE ProfileProgess
	SET CurrentMap = CurrentMap + 1
	WHERE ProfileID = ProfileID
END
/**********************************************************************
* Purpose: Updates toggle sound. 
***********************************************************************/
-- Function
DELIMITER $$
CREATE PROCEDURE proc_UpdateToggleSound(ProfileID int,SoundBit bit)
BEGIN
	UPDATE Profiles
	SET ToggleSound = SoundBit
	WHERE ProfileID = ProfileID;
END

/**********************************************************************
* Purpose: Updates toggle music.
***********************************************************************/
-- Function
DELIMITER $$ 
CREATE PROCEDURE proc_UpdateToggleMusic(ProfileID int,MusicBit bit)
BEGIN
	UPDATE Profiles
	SET ToggleMusic = MusicBit
	WHERE ProfileID = ProfileID;
END

/**********************************************************************
* Purpose: Updates Difficulty
***********************************************************************/
-- Function
DELIMITER $$
CREATE PROCEDURE proc_UpdateDifficulty(ProfileID int,NewMathDifficulty int,
	NewReadingDifficulty int)
BEGIN
	UPDATE Profiles
	SET MathDifficultyLevel = NewMathDifficulty , ReadingDifficultyLevel = NewReadingDifficulty
	WHERE ProfileID = ProfileID;
END

/**********************************************************************
* Purpose: Updates Math and Reading Performance Statistics
***********************************************************************/
-- function
DELIMITER $$
CREATE PROCEDURE proc_UpdatePerformanceStats(ProfileID int,NewMathStat decimal,
	NewReadingStat decimal)
BEGIN
	UPDATE Profiles
	SET MathPerformanceStat = NewMathStat, ReadingPerformanceStat = NewReadingStat
	WHERE ProfileID = ProfileID;
END

/**********************************************************************
* Purpose: Update Filter
***********************************************************************/
-- Function
DELIMITER $$
CREATE PROCEDURE proc_UpdateSubjectFilter(ProfileID int,Fil varchar(50))
BEGIN
	UPDATE Profiles
	SET SubjectFilter = Fil
	WHERE ProfileID = ProfileID;
END


/**********************************************************************
* Purpose: Update Password
***********************************************************************/
-- Function
DELIMITER $$
CREATE PROCEDURE proc_UpdateUserPassword(UserID int,OldPassword nvarchar(50),
	NewPassword nvarchar(50))
BEGIN
	UPDATE Users
	SET UserPassword = NewPassword
	WHERE UserID = UserID AND UserPassword = OldPassword;
END


/**********************************************************************
* Purpose: Insert a new profile animal
***********************************************************************/
-- Function
DELIMITER $$
CREATE PROCEDURE proc_InsertProfileAnimal(ProfileID int,AnimalID int)
BEGIN 
	INSERT INTO ProfileAnimals(ProfileID, AnimalID)
	VALUES(ProfileID, AnimalID);
END

/**********************************************************************
* Purpose: Delete an old profile animal
***********************************************************************/
-- Function
DELIMITER $$ 
CREATE PROCEDURE proc_DeleteProfileAnimal(ProfileID int,AnimalID int)
BEGIN
	DELETE FROM ProfileAnimals
	WHERE ProfileID = ProfileID AND AnimalID = AnimalID
    LIMIT 1;
END

/**********************************************************************
* Purpose: Delete a profile
***********************************************************************/
-- Function
DELIMITER $$
CREATE PROCEDURE proc_DeleteProfile(ProfileID int)
BEGIN
	DELETE 
	FROM ProfileAnimals
	WHERE ProfileID = ProfileID;

	DELETE 
	FROM ProfileProgress
	WHERE ProfileID = ProfileID;

	DELETE 
	FROM ProfileProgressHistory
	WHERE ProfileID = ProfileID;

	DELETE 
	FROM Profiles
	WHERE ProfileID = ProfileID;
END

/**********************************************************************
* Purpose: Adds a profile to a user account
***********************************************************************/
DELIMITER $$
CREATE PROCEDURE proc_AddNewProfile(UserID int,AvatarID int,
	ProfileName varchar(50))
BEGIN
	INSERT INTO Profiles
	(UserID, AvatarID, ProfileName, MathPerformanceStat, ReadingPerformanceStat, SubjectFilter)
	VALUES
	(UserID, AvatarID, ProfileName, 0, 0,'0');
END
/**********************************************************************
* Purpose: Updates in total a profile. 
***********************************************************************/
-- Function
DELIMITER $$ 
CREATE PROCEDURE proc_UpdateProfile(
	ProfileID int,
	ToggleSound bit,
	ToggleMusic bit,
	MathPerformanceStat float,
	ReadingPerformanceStat float, 
	SubjectFilter varchar(50),
	NewMathDifficulty int,
	NewReadingDifficulty int)
BEGIN
	UPDATE Profiles
	SET ToggleSound = ToggleSound, ToggleMusic = ToggleMusic,
	MathDifficultyLevel = NewMathDifficulty, 
	ReadingDifficultyLevel = NewReadingDifficulty,
	MathPerformanceStat = MathPerformanceStat,
	ReadingPerformanceStat = ReadingPerformanceStat,
	SubjectFilter = SubjectFilter
	WHERE ProfileID = ProfileID;
END

DELIMITER $$
CREATE PROCEDURE GetProfileAvatar(profileID3 INT)
BEGIN
		(SELECT Images
		FROM Images 
		INNER JOIN Profiles
		ON Images.ImageID = Profiles.AvatarID
		WHERE Profiles.ProfileID = profileID3);
END

DELIMITER $$
CREATE PROCEDURE GrabAnimals(profileID int)
BEGIN
   (SELECT Animals.AnimalID, Funfact, Images.ImageID, Sounds.SoundID, Active, Shiny
	FROM ProfileAnimals
	JOIN Animals on ProfileAnimals.AnimalID = Animals.AnimalID
	JOIN Images on Animals.ImageID = Images.ImageID
	JOIN Sounds on Animals.SoundID = Sounds.SoundID
	WHERE ProfileAnimals.ProfileID = profileID);
END