INSERT INTO Users (Username, UserPassword)
VALUES 
('fakeUser1@gmail.com', 'WeJcFMQ/8+8QJ/w0hHh+0g=='),			--1
('fakeUser2@gmail.com', 'jldfjoJLNyuih3$$#78y6'),				--2
('fakeUser3@gmail.com', 'GJKHigiBKHuUY$%rh3jbsfksj'),			--3
('fakeUser4@gmail.com', 'fg*^FVjl@$NHKHfhfdfbk*'),				--4
('fakeUser5@gmail.com', 'fjlsjlkkjk%&TGD%%EVJbfkhfnewo'),		--5
('fakeUser6@gmail.com', 'hIyrieuhfkltgj8y&++HIT#Bkfhs'),		--6
('fakeUser7@gmail.com', 'HKM6+==JJGYrytfdfhuuhjjHTygNhoo+'),	--7
('fakeUser8@gmail.com', 'WeJcFMQ/8+8QJ/w0hHh+0g=='),			--8
('fakeUser9@gmail.com', 'fksjti&**GY$TGKJLIfrh#FHIO'),			--9
('fakeUser10@gmail.com', 'GJKHigiBKHuUY$%rh3jbsfksj'),			--10
('fakeUser11@gmail.com', 'klstjkHYHKJBdychjUB+=+=GTTY'),		--11
('fakeUser12@gmail.com', 'WeJcFMQ/8+8QJ/w0hHh+0g=='),			--12
('fakeUser13@gmail.com', 'fg*^FVjl@$NHKHfhfdfbk*'),				--13
('fakeUser14@gmail.com', 'hkDTYvfnl%=+2nfshgioh^&*5ryr9'),		--14
('fakeUser15@gmail.com', 'WeJcFMQ/8+8QJ/w0hHh+0g==');			--15

--Run code to add Images & Sounds

INSERT INTO Profiles (ProfileName, UserID, AvatarID, ToggleSound, ToggleMusic, Difficulty, PerformanceStat, Subjectfilter)
VALUES
('Sophia', 1, 8, 1, 1, 3, 34.1, 0),('Emma', 1, 4, 1, 0, 3, 36, 0),('Lily', 1, 8, 1, 1, 3, 41.2, 1),('Madison', 2, 6, 0, 0, 3, 34.3, 1),('Avery', 3, 7, 1, 1, 3, 43.9, 2),
('Hailey', 3, 8, 1, 1, 3, 47.3, 2),('Layla', 3, 6, 1, 1, 3, 45.7, 2),('Lucas', 3, 3, 1, 1, 1, 24.2, 0),('Caleb', 4, 5, 1, 1, 1, 11.6, 2),('Alexander', 6, 7, 1, 0, 3, 54, 0),
('Matthew', 6, 3, 1, 1, 3, 38.2, 2),('Madelyn', 6, 6, 0, 0, 1, 8.2, 0),('Eli', 7, 7, 0, 1, 1, 7.9, 0),('Isabelle', 7, 8, 1, 1, 3, 66.1, 0),('Cameron', 7, 5, 1, 1, 3, 65, 0),
('Gavin', 7, 3, 1, 0, 3, 47.1, 0),('Leah', 7, 6, 1, 1, 3, 50, 1),('Maya', 7, 8, 0, 0, 3, 48.4, 1),('Kylie', 8, 8, 1, 1, 3, 69.2, 2),('Joseph', 8, 5, 1, 1, 3, 60.3, 2),
('Wyatt', 9, 7, 1, 1, 3, 43.7, 2),('Hunter', 10, 3, 1, 1, 1, 17.8, 0),('Natalie', 10, 4, 1, 1, 1, 19.5, 2),('Chase', 11, 3, 1, 0, 3, 64.8, 0),('Alexis', 11, 8, 1, 1, 3, 57.8, 2),
('Adam', 11, 5, 0, 0, 1, 23.4, 0),('Alex', 12, 7, 0, 1, 1, 18, 0),('Bella', 12, 4, 1, 1, 3, 42.8, 0),('Bailey', 12, 4, 1, 1, 3, 77.7, 2),('Johnathon', 12, 5, 0, 0, 1, 13.6, 0),
('Miles', 13, 7, 0, 1, 1, 16.3, 0),('Jasmine', 14, 4, 1, 1, 3, 79.2, 0),('Nolan', 14, 3, 1, 1, 3, 72.1, 0),('Morgan', 15, 4, 1, 0, 2, 32.9, 0);


