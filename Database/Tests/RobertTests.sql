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
-- Testing for valid data Insertion for nodes.
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
	PRINT '-----------------------------------------------------------'


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
	PRINT '-----------------------------------------------------------'

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
	PRINT '-----------------------------------------------------------'

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
	PRINT '-----------------------------------------------------------'

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
	PRINT '-----------------------------------------------------------'

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
	PRINT '-----------------------------------------------------------'


	
--====================================
-- Insert map name longer than 50 characters.
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Maps(MapName, ImageID, SoundID)
	VALUES ('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', 1, 1);
	PRINT 'FAILURE: A map name longer than 50 characters was inserted into Map table.'
	DELETE FROM Maps
	WHERE MapName = 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm' AND ImageID = 1 AND SoundID = 1;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: A map name longer than 50 characters was not inserted into Map table.'
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH;
	PRINT '-----------------------------------------------------------'

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
	PRINT '-----------------------------------------------------------'

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
END CATCH
		PRINT '-----------------------------------------------------------'

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
END CATCH
		PRINT '-----------------------------------------------------------'

/*
CREATE TABLE Images (
	ImageID INT PRIMARY KEY IDENTITY
	, ImageClass INT NOT NULL
	, Images VARBINARY(max) NOT NULL
	, ImageName VARCHAR(50) NOT NULL);
*/

--====================================
-- ImageName longer than 50 characters.
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (1, 0xFFD8FFE00, 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
	PRINT  'FAILURE: An ImageNamename longer than 50 characters was inserted into Images table.'
	DELETE FROM Images
	WHERE ImageClass = 1 AND Images = 0xFFD8FFE00 AND ImageName = 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: An ImageName longer than 50 characters was not inserted into Images table.'
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'


--====================================
-- NULL ImageClass
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (NULL, 0xFFD8FFE00, 'Test');
	PRINT  'FAILURE: Null ImageClass was inserted into Images.'
	DELETE FROM Images
	WHERE ImageClass IS NULL AND Images = 0xFFD8FFE00 AND ImageName = 'Test';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null ImageClass not insertable into Images.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL Images
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (1, NULL, 'Test');
	PRINT  'FAILURE: Null Images inserted into Images.'
	DELETE FROM Images
	WHERE ImageClass = 1 AND Images IS NULL AND ImageName = 'Test';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null Images not insertable into Images.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL ImageName
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Images(ImageClass, Images, ImageName)
	VALUES (1, 0xFFD8FFE00, NULL);
	PRINT  'FAILURE: Null ImageName was inserted into Images.'
	DELETE FROM Images
	WHERE ImageClass = 1 AND Images = 0xFFD8FFE00 AND ImageName IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null ImageName not insertable into Images.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

/*
CREATE TABLE Sounds (
	SoundID INT PRIMARY KEY IDENTITY
	, SoundClass INT NOT NULL
	, Sound VARBINARY(max) NOT NULL
	, SoundName VARCHAR(50) NOT NULL);
*/

--====================================
-- SoundName longer than 50 characters.
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Sounds(SoundClass, Sound, SoundName)
	VALUES (1, 0xFFD8FFE00, 'sssssssssssssssssssssssssssssssssssssssssssssssssss');
	PRINT  'FAILURE: An ImageNamename longer than 50 characters was inserted into Images table.'
	DELETE FROM Sounds
	WHERE SoundClass = 1 AND Sound = 0xFFD8FFE00 AND SoundName = 'sssssssssssssssssssssssssssssssssssssssssssssssssss';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: An ImageName longer than 50 characters was not inserted into Images table.'
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL SoundClass
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Sounds(SoundClass, Sound, SoundName)
	VALUES (NULL, 0xFFD8FFE00, 'Test');
	PRINT  'FAILURE: Null SoundClass was inserted into Sounds.'
	DELETE FROM Sounds
	WHERE SoundClass IS NULL AND Sound = 0xFFD8FFE00 AND SoundName = 'Test';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null SoundClass not insertable into Sounds.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL Sound
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Sounds(SoundClass, Sound, SoundName)
	VALUES (1, NULL, 'Test');
	PRINT  'FAILURE: Null Sound was inserted into Sounds.'
	DELETE FROM Sounds
	WHERE SoundClass = 1 AND Sound IS NULL AND SoundName = 'Test';
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null ImageClass not insertable into Images.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'

--====================================
-- NULL SoundName
--====================================
USE ToTheRescue;
BEGIN TRY
	INSERT INTO Sounds(SoundClass, Sound, SoundName)
	VALUES (1, 0xFFD8FFE00, NULL);
	PRINT  'FAILURE: Null SoundName was inserted into Sounds.'
	DELETE FROM Sounds
	WHERE SoundClass = 1 AND Sound = 0xFFD8FFE00 AND SoundName IS NULL;
END TRY
BEGIN CATCH
	PRINT 'SUCCESS: Null SoundName not insertable into Sounds.';
	PRINT 'Error ' + CONVERT(varchar, ERROR_NUMBER(), 1)
	+ ': ' + ERROR_MESSAGE();
END CATCH
	PRINT '-----------------------------------------------------------'