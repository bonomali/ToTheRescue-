use ToTheRescue;

/**********************************************************************
* Purpose: Tests that a valid row of data can be inserted into the Users table.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123', 'testUser@hotmail.com');
	PRINT 'SUCCESS: a new row was inserted into the Users table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: the new row was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';
	
/**********************************************************************
* Purpose: Tests that a row of data can be deleted from the Users table.
***********************************************************************/
BEGIN TRY
	DELETE FROM Users
		WHERE Username = 'testUser@hotmail.com';
	PRINT 'SUCCESS: a row was deleted from the Users table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: a row was not deleted from the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that you can't have a username longer than 50 characters.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123', 'testUser@hotmail.comtestUser@hotmail.comtestUser@hotmail.com');
	PRINT 'FAILURE: a username longer than 50 characters was inserted into the Users table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: the username longer than 50 characters was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that you can't have a password longer than 50 characters.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123123123123123123123123123123123123123123123123123123', 'testUser@hotmail.com');
	PRINT 'FAILURE: a password longer than 50 characters was inserted into the Users table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: the password longer than 50 characters was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that you can't have a null username be inserted into the
* Users table.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword)
	VALUES
		('123');
	PRINT 'FAILURE: a null username was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: the null username was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that you can't have a null password be inserted into the
* Users table.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(Username)
	VALUES
		('testUser@hotmail.com');
	PRINT 'FAILURE: a null password was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: the null password was not inserted into the Users table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that only unique usernames get inserted into the Users
* table.
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username)
	VALUES
		('123', 'fakeUser1@gmail.com');
	PRINT 'FAILURE: a row with a non-unique username was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a row with a non-unique username was not inserted into the Users table.';       
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that the UserID can't have values explicitly inserted 
* (it is an identity column).
***********************************************************************/
BEGIN TRY
	INSERT INTO Users
		(UserPassword, Username, UserID)
	VALUES
		('123', 'testUser@hotmail.com', 5);
	PRINT 'FAILURE: a row with a non-unique UserID was inserted into the Users table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a row with a non-unique UserID was not inserted into the Users table.';   
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a valid row of data can be deleted form the ProfileProgress
* table.
***********************************************************************/
BEGIN TRY
	DELETE FROM ProfileProgress
		WHERE ProfileID = 35;
	PRINT 'SUCCESS: a row was deleted from the ProfileProgress table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: a row was not deleted from the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a valid row of data can be inserted into the ProfileProgress
* table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentMap, CurrentNode, AnimalID)
	VALUES
		(35, 1, 3, 12);
	PRINT 'SUCCESS: a new row was inserted into the ProfileProgress table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: the new row was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a repeated ProfileID can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentMap, CurrentNode, AnimalID)
	VALUES
		(35, 1, 3, 12);
	PRINT 'FAILURE: a repeated ProfileID was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a repeated ProfileID was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null CurrentMap can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentNode, AnimalID)
	VALUES
		(36, 3, 12);
	PRINT 'FAILURE: a null CurrentMap was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null CurrentMap was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null CurrentMap can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentNode, AnimalID)
	VALUES
		(36, 3, 12);
	PRINT 'FAILURE: a null CurrentMap was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null CurrentMap was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null AnimalID can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(ProfileID, CurrentMap, CurrentNode)
	VALUES
		(36, 3, 12);
	PRINT 'FAILURE: a null AnimalID was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null AnimalID was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null ProfileID can't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgress
		(AnimalID, CurrentMap, CurrentNode)
	VALUES
		(36, 3, 12);
	PRINT 'FAILURE: a null ProfileID was inserted into the ProfileProgress table.';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null ProfileID was not inserted into the ProfileProgress table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

--Testing ProfileProgressHistory
/**********************************************************************
* Purpose: Tests that a valid row of data can be deleted form the ProfileProgressHistory
* table.
***********************************************************************/
BEGIN TRY
	DELETE FROM ProfileProgressHistory
		WHERE ProgressID = 104;
	PRINT 'SUCCESS: a row was deleted from the ProfileProgressHistory table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: a row was not deleted from the ProfileProgressHistory table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a valid row of data can be inserted into the ProfileProgressHistory
