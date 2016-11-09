use ToTheRescue

--
-- TEST Node, maps, images, sounds
--	Current Completed: Node, Maps
--


/*
CREATE TABLE Nodes (
	MapID INT REFERENCES Maps (MapID) NOT NULL
	, NodeID INT IDENTITY
	, XCoordinate INT NOT NULL
	, YCoordinate INT NOT NULL
	, PRIMARY KEY (MapID, NodeID));
	*/

--====================================
-- Testing for valid data Insertion.
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (1, 0, 0);
	PRINT 'SUCCESS: A valid record was inserted into Nodes.'
	DELETE FROM Nodes
	WHERE MapID = 1 AND XCoordinate = 0 AND YCoordinate = 0;
END TRY
BEGIN CATCH
	PRINT 'FAILURE: A valid record was not inserted into Nodes.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

--====================================
-- NULL MapID
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (NULL, 0, 0);
	PRINT 'FAILURE: Null MapID was inserted in Nodes.'
	DELETE FROM Nodes
	WHERE MapID IS NULL AND XCoordinate = 0 AND YCoordinate = 0;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into MapID of Nodes.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

--====================================
-- NULL X
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (1, NULL, 0);
	PRINT 'FAILURE: Null Record was inserted into XCoordinate.'
	DELETE FROM Nodes
	WHERE MapID = 1 AND XCoordinate IS NULL AND YCoordinate = 0;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into XCoordinate.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

--====================================
-- NULL Y
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (1, 0, NULL);
	PRINT 'FAILURE: Null Record was inserted into YCoordinate.'
	DELETE FROM Nodes
	WHERE MapID = 1 AND XCoordinate = 0 AND YCoordinate IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into YCoordinate.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

--====================================
-- Invalid MapID
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Nodes(MapID, XCoordinate, YCoordinate)
	VALUES (25, 0, 0);
	PRINT 'FAILURE: Node added to map that doesnt exist.'
	DELETE FROM Nodes
	WHERE MapID = 25 AND XCoordinate = 0 AND YCoordinate = 0;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Node not added to map that doesnt exist.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

/*
CREATE TABLE Maps (
MapID INT PRIMARY KEY IDENTITY
, MapName VARCHAR(50) NOT NULL
, ImageID INT REFERENCES Images (ImageID) NOT NULL
, SoundID INT REFERENCES Sounds (SoundID) NOT NULL);
*/

--====================================
-- Insert Valid Entry
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES ('Herpaderp', 1, 1);
	PRINT 'SUCCESS: Valid Map record was inserted.'
	DELETE FROM Maps
	WHERE MapName = 'Herpaderp' AND ImageID = 1 AND SoundID = 1;
END TRY
BEGIN CATCH
	PRINT 'FAILURE: Valid Map Record was not inserted.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

--====================================
-- NULL MapName
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES (NULL, 1, 1);
	PRINT  'FAILURE: Null MapName was inserted in Maps.'
	DELETE FROM Maps
	WHERE MapName IS NULL AND ImageID = 1 AND SoundID = 1;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into MapName of Maps.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

--====================================
-- NULL ImageID
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES ('Derpfish', NULL, 1);
	PRINT  'FAILURE: Null ImageID was inserted in Maps.'
	DELETE FROM Maps
	WHERE MapName = 'Derpfish' AND ImageID IS NULL AND SoundID = 1;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into ImageID of Maps.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

--====================================
-- NULL SoundID
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES ('Derpfish', 1, NULL);
	PRINT  'FAILURE: Null SoundID was inserted in Maps.'
	DELETE FROM Maps
	WHERE MapName = 'Derpfish' AND ImageID = 1 AND SoundID IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into SoundID of Maps.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;


/*
CREATE TABLE Images (
	ImageID INT PRIMARY KEY IDENTITY
	, ImageClass INT NOT NULL
	, Images VARBINARY(max) NOT NULL
	, ImageName VARCHAR(50) NOT NULL);
*/

--====================================
-- NULL ImageClass
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (1, );
	PRINT  'FAILURE: Null SoundID was inserted in Maps.'
	DELETE FROM Maps
	WHERE MapName = 'Derpfish' AND ImageID = 1 AND SoundID IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null not insertable into SoundID of Maps.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;

/*
CREATE TABLE Sounds (
	SoundID INT PRIMARY KEY IDENTITY
	, SoundClass INT NOT NULL
	, Sound VARBINARY(max) NOT NULL
	, SoundName VARCHAR(50) NOT NULL);
*/