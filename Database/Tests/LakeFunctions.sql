/************************************************************
* This Function returns the profile row associated with the 
* provided ProfileID
************************************************************/

USE ToTheRescue
DROP FUNCTION GetProfile
GO
CREATE FUNCTION GetProfile
				(@profileID2 INT)
				RETURNS TABLE

RETURN(SELECT ProfileName, AvatarID, ReadingDifficultyLevel, MathDifficultyLevel
			, ReadingPerformanceStat, MathPerformanceStat
			,SubjectFilter, ToggleSound, ToggleMusic
		FROM Profiles
		WHERE ProfileID = @profileID2);
GO


/************************************************************
* This Function returns the avatar associated with the  
* provided ProfileID
************************************************************/
USE ToTheRescue
DROP FUNCTION GetProfileAvatar
GO
CREATE FUNCTION GetProfileAvatar
				(@profileID3 INT)
				RETURNS TABLE

RETURN(SELECT Images
		FROM Images 
		INNER JOIN Profiles
		ON Images.ImageID = Profiles.AvatarID
		WHERE Profiles.ProfileID = @profileID3);
GO


/************************************************************
* This Function returns the the current animal a user is trying 
* to save associated with the provided ProfileID
************************************************************/
USE ToTheRescue
DROP FUNCTION GetCurrentAnimal
GO
CREATE FUNCTION GetCurrentAnimal
				(@profileID4 INT)
				RETURNS TABLE

RETURN(SELECT Images
		FROM Profiles 
		INNER JOIN ProfileProgress
		ON Profiles.ProfileID = ProfileProgress.ProfileID
		INNER JOIN Animals
		ON ProfileProgress.AnimalID = Animals.AnimalID
		INNER JOIN Images
		ON Animals.ImageID = Images.ImageID
		WHERE Profiles.ProfileID = @profileID4);
GO
