use ToTheRescue;

DROP FUNCTION IsExistingUserName;
DROP FUNCTION IsValidPassword;
DROP FUNCTION GetProfileProgressInfo;
--Note, return val of 1 is true and return val of 0 is false

/**********************************************************************
* Purpose: This function checks to see if the user entered an 
* existing username. A return value of 1 means the username exists,
* 0 means the username does not exist.
***********************************************************************/
GO
CREATE FUNCTION IsExistingUserName
	(@userName VARCHAR(50))
	RETURNS BIT
BEGIN
	DECLARE @existingUserName BIT = 0;
	IF EXISTS (SELECT UserName FROM Users WHERE Username = @userName)
	SET @existingUserName = 1; 
RETURN @existingUserName;
END;

/**********************************************************************
* Purpose: This function checks to see if the user entered a 
* correct password. A return value of 1 means that the user entered
* a correct password, a return value of 0 means that the user entered
* an incorrect password.
***********************************************************************/
GO 
CREATE FUNCTION IsValidPassword
	(@userName VARCHAR(50), @password VARCHAR(50))
	RETURNS BIT
BEGIN
	DEClARE @validPassword BIT = 0;
	IF EXISTS (SELECT UserPassword FROM Users WHERE Username = @userName AND UserPassword = @password)
		SET @validPassword = 1;
RETURN @validPassword;
END;

/**********************************************************************
* Purpose: This function gets a profile's current map, 
* current node and ID of the animal to be saved at the end of 
* the current map (Essentially the information in the ProfileProgress 
* table).
***********************************************************************/
GO
CREATE FUNCTION GetProfileProgressInfo
	(@profileID int)
	RETURNS TABLE
RETURN
(SELECT CurrentMap, CurrentNode, AnimalID
FROM ProfileProgress
WHERE ProfileID = @profileID);