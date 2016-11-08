--ToTheRescue!
--Triggers

--====================================
-- This Trigger is fired when a user tries 
-- to add more than eight profiles to their account
-- Works
--====================================
USE ToTheRescue
GO

DROP TRIGGER EightProfileTrigger
GO

CREATE TRIGGER EightProfileTrigger
	ON Profiles
	AFTER INSERT
AS 
	IF EXISTS (SELECT Inserted.ProfileID 
				FROM inserted 
				JOIN Users
				ON inserted.UserID = Users.UserID
				JOIN Profiles
				ON Users.UserID = Profiles.UserID
				WHERE inserted.UserID = Users.UserID
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

--====================================
-- This Trigger fires when a > 20 animals are being 
-- added to the sanctuary
-- Works
--====================================
USE ToTheRescue
GO
DROP TRIGGER TwentyOneAnimalTrigger
GO

CREATE TRIGGER TwentyOneAnimalTrigger
	ON ProfileAnimals
	AFTER INSERT
AS 
	IF EXISTS (SELECT inserted.ProfileID 
				FROM inserted 
				JOIN ProfileAnimals AS PA
				ON inserted.ProfileID = PA.ProfileID
				WHERE inserted.ProfileID = PA.ProfileID
				GROUP BY inserted.ProfileID
				HAVING COUNT(PA.AnimalID) > 20
				)
	BEGIN
		;THROW 50001, 'Too many animals', 1;
		PRINT 'Error ' + CONVERT(VARCHAR, ERROR_NUMBER(), 1)
			+ ': ' + ERROR_MESSAGE();
		ROLLBACK TRAN
	END;
GO

--====================================
-- This Trigger fires when a third MiniGameID is 
-- added to a certain ProfileID
--Works
--====================================
USE ToTheRescue
GO

DROP TRIGGER Three_MiniGame_Trigger
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