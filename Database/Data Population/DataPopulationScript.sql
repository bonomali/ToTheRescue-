USE ToTheRescue

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
('Sophia', 1, 1, 1, 1, 3, 34.1, 0),('Emma', 1, 1, 1, 0, 3, 36, 0),('Lily', 1, 2, 1, 1, 3, 41.2, 1),('Madison', 2, 6, 0, 0, 3, 34.3, 1),('Avery', 3, 3, 1, 1, 3, 43.9, 2),
('Hailey', 3, 6, 1, 1, 3, 47.3, 2),('Layla', 3, 6, 1, 1, 3, 45.7, 2),('Lucas', 3, 3, 1, 1, 1, 24.2, 0),('Caleb', 4, 5, 1, 1, 1, 11.6, 2),('Alexander', 6, 3, 1, 0, 3, 54, 0),
('Matthew', 6, 3, 1, 1, 3, 38.2, 2),('Madelyn', 6, 6, 0, 0, 1, 8.2, 0),('Eli', 7, 1, 0, 1, 1, 7.9, 0),('Isabelle', 7, 4, 1, 1, 3, 66.1, 0),('Cameron', 7, 5, 1, 1, 3, 65, 0),
('George', 7, 1, 1, 1, 3, 34.1, 0),('Honnan', 7, 1, 1, 1, 3, 34.1, 0),('Rob', 3, 7, 1, 1, 3, 1, 2),('Gavin', 7, 3, 1, 0, 3, 47.1, 0),('Leah', 7, 6, 1, 1, 3, 50, 1),('Maya', 7, 2, 0, 0, 3, 48.4, 1),
('Kylie', 8, 4, 1, 1, 3, 69.2, 2),('Joseph', 8, 5, 1, 1, 3, 60.3, 2),('Wyatt', 9, 1, 1, 1, 3, 43.7, 2),('Hunter', 10, 3, 1, 1, 1, 17.8, 0),('Natalie', 10, 4, 1, 1, 1, 19.5, 2),
('Chase', 11, 3, 1, 0, 3, 64.8, 0),('Alexis', 11, 4, 1, 1, 3, 57.8, 2),('Adam', 11, 5, 0, 0, 1, 23.4, 0),('Alex', 12, 1, 0, 1, 1, 18, 0),('Bella', 12, 4, 1, 1, 3, 42.8, 0),
('Bailey', 12, 4, 1, 1, 3, 77.7, 2),('Johnathon', 12, 5, 0, 0, 1, 13.6, 0),('Miles', 13, 1, 0, 1, 1, 16.3, 0),('Jasmine', 14, 4, 1, 1, 3, 79.2, 0),('Nolan', 14, 3, 1, 1, 3, 72.1, 0),
('Morgan', 15, 4, 1, 0, 2, 32.9, 0);


INSERT INTO Maps (MapName, ImageID, SoundID)
VALUES 
('farm', 27, 11),('castle', 28, 12),('winter wonderland', 2, 13),('river', 30, 14),
('beach', 31, 15),('desert', 32, 12),('pyramid', 33, 13);


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


