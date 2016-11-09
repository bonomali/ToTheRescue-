--ToTheRescue 
--Update
use ToTheRescue

/**********************************************************************
* Purpose: Updates progress and history when a user finishes a minigame. 
***********************************************************************/

DECLARE @MiniGameID int = 3
DECLARE @ProfileID int = 6

INSERT INTO ProfileProgressHistory (MiniGameID, ProfileID)
VALUES
(@MiniGameID, @ProfileID);

UPDATE ProfileProgress
SET CurrentNode = CurrentNode + 1
WHERE ProfileID = @ProfileID;