INSERT INTO Maps (MapName, ImageID)
VALUES 
('farm', 27),('castle', 28),('winter wonderland', 29),('river', 30),
('beach', 31),('desert', 32),('pyramid', 33);


INSERT INTO Nodes (MapID, XCoordinate, YCoordinate)
VALUES
(1, 18, 5),(1, 15, 14),(1, 5, 8),(1, 5, 17),(1, 12, 7),(1, 7, 16),(2, 19, 14),(2, 11, 16),(2, 14, 8),
(2, 11, 16),(2, 14, 8),(2, 7, 10),(3, 16, 9),(3, 14, 20),(3, 4, 20),(3, 12, 1),(3, 1, 16),(3, 20, 2),
(3, 15, 18),(3, 11, 2),(4, 14, 8),(4, 11, 16),(4, 14, 8),(4, 7, 10),(4, 18, 5),(4, 15, 14),(4, 5, 8),
(4, 12, 17),(5, 6, 7),(5, 3, 16),(5, 19, 14),(5, 11, 16),(5, 14, 8),(5, 11, 13),(5, 14, 8),(5, 7, 10),
(5, 16, 12),(5, 14, 20),(6, 4, 20),(6, 12, 3),(6, 1, 16),(6, 19, 2),(6, 15, 18),(6, 11, 5),(6, 1, 16),
(6, 20, 2),(6, 16, 18),(6, 11, 2),(7, 5, 8),(7, 5, 17),(7, 12, 5),(7, 7, 16),(7, 19, 14),(7, 14, 16),
(7, 14, 8),(7, 11, 16),(7, 14, 10),(7, 7, 10),(7, 14, 9),(7, 18, 20);


INSERT INTO GameCategories (GameCategoryName)
VALUES
('reading:letter recognition'),     
('math:number recognition'),		
('math:shape recognition'),		  
('reading:sorting'),				
('reading:sight word recognition'),	
('math:counting'),				  
('math:addition');				 


INSERT INTO MiniGames (MiniGameCategoryID, MiniGameCode, MiniGameName, MinDifficulty, MaxDifficulty)
VALUES
(1, 'game code here', 'Bubble Pop', 1, 2),
(1, 'game code here', 'Under the Sea', 1, 3),
(1, 'game code here', 'Chicka Bang', 2, 4),
(1, 'game code here', 'Catch a Tiger', 3, 4),
(2, 'game code here', 'Number Limbo', 1, 4),
(2, 'game code here', 'Batter Up', 4, 4),
(2, 'game code here', 'Cooking Time', 2, 4),
(2, 'game code here', 'Number Round-Up', 1, 3),
(3, 'game code here', 'Get in Shape', 1, 3),
(3, 'game code here', 'Shape Hunt', 1, 2),
(3, 'game code here', 'Shape Up', 2, 4),
(4, 'game code here', 'Group Work', 2, 4),
(4, 'game code here', 'Samesies', 1, 3),
(5, 'game code here', 'Sight Words', 4, 4),
(5, 'game code here', 'What''s in sight', 4, 4),
(5, 'game code here', 'Spot the Word', 3, 4),
(5, 'game code here', 'Ring Around the Sight Word', 4, 4),
(6, 'game code here', 'You Can Count On Me', 1, 2),
(6, 'game code here', 'Count All', 2, 3),
(6, 'game code here', 'Juggle Ball', 3, 4),
(7, 'game code here', 'It All Adds Up', 3, 4);


--Run code to add MiniGameMedia


INSERT INTO Animals (ImageID, SoundID, Shiny, FunFact)
VALUES
(7, 6, 0, 'Frogs breathe through their skin'),
(8, 2, 0, 'A newborn elephant can weigh up to 200 pounds'),
(9, 5, 0, 'Dogs can hear noises that humans can''t hear'),
(9, 5, 1, 'Scientists believe that dogs have dreams like people'),
(10, 2, 0, 'Crabs have 10 legs'),
(10, 2, 1, 'The Japanese Spider Crab''s legs are up to 12 feet long'),
(11, 8, 0, 'The Balloon Dog''s favorite food it air'),
(12, 3, 0, 'Fish have gills to breathe under water'),
(12, 3, 1, 'Sharks are fish'),
(13, 2, 0, 'Cheetahs can run as fast as 75 miles per hour for short periods of time'),
(14, 10, 0, 'monkeys show affection by grooming each other'),
(15, 4, 0, 'The milk we drink comes from dairy cows'),
(16, 7, 0, 'A zebra''s stripes help protect them from danger'),
(17, 9, 0, 'The name rhinoceros means ''nose horn'''),
(18, 11, 0, 'The name hippopotamus means ''river horse'''),
(19, 7, 0, 'Male deer are called bucks and grow new antlers every year'),
(20, 9, 0, 'A polar bear has black skin and looks whites because it''s fur is see through'),
(20, 9, 1, 'The polar bear is the largest meat eating animal that lives on land'),
(21, 3, 0, 'A mouse has a pointed nose, round ears, and their tails have little hair'),
(22, 3, 0, 'Badgers are nocturnal, they sleep during the day and are awake at night'),
(23, 7, 0, 'horses can sleep lying down and standing up'),
(23, 7, 1, 'Newborn horses, called foals, can run shortly after being born'),
(24, 6, 0, 'Seals spend most of their lives in the water'),
(25, 11, 0, 'A Rock Hopper penguin can jump up to 5 feet high'),
(26, 3, 0, 'Giant squids are the fastest squids in the sea');


