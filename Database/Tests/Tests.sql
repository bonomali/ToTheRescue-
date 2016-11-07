--ToTheRescue!
--Tests

--====================================
-- This try catch block creates profiles with a specified UserID 
-- until the ninth profile is created and the trigger catches it
--====================================
use ToTheRescue;
begin try
	while 
		(select count(ProfileID)
		from Profiles
		where UserID = 12) < 9
	begin
		insert into Profiles
		(UserID, AvatarID, ProfileName, ToggleSound, ToggleMusic, Difficulty, PerformanceStat, SubjectFilter)
		values
		(12, 1, 'Test', 1, 1, 1, 1, 1)
	end
	print 'Failure, 9th profile was added to the Profiles Table';
end try
begin catch
	print 'Success, 9th profile was removed from the Profiles Table';
end catch


--====================================
-- This try catch block creates animals with a specified ProfileID
-- until the 21st animal is created and the trigger catches it
--====================================
use ToTheRescue;
begin try
	while 
		(select count(AnimalID)
		from ProfileAnimals
		where ProfileID = 25) < 21
	begin
		insert into ProfileAnimals
		(AnimalID, ProfileID)
		values
		(5, 25)
	end
	print 'Failure, 21st animal was added to the ProfileAnimals Table';
end try
begin catch
	print 'Success, 21st profile was removed from the ProfileAnimals Table';
end catch
