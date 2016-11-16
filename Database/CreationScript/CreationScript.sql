--ToTheRescue!
--Creation scrip
--Description: Creates and deletes the tables of the revised ER diagram

--Note: Feel free to edit any of the VARCHAR(50) to a reasonable amount of characters
USE ToTheRescue;

DROP TABLE ProfileProgressHistory;
DROP TABLE MiniGameMedia;
DROP TABLE MiniGames;
DROP TABLE GameCategories;
DROP TABLE ProfileAnimals;
DROP TABLE ProfileProgress;
DROP TABLE Profiles;
DROP TABLE Users;
DROP TABLE Animals;
DROP TABLE Nodes;
DROP TABLE Maps;
DROP TABLE Sounds;
DROP TABLE Images;

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
	, XCoordinate INT NOT NULL
	, YCoordinate INT NOT NULL
	, PRIMARY KEY (MapID, NodeID));

CREATE TABLE Animals (
	AnimalID INT PRIMARY KEY IDENTITY
	, FunFact VARCHAR(250)
	, Shiny BIT NOT NULL --1 means it is shiny
	, SoundID INT REFERENCES Sounds (SoundID) NOT NULL
	, ImageID INT REFERENCES Images (ImageID) NOT NULL);

CREATE TABLE Users (
	UserID INT PRIMARY KEY IDENTITY
	, UserPassword NVARCHAR(50) NOT NULL
	, Username NVARCHAR(50) unique NOT NULL); --NVARCHAR allows for unicode characters in other languages

CREATE TABLE Profiles (
	ProfileID INT PRIMARY KEY IDENTITY
	, UserID INT REFERENCES Users (UserID) NOT NULL
	, AvatarID INT REFERENCES Images (ImageID) NOT NULL
	, ProfileName NVARCHAR(30) NOT NULL
	, ToggleSound BIT NOT NULL default 1 --0 = sound off, 1 = sound on, defualted to sound on
	, ToggleMusic BIT NOT NULL default 1
	, Difficulty INT NOT NULL
	, PerformanceStat float NOT NULL
	, SubjectFilter VARCHAR(50));

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

CREATE TABLE GameCategories (
	GameCategoryID INT PRIMARY KEY IDENTITY
	, GameCategoryName VARCHAR(50) NOT NULL);

CREATE TABLE MiniGames (
	MiniGameID INT PRIMARY KEY IDENTITY
	, MiniGameCategoryID INT REFERENCES GameCategories (GameCategoryID) NOT NULL
	, MiniGameCode VARCHAR(max) NOT NULL --syntax for clob
	, MiniGameName VARCHAR(50) NOT NULL
	, MinDifficulty INT NOT NULL
	, MaxDifficulty INT NOT NULL);

CREATE TABLE MiniGameMedia (
	MediaID INT PRIMARY KEY IDENTITY
	, MiniGameID INT REFERENCES Minigames (MiniGameID) NOT NULL
	, Difficulty INT default NULL	--nulled if media is used for every instance of that game
	, MiniGameMedia VARBINARY(max) NOT NULL);

CREATE TABLE ProfileProgressHistory (
	ProgressID INT PRIMARY KEY IDENTITY
	, ProfileID INT REFERENCES Profiles (ProfileID) NOT NULL
	, MiniGameID INT REFERENCES Minigames (MiniGameID) NOT NULL);