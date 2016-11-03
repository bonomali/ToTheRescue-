--ToTheRescue!
--Creation scrip
--Description: Creates and deletes the tables of the revised ER diagram

--Note: Feel free to edit any of the varchar(50) to a reasonable amount of characters
use ToTheRescue

drop table ProfileProgressHistory;
drop table MiniGameMedia;
drop table MiniGames;
drop table GameCategories;
drop table ProfileAnimals;
drop table ProfileProgress;
drop table Profiles;
drop table Users;
drop table Animals;
drop table Nodes;
drop table Maps;
drop table Sounds;
drop table Images;

create table Images (
	ImageID int primary key identity
	, ImageClass int not null
	, Images varbinary(max) not null
	, ImageName varchar(50) not null);

create table Sounds (
	SoundID int primary key identity
	, SoundClass int not null
	, Sound varbinary(max) not null
	, SoundName varchar(50) not null);

create table Maps (
MapID int primary key identity
, MapName varchar(50) not null
, ImageID int references Images (ImageID)
, SoundID int references Sounds (SoundID));

create table Nodes (
	MapID int references Maps (MapID)
	, NodeID int identity
	, XCoordinate int not null
	, YCoordinate int not null
	, primary key (MapID, NodeID));

create table Animals (
	AnimalID int primary key identity
	, FunFact varchar(250)
	, Shiny bit not null --1 means it is shiny
	, SoundID int references Sounds (SoundID)
	, ImageID int references Images (ImageID));

create table Users (
	UserID int primary key identity
	, UserPassword nvarchar(50) not null
	, Username nvarchar(50) unique not null); --nvarchar allows for unicode characters in other languages

create table Profiles (
	ProfileID int primary key identity
	, UserID int references Users (UserID)
	, AvatarID int references Images (ImageID)
	, ProfileName nvarchar(30) not null
	, ToggleSound bit not null default 1 --0 = sound off, 1 = sound on, defualted to sound on
	, ToggleMusic bit not null default 1
	, Difficulty int not null
	, PerformanceStat float not null
	, SubjectFilter varchar(50));

create table ProfileProgress (
	ProfileID int primary key references Profiles (ProfileID)
	, CurrentMap int references Maps (MapID)
	, CurrentNode int not null --current node number in the map
	, AnimalID int references Animals (AnimalID));

create table ProfileAnimals (
	ProfileAnimalID int primary key identity
	, AnimalID int references Animals (AnimalID)
	, ProfileID int references Profiles (ProfileID));

create table GameCategories (
	GameCategoryID int primary key identity
	, GameCategoryName varchar(50) not null);

create table MiniGames (
	MiniGameID int primary key identity
	, MiniGameCategoryID int references GameCategories (GameCategoryID)
	, MiniGameCode varchar(max) not null --syntax for clob
	, MiniGameName varchar(50) not null
	, MinDifficulty int not null
	, MaxDifficulty int not null
	, SoundID int references Sounds (SoundID));

create table MiniGameMedia (
	MediaID int primary key identity
	, MiniGameID int references Minigames (MiniGameID)
	, Difficulty int default null	--nulled if media is used for every instance of that game
	, MiniGameMedia varbinary(max) not null);

create table ProfileProgressHistory (
	ProgressID int primary key identity
	, ProfileID int references Profiles (ProfileID)
	, MiniGameID int references Minigames (MiniGameID));