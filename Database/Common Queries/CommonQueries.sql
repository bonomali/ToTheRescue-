--ToTheRescue 
--Common queries
use ToTheRescue

/**********************************************************************
* Purpose: This query checks to see if the user entered a correct username 
* and a correct password
***********************************************************************/

--These variables represent a user's entered information
declare @userName varchar(50) = 'fakeUser1@gmail.com'
declare @userEncryptedPass varchar(50) = 'WeJcFMQ/8+8QJ/w0hHh+0g=='

if not exists (select UserName from Users where Username = @userName)
	throw 50001, 'Not a valid username.', 1;

if not exists (select UserPassword from Users where Username = @userName and UserPassword = @userEncryptedPass)
	throw 50002, 'Not a valid password.', 1;

/**********************************************************************
* Purpose: This query checks to see if a user is trying to make an account,
* that the email he or she is inputting is unique.
***********************************************************************/

declare @userName2 varchar(50) = 'myFakeUserName@matt.com'
if exists (select UserName from Users where Username = @userName2)
	throw 50001, 'This username already exists.', 1;
	
/**********************************************************************
* Purpose: This query gets a profile's current map, current node and
* the animal to be saved at the end of that map (Essentially the information
* in the ProfileProgress table).
***********************************************************************/

--this is the profile's ID (unique identifier of a profile) from which the 
--information will be pulled from
declare @profileID int = 3

--check to make sure it's a valid profileID
if not exists (select ProfileID from Profiles where ProfileID = @profileID)
	throw 50003, 'Invalid ProfileID', 1;

select CurrentMap, CurrentNode, AnimalID 
from ProfileProgress
where ProfileID = @profileID;

/**********************************************************************
* Purpose: This query gets a profile's profile name, avatarID, 
* difficulty level, performance statistic, subject filters, toggle 
* sound option and toggle music option
***********************************************************************/

declare @profileID2 int = 4

if not exists (select ProfileID from Profiles where ProfileID = @profileID2)
	throw 50004, 'Invalid profile ID', 1;

select ProfileName, AvatarID, Difficulty, SubjectFilter, ToggleSound, ToggleMusic
from Profiles
where ProfileID = @profileID2;

/**********************************************************************
* Purpose: This query gets a profile's specific Avatar picture.
***********************************************************************/
declare @profileID3 int = 5

if not exists (select ProfileID from Profiles where ProfileID = @profileID3)
	throw 50005, 'Invalid profile ID', 1;

--gets the specific avatar for @profileID3
select Images
from Images inner join Profiles
on Images.ImageID = Profiles.AvatarID
where Profiles.ProfileID = @profileID3;

--should I error check for if this doesn't return any rows? Meaning the profile hasn't selected
--an avatar yet?

/**********************************************************************
* Purpose: This query gets a profile's specific animal they are trying to
* save.
***********************************************************************/
declare @profileID4 int = 6

if not exists (select ProfileID from Profiles where ProfileID = @profileID4)
	throw 50006, 'Invalid profile ID', 1;

--retrieves the specific animal image a profile is currently trying to
--save 
Select Images
from Profiles inner join ProfileProgress
on Profiles.ProfileID = ProfileProgress.ProfileID
inner join Animals
on ProfileProgress.AnimalID = Animals.AnimalID
inner join Images
on Animals.ImageID = Images.ImageID
where Profiles.ProfileID = @profileID4;

--should I error check for if this doesn't return any rows? Meaning there is no animal
--to be saved at the end of a map

/**********************************************************************
* Purpose: This query gets the last three minigames a profile played.
***********************************************************************/
declare @profileID5 int = 7

if not exists (select ProfileID from Profiles where ProfileID = @profileID5)
	throw 50007, 'Invalid profile ID', 1;

--Pulls the last three minigames played from a specific profile 
select MiniGameID
from ProfileProgressHistory
where ProfileID = @profileID5;

/**********************************************************************
* Purpose: Grabs the image and sound for a map. 
***********************************************************************/

DECLARE @mapID int = 3

IF NOT EXISTS (SELECT MapID FROM Maps WHERE MapID = @mapID)
	THROW 50007, 'Invalid map ID', 1;

SELECT Images, Sound
FROM Maps
	JOIN Images on Maps.ImageID = Images.ImageID
	JOIN Sounds on Maps.SoundID = Sounds.SoundID
where Maps.MapID = @mapID;

/**********************************************************************
* Purpose: Grabs the nodes for the current map.
***********************************************************************/
DECLARE @mapID2 int = 6

IF NOT EXISTS (SELECT MapID FROM Maps WHERE MapID = @mapID2)
	THROW 50008, 'Invalid map ID', 1;

SELECT NodeID, XCoordinate, YCoordinate
FROM Maps
	JOIN Nodes on Maps.MapID = Nodes.MapID
where Maps.MapID = @mapID2;

/**********************************************************************
* Purpose: Grabs all of the animals in a profile's sanctuary. 
***********************************************************************/
DECLARE @profileID6 int = 4

IF NOT EXISTS (SELECT MapID FROM Maps WHERE MapID = @profileID6)
	THROW 50009, 'Invalid profile ID', 1;
SELECT Funfact, Images, Sound
FROM ProfileAnimals
	JOIN Animals on ProfileAnimals.AnimalID = Animals.AnimalID
	JOIN Images on Animals.ImageID = Images.ImageID
	JOIN Sounds on Animals.SoundID = Sounds.SoundID
WHERE ProfileAnimals.ProfileID = @profileID6;

/**********************************************************************
* Purpose: Grabs the information about a MiniGame. 
***********************************************************************/
DECLARE @minigameID int = 5

IF NOT EXISTS (SELECT MiniGameID FROM Minigames WHERE MiniGameID = @minigameID)
	THROW 50011, 'Invalid game ID', 1;

SELECT MiniGameCode, MiniGameName
FROM Minigames
WHERE Minigames.MiniGameID = @minigameID;

/**********************************************************************
* Purpose: Grabs the media for a MiniGame.
***********************************************************************/

DECLARE @minigameID2 int = 1
DECLARE @difficulty int = 2

IF NOT EXISTS (SELECT MiniGameID FROM Minigames WHERE MiniGameID = @minigameID2)
	THROW 50012, 'Invalid game ID', 1;

IF NOT EXISTS (SELECT MiniGameID FROM Minigames WHERE MiniGameID = @minigameID2 AND MinDifficulty <= @difficulty AND MaxDifficulty >= @difficulty)
	THROW 50013, 'Invalid game ID', 1;

SELECT MiniGameMedia
FROM Minigames
	JOIN MiniGameMedia on Minigames.MiniGameID = MiniGameMedia.MiniGameID
WHERE Minigames.MiniGameID = @minigameID2 AND (Difficulty = @difficulty OR Difficulty IS NULL);