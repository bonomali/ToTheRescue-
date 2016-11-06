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
inner join Images
on ProfileProgress.AnimalID = Images.ImageID
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