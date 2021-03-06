--ToTheRescue!
--Creation scrip
--Description: Creates and deletes the tables of the revised ER diagram

--Note: Feel free to edit any of the VARCHAR(50) to a reasonable amount of characters
USE ToTheRescue;

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
	ImageID INT PRIMARY KEY IDENTITY
	, ImageClass INT NOT NULL
	, Images VARBINARY(max) NOT NULL
	, ImageName VARCHAR(50) NOT NULL);

CREATE TABLE Sounds (
	SoundID INT PRIMARY KEY IDENTITY
	, SoundClass INT NOT NULL
	, Sound VARBINARY(max) NOT NULL
	, SoundName VARCHAR(50) NOT NULL);

CREATE TABLE Maps (
	MapID INT PRIMARY KEY IDENTITY
	, MapName VARCHAR(50) NOT NULL
	, ImageID INT REFERENCES Images (ImageID) NOT NULL
	, SoundID INT REFERENCES Sounds (SoundID) NOT NULL);

CREATE TABLE Nodes (
	MapID INT REFERENCES Maps (MapID) NOT NULL
	, NodeID INT IDENTITY
	, XCoordinate FLOAT NOT NULL
	, YCoordinate FLOAT NOT NULL
	, PRIMARY KEY (MapID, NodeID));

CREATE TABLE Animals (
	AnimalID INT PRIMARY KEY IDENTITY
	, FunFact VARCHAR(250)
	, Shiny BIT NOT NULL --1 means it is shiny
	, SoundID INT REFERENCES Sounds (SoundID) NOT NULL
	, ImageID INT REFERENCES Images (ImageID) NOT NULL);

--CREATE TABLE Users (
--	UserID INT PRIMARY KEY IDENTITY
--	, UserPassword NVARCHAR(50) NOT NULL
--	, Username NVARCHAR(50) unique NOT NULL); --NVARCHAR allows for unicode characters in other languages

CREATE TABLE Profiles (
	ProfileID INT PRIMARY KEY IDENTITY
	, UserID INT REFERENCES dbo.AspNetUsers (UserID) NOT NULL
	, AvatarID INT REFERENCES Images (ImageID) NOT NULL
	, ProfileName NVARCHAR(30) NOT NULL
	, ToggleSound BIT NOT NULL DEFAULT 0 --0 = sound on, 1 = sound off, defualted to sound on
	, ToggleMusic BIT NOT NULL DEFAULT 0
	, MathDifficultyLevel INT NOT NULL DEFAULT 1 --default to the lowest difficulty level
	, MathPerformanceStat FLOAT NOT NULL DEFAULT 100 --default to 100
	, ReadingDifficultyLevel INT NOT NULL DEFAULT 1 --default to the lowest difficulty level
	, ReadingPerformanceStat FLOAT NOT NULL DEFAULT 100 --default to 100
	, SubjectFilter VARCHAR(50) DEFAULT 'Any');

CREATE TABLE ProfileProgress (
	ProfileID INT PRIMARY KEY REFERENCES Profiles (ProfileID) NOT NULL
	, CurrentMap INT REFERENCES Maps (MapID) NOT NULL
	, CurrentNode INT NOT NULL --current node number in the map
	, AnimalID INT REFERENCES Animals (AnimalID) NOT NULL);

CREATE TABLE ProfileAnimals (
	ProfileAnimalID INT PRIMARY KEY IDENTITY
	, AnimalID INT REFERENCES Animals (AnimalID) NOT NULL
	, ProfileID INT REFERENCES Profiles (ProfileID) NOT NULL
	, Active BIT NOT NULL DEFAULT 1); -- 1 means active in sanctuary

--CREATE TABLE GameCategories (
--	GameCategoryID INT PRIMARY KEY IDENTITY
--	, GameCategoryName VARCHAR(50) NOT NULL);

CREATE TABLE MiniGames (
	MiniGameID INT PRIMARY KEY IDENTITY
	--, MiniGameCategoryID INT REFERENCES GameCategories (GameCategoryID) NOT NULL
	, MiniGameCategoryID INT NOT NULL
	, MiniGamePath VARCHAR(100) NOT NULL 
	, MiniGameName VARCHAR(50) NOT NULL
	, MinDifficulty INT NOT NULL
	, MaxDifficulty INT NOT NULL);

--CREATE TABLE MiniGameMedia (
--	MediaID INT PRIMARY KEY IDENTITY
--	, MiniGameID INT REFERENCES Minigames (MiniGameID) NOT NULL
--	, Difficulty INT DEFAULT NULL	--nulled if media is used for every instance of that game
--	, MiniGameMedia VARBINARY(max) NOT NULL);

CREATE TABLE ProfileProgressHistory (
	ProgressID INT PRIMARY KEY IDENTITY
	, ProfileID INT REFERENCES Profiles (ProfileID) NOT NULL
	, MiniGameID INT REFERENCES Minigames (MiniGameID) NOT NULL);


--------------CREATE TRIGGERS---------------------
GO
CREATE TRIGGER EightProfileTrigger
	ON Profiles
	AFTER INSERT
AS 
	IF EXISTS (SELECT Inserted.ProfileID 
				FROM inserted 
				JOIN AspNetUsers
				ON inserted.UserID = AspNetUsers.UserID
				JOIN Profiles
				ON AspNetUsers.UserID = Profiles.UserID
				WHERE inserted.UserID = AspNetUsers.UserID
				GROUP BY Inserted.ProfileID
				HAVING COUNT(Profiles.UserID) > 8
				)
	BEGIN
		;THROW 50400, 'Too many profiles', 1;
		PRINT 'Error ' + CONVERT(VARCHAR, ERROR_NUMBER(), 1)
			+ ': ' + ERROR_MESSAGE();
		ROLLBACK TRAN
	END;
GO

CREATE TRIGGER ActiveAnimalTrigger
	ON ProfileAnimals
	AFTER INSERT
AS 
	IF EXISTS (SELECT inserted.ProfileID 
				FROM inserted 
				JOIN ProfileAnimals AS PA
				ON inserted.ProfileID = PA.ProfileID
				WHERE inserted.ProfileID = PA.ProfileID
				AND PA.Active = 1
				GROUP BY inserted.ProfileID
				HAVING COUNT(PA.AnimalID) > 20
				)
	BEGIN
		;
		UPDATE ProfileAnimals
		SET Active = 0
		WHERE ProfileAnimalID = 
			(SELECT MIN(ProfileAnimalID)
			FROM ProfileAnimals
			WHERE ProfileID = (SELECT ProfileID FROM inserted)
			AND Active = 1)
	END;
GO

CREATE TRIGGER Three_MiniGame_Trigger
	 ON ProfileProgressHistory
	 AFTER INSERT
AS 
	IF EXISTS (SELECT inserted.ProfileID
				FROM inserted 
				JOIN ProfileProgressHistory AS PPH
				ON inserted.ProfileID = PPH.ProfileID
				WHERE inserted.ProfileID = PPH.ProfileID
				GROUP BY inserted.ProfileID
				HAVING COUNT(PPH.MiniGameID) > 3
				)
	BEGIN
		;
		DELETE FROM ProfileProgressHistory
		WHERE ProfileID = 
			(SELECT ProfileID
			WHERE ProfileID = (SELECT ProfileID FROM inserted)
			AND
			ProgressID =
				(SELECT MIN(ProgressID)
					FROM ProfileProgressHistory
					WHERE ProfileID = (SELECT ProfileID FROM inserted)))
	END;
GO