INSERT INTO ProfileAnimals (ProfileID, AnimalID)
VALUES
(2, 23),(2, 11),(2, 41),(2, 2),(2, 35),(3, 29),(3, 3),(3, 9),(4, 11),(4, 45),(6, 17),(6, 17),
(6, 39),(6, 25),(6, 43),(6, 39),(6, 38),(6, 31),(6, 16),(6, 11),(6, 10),(6, 12),(6, 23),(6, 9),
(6, 36),(6, 15),(6, 36),(6, 6),(6, 13),(6, 9),(7, 10),(8, 37),(8, 1),(9, 10),(9, 24),(10, 24),
(10, 41),(12, 23),(12, 32),(12, 29),(12, 14),(12, 1),(13, 28),(13, 39),(13, 32),(13, 33),(14, 37),
(14, 45),(14, 38),(15, 22),(15, 17),(16, 38),(17, 22),(17, 17),(17, 38),(17, 47),(19, 18),(19, 15),
(20, 1),(21, 36),(21, 30),(21, 30),(22, 16),(22, 16),(22, 11),(23, 32),(24, 13),(24, 45),(24,1),(24,5),
(25, 23),(25, 11),(25, 41),(25, 2),(25, 35),(26, 29),(26, 3),(26, 9),(27, 11),(27, 45),(28, 17),(28, 17),
(28, 39),(28, 25),(28, 43),(28, 39),(28, 38),(28, 31),(29, 16),(29, 11),(29, 10),(29, 12),(29, 23),(29, 9),
(29, 36),(29, 15),(29, 36),(29, 6),(29, 13),(29, 9),(31, 10),(31, 37),(31, 1),(32, 10),(32, 24),(33, 24),
(34, 41),(34, 23),(34, 32),(34, 29),(35, 14),(35, 1),(36, 28),(36, 39),(36, 32),(36, 33),(37, 37),
(38, 45),(38, 38),(38, 22),(38, 17),(38, 38),(38, 22),(39, 17),(39, 38),(40, 47),(40, 18),(40, 15),
(40, 1),(40, 36),(41, 30),(41, 30),(42, 16),(42, 16),(42, 11),(43, 32),(44, 13),(44, 45),(44,1),(44,5),
(46, 23),(46, 11),(46, 41),(46, 2),(46, 35),(47, 29),(48, 3),(50, 9),(50, 11),(50, 45),(50, 17),(50, 17),
(50, 39),(51, 25),(51, 43),(52, 39),(52, 38),(52, 31),(52, 16),(53, 11),(53, 10),(56, 12),(56, 23),(56, 9),
(56, 36),(56, 15),(56, 36),(56, 6),(56, 13),(56, 9),(57, 10),(58, 37),(58, 1),(59, 10),(59, 24),(60, 24),
(60, 41),(62, 23),(62, 32),(62, 29),(62, 14),(62, 1),(63, 28),(63, 39),(63, 32),(63, 33),(64, 37),
(64, 45),(64, 38),(65, 22),(65, 17),(66, 38),(67, 22),(67, 17),(67, 38),(67, 47),(69, 18),(69, 15);