* table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgressHistory
		(ProfileID, MiniGameID)
	VALUES
		(6, 20);
	PRINT 'SUCCESS: a new row was inserted into the ProfileProgressHistory table';
END TRY
BEGIN CATCH
	PRINT 'FAILURE: the new row was not inserted into the ProfileProgressHistory table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a valid row of data can be inserted into the ProfileProgressHistory
* table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgressHistory
		(ProgressID, ProfileID, MiniGameID)
	VALUES
		(106, 6, 20);
	PRINT 'FAILURE: an explicit Identity column value was inserted into the table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: an explicit Identity column value was not inserted into the table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null ProfileID won't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgressHistory
		(MiniGameID)
	VALUES
		(20);
	PRINT 'FAILURE: a null ProfileID was inserted into the table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null ProfileID  was not inserted into the table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests that a null MiniGameID won't be inserted into the table.
***********************************************************************/
BEGIN TRY
	INSERT INTO ProfileProgressHistory
		(ProfileID)
	VALUES
		(106);
	PRINT 'FAILURE: a null MiniGameID was inserted into the table';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: a null MiniGameID  was not inserted into the table.';     
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests the IsExistingUser function. Given an existing username
* return that it does exist.
***********************************************************************/
BEGIN TRY
	IF (dbo.IsExistingUserName('fakeUser1@gmail.com') = 1)
		PRINT 'SUCCESS: the function said the username already existed.'; 
	ELSE
		PRINT 'FAILURE: the function said the username did not already existed.'; 
END TRY
BEGIN CATCH
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests the IsExistingUser function. Given a non existing username
* return false.
***********************************************************************/
BEGIN TRY
	IF (dbo.IsExistingUserName('fakeUser1@gmail.co') = 1)
		PRINT 'FAILURE: the function said the username already existed.'; 
	ELSE
		PRINT 'SUCCESS: the function said the username did not already exist.'; 
END TRY
BEGIN CATCH
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests the IsValidPassword function. Given a valid password
* for a given username, return true.
***********************************************************************/
BEGIN TRY
	IF (dbo.IsValidPassword('fakeUser1@gmail.com', 'WeJcFMQ/8+8QJ/w0hHh+0g==') = 1)
		PRINT 'SUCCESS: the function said the password was valid.'; 
	ELSE
		PRINT 'FAILURE: the function said the password not valid.'; 
END TRY
BEGIN CATCH
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests the IsValidPassword function. Given an invalid password
* for a given username, return false.
***********************************************************************/
BEGIN TRY
	IF (dbo.IsValidPassword('fakeUser1@gmail.com', 'WeJcFMQ/8+8QJ/w0hHh+0g=') = 1)
		PRINT 'FAILURE: the function said the password was valid.'; 
	ELSE
		PRINT 'SUCCESS: the function said the password was not valid.'; 
END TRY
BEGIN CATCH
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH

PRINT '-------------------------------------------------------------------';

/**********************************************************************
* Purpose: Tests the GetProfileProgressInfo function. Ensures that
* the correct CurrentMap, CurrentNode and AnimalID for a certain ProfileID
* is returned.
***********************************************************************/
BEGIN TRY
	CREATE TABLE #temp(CurrentMap INT, CurrentNode INT, AnimalID INT)
	INSERT INTO #temp
	VALUES (3, 6, 4);
	IF (SELECT COUNT(*) AS UnMatchedProgress
		FROM dbo.GetProfileProgressInfo(3) AS returnTable
		FULL OUTER JOIN (SELECT * FROM #temp) AS expected ON
			(returnTable.CurrentMap = expected.CurrentMap 
			AND returnTable.CurrentNode = expected.CurrentNode AND 
			returnTable.AnimalID = expected.AnimalID)
		WHERE (returnTable.CurrentMap IS NULL OR returnTable.CurrentNode IS NULL OR 
			   returnTable.AnimalID IS NULL) OR (expected.CurrentMap IS NULL OR 
			   expected.CurrentNode IS NULL OR expected.AnimalID IS NULL)) > 0
		PRINT 'FAILURE: did not return correct ProfileProgress information'
	ELSE
		PRINT 'SUCCESS: the correct ProfileProgress information was returned'
END TRY
BEGIN CATCH
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1) + ': ' + ERROR_MESSAGE(); 
END CATCH
DROP TABLE #temp;