INSERT INTO MiniGames (MiniGameCategoryID, MiniGameCode, MiniGameName, MinDifficulty, MaxDifficulty, SoundID)
VALUES
(1, 'game code here', 'Bubble Pop', 1, 2, 11),
(1, 'game code here', 'Under the Sea', 1, 3, 12),
(1, 'game code here', 'Chicka Bang', 2, 4, 13),
(1, 'game code here', 'Catch a Tiger', 3, 4, 14),
(2, 'game code here', 'Number Limbo', 1, 4, 15),
(2, 'game code here', 'Batter Up', 4, 4, 11),
(2, 'game code here', 'Cooking Time', 2, 4, 12),
(2, 'game code here', 'Number Round-Up', 1, 3, 13),
(3, 'game code here', 'Get in Shape', 1, 3, 14),
(3, 'game code here', 'Shape Hunt', 1, 2, 15),
(3, 'game code here', 'Shape Up', 2, 4, 11),
(4, 'game code here', 'Group Work', 2, 4, 12),
(4, 'game code here', 'Samesies', 1, 3, 13),
(5, 'game code here', 'Sight Words', 4, 4, 14),
(5, 'game code here', 'What''s in sight', 4, 4, 15),
(5, 'game code here', 'Spot the Word', 3, 4, 11),
(5, 'game code here', 'Ring Around the Sight Word', 4, 4, 12),
(6, 'game code here', 'You Can Count On Me', 1, 2, 13),
(6, 'game code here', 'Count All', 2, 3, 14),
(6, 'game code here', 'Juggle Ball', 3, 4, 15),
(7, 'game code here', 'It All Adds Up', 3, 4, 11);


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
(2, 23),(2, 11),(2, 1),(2, 7),(2, 5),(3, 9),(3, 7),(3, 9),(4, 11),(4, 4),(6, 17),(6, 17),
(6, 9),(6, 25),(6, 4),(6, 3),(6, 8),(6, 1),(6, 16),(6, 11),(6, 10),(6, 12),(6, 23),(6, 9),
(6, 3),(6, 15),(6, 6),(6, 6),(6, 13),(6, 9),(7, 10),(8, 17),(8, 1),(9, 10),(9, 24),(10, 24),
(10, 11),(12, 23),(12, 12),(12, 19),(12, 14),(12, 8),(13, 8),(13, 9),(13, 2),(13, 3),(14, 7),
(14, 15),(14, 8),(15, 22),(15, 17),(16, 8),(17, 22),(17, 17),(17, 8),(17, 17),(19, 18),(19, 15),
(20, 9),(21, 16),(21, 3),(21, 3),(22, 16),(22, 16),(22, 11),(23, 12),(24, 13),(24, 15),(24, 6),(24, 8),
(25, 23),(25, 11),(25, 11),(25, 13),(25, 25),(26, 19),(26, 9),(26, 9),(27, 11),(27, 15),(28, 17),(28, 17),
(28, 19),(28, 25),(28, 23),(28, 19),(28, 18),(28, 11),(29, 16),(29, 11),(29, 10),(29, 12),(29, 23),(29, 9),
(29, 16),(29, 15),(29, 6),(29, 18),(29, 13),(29, 9),(31, 10),(31, 17),(31, 25),(32, 10),(32, 24),(33, 24),
(34, 1),(34, 23),(34, 2),(34, 9),(35, 14),(35, 21);


INSERT INTO ProfileProgress(ProfileID, CurrentMap, CurrentNode, AnimalID)
VALUES
(2, 1, 3, 5),(3, 3, 6, 4),(4, 2, 1, 7),(5, 3, 4, 23),(6, 7, 12, 20),(7, 6, 8, 16),(8, 1, 4, 7),(9, 7, 2, 2), 
(10, 4, 5, 14),(11, 2, 3, 9),(12, 4, 6, 25),(13, 1, 2, 3),(14, 5, 8, 9),(15, 7, 5, 11),(16, 2, 1, 7),(17, 4, 4, 17),
(18, 2, 1, 21),(19, 7, 6, 16),(20, 4, 3, 4),(21, 6, 8, 11),(22, 1, 1, 4),(23, 6, 4, 13),(24, 6, 5, 14),(25, 4, 8, 7),
(26, 1, 3, 10),(27, 6, 1, 23),(28, 2, 5, 5),(29, 6, 7, 18),(30, 3, 7, 25),(31, 4, 1, 24),(32, 1, 5, 16),(33, 7, 4, 19),
(34, 2, 2, 15),(35, 1, 3, 12);


INSERT INTO ProfileProgressHistory(ProfileID, MiniGameID)
VALUES
(2, 21),(2, 13),(2, 2),(3, 20),(3, 8),(3, 12),(4, 14),(4, 16),(4, 2),(5, 7),(5, 13),(5, 20),
(6, 21),(6, 18),(7, 17),(7, 2),(7, 14),(8, 10),(8, 14),(8, 7),(9, 12),(10, 21),(10, 18),(10, 4),
(11, 18),(11, 1),(11, 11),(12, 6),(12, 11),(13, 14),(13, 5),(13, 4),(14, 6),(14, 4),(14, 14),
(15, 15),(15, 19),(15, 20),(16, 17),(16, 20),(16, 2),(17, 16),(17, 7),(17, 3),(18, 21),(18, 14),
(19, 5),(19, 13),(19, 11),(20, 5),(20,3),(20, 19),(21, 19),(21, 4),(21, 10),(22, 9),(22, 9),(22, 2),
(23, 21),(23, 3),(23, 2),(24, 19),(24, 13),(24, 21),(25, 1),(25, 20),(25, 11),(26, 19),(26, 16),
(27, 1),(27, 13),(27, 12),(28, 15),(28, 18),(28, 12),(29, 14),(30, 16),(30, 2),(30, 7),(31, 13),(31, 20),
(31, 13),(32, 18),(32, 17),(33, 2),(33, 14),(33, 4),(34, 14),(34, 17),(34, 12),(35, 2),(35, 18);  