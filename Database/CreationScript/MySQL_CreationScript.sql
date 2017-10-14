-- ToTheRescue!
-- Creation scrip
-- Description: Creates and deletes the tables of the revised ER diagram

-- Note: Feel free to edit any of the VARCHAR(50) to a reasonable amount of characters
USE totherescue;

DROP TABLE ProfileProgressHistory;
DROP TABLE MiniGames;
DROP TABLE ProfileAnimals;
DROP TABLE ProfileProgress;
DROP TABLE Profiles;

DROP TABLE Animals;
DROP TABLE Nodes;
DROP TABLE Maps;
DROP TABLE Sounds;
DROP TABLE Images;

DELETE FROM AspNetUsers;

CREATE TABLE Images (
	ImageID INT PRIMARY KEY auto_increment
	, ImageClass INT NOT NULL
	, Images LONGBLOB NOT NULL
	, ImageName VARCHAR(50) NOT NULL);

CREATE TABLE Sounds (
	SoundID INT PRIMARY KEY auto_increment
	, SoundClass INT NOT NULL
	, Sound LONGBLOB NOT NULL
	, SoundName VARCHAR(50) NOT NULL);

CREATE TABLE Maps (
	MapID INT PRIMARY KEY auto_increment
	, MapName VARCHAR(50) NOT NULL
	, ImageID INT NOT NULL REFERENCES Images (ImageID)
	, SoundID INT NOT NULL REFERENCES Sounds (SoundID));

CREATE TABLE Nodes (
	MapID INT NOT NULL REFERENCES Maps (MapID)
	, NodeID INT auto_increment
	, XCoordinate FLOAT NOT NULL
	, YCoordinate FLOAT NOT NULL
    , KEY `NodeID` (`NodeID`)
	, PRIMARY KEY (MapID, NodeID));

CREATE TABLE Animals (
	AnimalID INT PRIMARY KEY auto_increment
	, FunFact VARCHAR(250)
	, Shiny BIT NOT NULL -- 1 means it is shiny
	, SoundID INT NOT NULL REFERENCES Sounds (SoundID)
	, ImageID INT NOT NULL REFERENCES Images (ImageID));

-- CREATE TABLE Users (
-- UserID INT PRIMARY KEY auto_increment
-- , UserPassword NVARCHAR(50) NOT NULL
-- , Username NVARCHAR(50) unique NOT NULL); --NVARCHAR allows for unicode characters in other languages

CREATE TABLE Profiles (
	ProfileID INT PRIMARY KEY auto_increment
	, UserID INT NOT NULL REFERENCES dbo.AspNetUsers (UserID)
	, AvatarID INT NOT NULL REFERENCES Images (ImageID)
	, ProfileName NVARCHAR(30) NOT NULL
	, ToggleSound BIT NOT NULL DEFAULT 0 -- 0 = sound on, 1 = sound off, defualted to sound on
	, ToggleMusic BIT NOT NULL DEFAULT 0
	, MathDifficultyLevel INT NOT NULL DEFAULT 1 -- default to the lowest difficulty level
	, MathPerformanceStat FLOAT NOT NULL DEFAULT 100 -- default to 100
	, ReadingDifficultyLevel INT NOT NULL DEFAULT 1 -- default to the lowest difficulty level
	, ReadingPerformanceStat FLOAT NOT NULL DEFAULT 100 -- default to 100
	, SubjectFilter VARCHAR(50) DEFAULT 'Any');

CREATE TABLE ProfileProgress (
	ProfileID INT PRIMARY KEY NOT NULL REFERENCES Profiles (ProfileID)
	, CurrentMap INT NOT NULL REFERENCES Maps (MapID)
	, CurrentNode INT NOT NULL -- current node number in the map
	, AnimalID INT NOT NULL REFERENCES Animals (AnimalID));

CREATE TABLE ProfileAnimals (
	ProfileAnimalID INT PRIMARY KEY auto_increment
	, AnimalID INT NOT NULL REFERENCES Animals (AnimalID)
	, ProfileID INT NOT NULL REFERENCES Profiles (ProfileID)
	, Active BIT NOT NULL DEFAULT 1); -- 1 means active in sanctuary

-- CREATE TABLE GameCategories (
-- GameCategoryID INT PRIMARY KEY auto_increment
-- , GameCategoryName VARCHAR(50) NOT NULL);

CREATE TABLE MiniGames (
	MiniGameID INT PRIMARY KEY auto_increment
	-- , MiniGameCategoryID INT NOT NULL REFERENCES GameCategories (GameCategoryID)
	, MiniGameCategoryID INT NOT NULL
	, MiniGamePath VARCHAR(100) NOT NULL 
	, MiniGameName VARCHAR(50) NOT NULL
	, MinDifficulty INT NOT NULL
	, MaxDifficulty INT NOT NULL);

-- CREATE TABLE MiniGameMedia (
-- MediaID INT PRIMARY KEY IDENTITY
-- , MiniGameID INT REFERENCES Minigames (MiniGameID) NOT NULL
-- , Difficulty INT DEFAULT NULL	--nulled if media is used for every instance of that game
-- , MiniGameMedia VARBINARY(max) NOT NULL);

CREATE TABLE ProfileProgressHistory (
	ProgressID INT PRIMARY KEY auto_increment
	, ProfileID INT NOT NULL REFERENCES Profiles (ProfileID) 
	, MiniGameID INT NOT NULL REFERENCES Minigames (MiniGameID));


-- ------------CREATE TRIGGERS---------------------
DELIMITER $$
CREATE TRIGGER EightProfileTrigger
	BEFORE INSERT ON Profiles
	FOR EACH ROW
BEGIN
	IF (EXISTS (SELECT * FROM AspNetUsers
				JOIN Profiles
				ON AspNetUsers.UserID = Profiles.UserID
				HAVING COUNT(Profiles.UserID) >= 8))
	THEN
		SIGNAL SQLSTATE VALUE '45000' SET MESSAGE_TEXT = 'Too many profiles';
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER ActiveAnimalTrigger
	BEFORE INSERT ON ProfileAnimals
	FOR EACH ROW
BEGIN
	IF (EXISTS (SELECT AnimalID FROM ProfileAnimals 
				HAVING COUNT(AnimalID) >= 20))
THEN
		UPDATE ProfileAnimals
		SET Active = 0
		WHERE ProfileAnimalID = 
			(SELECT MIN(ProfileAnimalID)
			FROM ProfileAnimals
			WHERE ProfileID = (SELECT ProfileID FROM inserted)
			AND Active = 1);
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER Three_MiniGame_Trigger
	 BEFORE INSERT ON ProfileProgressHistory
	 FOR EACH ROW
BEGIN
	IF (EXISTS (SELECT MiniGameID FROM ProfileProgressHistory
				HAVING COUNT(PPH.MiniGameID) >= 3))
THEN
		DELETE FROM ProfileProgressHistory
		WHERE ProfileID = 
			(SELECT ProfileID
			WHERE ProfileID = (SELECT ProfileID FROM inserted)
			AND
			ProgressID =
				(SELECT MIN(ProgressID)
					FROM ProfileProgressHistory
					WHERE ProfileID = (SELECT ProfileID FROM inserted)));
	END IF;
END$$
DELIMITER ;