INSERT INTO ProfileProgress(ProfileID, CurrentMap, CurrentNode, AnimalID)
VALUES
(2, 1, 3, 5),(3, 3, 6, 44),(4, 2, 1, 7),(5, 3, 4, 23),(6, 7, 12, 50),(7, 6, 8, 36),(8, 1, 4, 7),(9, 7, 2, 27), 
(10, 4, 5, 44),(11, 2, 3, 49),(12, 4, 6, 35),(13, 1, 2, 3),(14, 5, 8, 9),(15, 7, 5, 41),(16, 2, 1, 7),(17, 4, 4, 37),
(18, 2, 1, 21),(19, 7, 6, 16),(20, 4, 3, 43),(21, 6, 8, 11),(22, 1, 1, 4),(23, 6, 4, 13),(24, 6, 5, 14),(25, 4, 8, 47),
(26, 1, 3, 10),(27, 6, 1, 33),(28, 2, 5, 50),(29, 6, 7, 18),(30, 3, 7, 25),(31, 4, 1, 34),(32, 1, 5, 46),(33, 7, 4, 39),
(34, 2, 2, 45),(35, 1, 3, 42),(36, 4, 3, 22),(37, 7, 7, 36),(38, 4, 1, 13),(39, 1, 5, 45),(40, 2, 4, 31),(41, 4, 8, 1),
(42, 3, 3, 3),(43, 5, 9, 40),(44, 5, 4, 6),(45, 7, 1, 3),(46, 3, 6, 4),(47, 1, 4, 45),(48, 7, 4, 5),(49, 5, 3, 43), 
(50, 1, 3, 24),(51, 2, 6, 7),(52, 4, 6, 47),(53, 1, 3, 6),(54, 7, 4, 32),(55, 4, 6, 14),(56, 7, 3, 14),(57, 6, 1, 2),
(58, 3, 1, 46),(59, 2, 3, 50),(60, 7, 12, 1),(61,4, 7, 43),(62, 1, 4, 20),(63, 1, 6, 2),(64, 5, 7, 9),(65, 7, 4, 24), 
(66, 1, 1, 4),(67, 4, 8, 5),(68, 6, 1, 17),(69, 3, 4, 23);


INSERT INTO ProfileProgressHistory(ProfileID, MiniGameID)
VALUES
(2, 41),(2, 13),(2, 32),(3, 35),(3, 38),(3, 12),(4, 34),(4, 16),(4, 2),(5, 7),(5, 13),(5, 20),
(6, 21),(6, 18),(7, 17),(7, 2),(7, 14),(8, 10),(8, 14),(8, 7),(9, 12),(10, 21),(10, 18),(10, 4),
(11, 18),(11, 1),(11, 11),(12, 6),(12, 11),(13, 14),(13, 5),(13, 4),(14, 6),(14, 4),(14, 14),
(15, 15),(15, 19),(15, 20),(16, 17),(16, 20),(16, 2),(17, 16),(17, 7),(17, 3),(18, 21),(18, 14),
(19, 5),(19, 13),(19, 11),(20, 5),(20,3),(20, 19),(21, 19),(21, 4),(21, 10),(22, 9),(22, 9),(22, 2),
(23, 21),(23, 3),(23, 2),(24, 19),(24, 13),(24, 21),(25, 1),(25, 20),(25, 11),(26, 19),(26, 16),
(27, 1),(27, 13),(27, 12),(28, 15),(28, 18),(28, 12),(29, 14),(30, 16),(30, 2),(30, 7),(31, 13),(31, 20),
(31, 13),(32, 18),(32, 17),(33, 2),(33, 14),(33, 4),(34, 14),(34, 17),(34, 12),(35, 2),(35, 18),(36, 14),
(36, 18),(36, 1),(37, 21),(37, 6),(37, 11),(38, 14),(38, 5),(38, 3),(39, 16),(39, 4),(40, 20),
(41, 15),(41, 19),(41, 21),(42, 17),(42, 4),(42, 7),(43, 16),(43, 17),(43, 3),(44, 21),(44, 14),
(44, 5),(45, 13),(45, 11),(46, 5),(46, 3),(46, 19),(47, 19),(47, 4),(47, 10),(48, 9),(48, 19),(50, 2),
(50, 21),(50, 3),(51, 2),(51, 19),(51, 13),(52, 19),(52, 1),(52, 18),(53, 11),(53, 19),(53, 16),(54, 5),
(54, 2),(54, 4),(55,11),(55, 21),(55, 20),(56, 12),(56, 20),(56, 16),(57, 12),(57, 9),(57, 14),(58, 2),
(58, 21),(58, 1),(59, 2),(59, 4),(60, 15),(60, 15),(60, 17),(61, 5),(61, 3),(62, 14),(62, 13),(62, 5),
(63, 12),(63, 5),(63, 1),(64, 12),(65, 17),(65, 16), (65, 18),(66, 15),(66, 12),(66, 5),(67, 6),(67, 8), 
(68, 2),(69, 4),(69, 17),(69, 21);  