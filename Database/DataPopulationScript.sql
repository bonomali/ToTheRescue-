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


INSERT INTO Profiles (ProfileName, UserID, ImageID)
VALUES
('Sophia', 1, 2),('Emma', 1, 4),('Lily', 1, 2),('Madison', 2, 6),('Avery', 3, 1),('Hailey', 3, 2),
('Layla', 3, 6),('Lucas', 3, 3),('Caleb', 4, 5),('Alexander', 6, 1),('Matthew', 6, 3),('Madelyn', 6, 6),
('Eli', 7, 1),('Isabelle', 7, 2),('Cameron', 7, 5),('Gavin', 7, 3),('Leah', 7, 6),('Maya', 7, 2),
('Kylie', 8, 2),('Joseph', 8, 5),('Wyatt', 9, 1),('Hunter', 10, 3),('Natalie', 10, 4),('Chase', 11, 3),
('Alexis', 11, 2),('Adam', 11, 5),('Alex', 12, 1),('Bella', 12, 4),('Bailey', 12, 4),('Johnathon', 12, 5),
('Miles', 13, 1),('Jasmine', 14, 4),('Nolan', 14, 3),('Morgan', 15, 4);


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


INSERT INTO Options (ProfileID, ToggleSound, ToggleMusic, Difficulty, SubjectFilter)
VALUES
(2, 1, 1, 3, 0),(3, 1, 0, 3, 0),(4, 1, 1, 3, 1),(5, 0, 0, 3, 1),(6, 1, 1, 3, 2),(7, 1, 1, 3, 2),
(8, 1, 1, 3, 2),(9, 1, 1, 1, 0),(10, 1, 1, 1, 2),(11, 1, 0, 3, 0),(12, 1, 1, 3, 2),(13, 0, 0, 1, 0),
(14, 0, 1, 1, 0),(15, 1, 1, 3, 0),(16, 1, 1, 3, 0),(17, 1, 0, 3, 0),(18, 1, 1, 3, 1),(19, 0, 0, 3, 1),
(20, 1, 1, 3, 2),(21, 1, 1, 3, 2),(22, 1, 1, 3, 2),(23, 1, 1, 1, 0),(24, 1, 1, 1, 2),(25, 1, 0, 3, 0),
(26, 1, 1, 3, 2),(27, 0, 0, 1, 0),(28, 0, 1, 1, 0),(29, 1, 1, 3, 0),(30, 1, 1, 3, 2),(31, 0, 0, 1, 0),
(32, 0, 1, 1, 0),(33, 1, 1, 3, 0),(34, 1, 1, 3, 0);


INSERT INTO GameCategories (GameCategoryName)
VALUES
('letter recognition'),       --1
('number recognition'),		  --2
('shape recognition'),		  --3
('sorting'),				  --4
('sight word recognition'),	  --5
('counting'),				  --6
('addition');				  --7


INSERT INTO Minigames (GameCategoryID, GameCode, GameName)
VALUES
(1, 'game code here', 'Bubble Pop'),
(1, 'game code here', 'Under the Sea'),
(1, 'game code here', 'Chicka Bang'),
(1, 'game code here', 'Catch a Tiger'),
(2, 'game code here', 'Number Limbo'),
(2, 'game code here', 'Batter Up'),
(2, 'game code here', 'Cooking Time'),
(2, 'game code here', 'Number Round-Up'),
(3, 'game code here', 'Get in Shape'),
(3, 'game code here', 'Shape Hunt'),
(3, 'game code here', 'Shape Up'),
(4, 'game code here', 'Group Work'),
(4, 'game code here', 'Samesies'),
(5, 'game code here', 'Sight Words'),
(5, 'game code here', 'What''s in sight'),
(5, 'game code here', 'Spot the Word'),
(5, 'game code here', 'Ring Around the Sight Word'),
(6, 'game code here', 'You Can Count On Me'),
(6, 'game code here', 'Count All'),
(6, 'game code here', 'Juggle Ball'),
(7, 'game code here', 'It All Adds Up');


INSERT INTO GeneralGameData (GameCategoryID, Difficulty, GameData)
VALUES
(1, 1, 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'),
(1, 2, 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'),
(2, 1, '0,1,2,3,4,5,6,7,8,9,10'),
(2, 2, '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20'),
(5, 3, 'a,I,in,my,me,no,he,for,go,can,to,up'),
(5, 4, 'have,play,are,and,look,like,said,has,she'),
(6, 2, '0,1,2,3,4,5,6,7,8,9,10'),
(6, 3, '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20'),
(7, 3, '0,1,2,3,4,5,6,7,8,9,10'),
(7, 4, '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20');


INSERT INTO Animals (ImageID, SoundID, Color, FunFact)
VALUES
(7, 6, 'green', 'Frogs breathe through their skin'),
(8, 2, 'gray', 'A newborn elephant can weigh up to 200 pounds'),
(9, 5, 'brown', 'Dogs can hear noises that humans can''t hear'),
(9, 5, 'white', 'Scientists believe that dogs have dreams like people'),
(10, 2, 'red', 'Crabs have 10 legs'),
(10, 2, 'pink', 'The Japanese Spider Crab''s legs are up to 12 feet long'),
(11, 8, 'blue', 'The Balloon Dog''s favorite food it air'),
(12, 3, 'rainbow', 'Fish have gills to breathe under water'),
(12, 3, 'gray', 'Sharks are fish'),
(13, 2, 'black,yellow', 'Cheetahs can run as fast as 75 miles per hour for short periods of time'),
(14, 10, 'brown', 'monkeys show affection by grooming each other'),
(15, 4, 'black,white', 'The milk we drink comes from dairy cows'),
(16, 7, 'black,white', 'A zebra''s stripes help protect them from danger'),
(17, 9, 'gray', 'The name rhinoceros means ''nose horn'''),
(18, 11, 'blue', 'The name hippopotamus means ''river horse'''),
(19, 7, 'yellow', 'Male deer are called bucks and grow new antlers every year'),
(20, 9, 'white', 'A polar bear has black skin and looks whites because it''s fur is see through'),
(20, 9, 'purple', 'The polar bear is the largest meat eating animal that lives on land'),
(21, 3, 'black', 'A mouse has a pointed nose, round ears, and their tails have little hair'),
(22, 3, 'black,white', 'Badgers are nocturnal, they sleep during the day and are awake at night'),
(23, 7, 'gold', 'horses can sleep lying down and standing up'),
(23, 7, 'white', 'Newborn horses, called foals, can run shortly after being born'),
(24, 6, 'black', 'Seals spend most of their lives in the water'),
(25, 11, 'black,white', 'A Rock Hopper penguin can jump up to 5 feet high'),
(26, 3, 'pink', 'Giant squids are the fastest squids in the sea');


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



