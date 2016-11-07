--ToTheRescue!
--Triggers

--====================================
-- This Trigger is fired when a user tries 
-- to add more than eight profiles to their account
-- Works
--====================================
use ToTheRescue
go

drop trigger EightProfileTrigger
go

create trigger EightProfileTrigger
	on Profiles
	after insert
AS 
	if exists (select Inserted.ProfileID 
				from inserted 
				join Users
				on inserted.UserID = Users.UserID
				join Profiles
				on Users.UserID = Profiles.UserID
				where inserted.UserID = Users.UserID
				group by Inserted.ProfileID
				having count(Profiles.UserID) > 8
				)
	begin
		;throw 50001, 'Too many profiles', 1;
		rollback tran
	end;
go

--====================================
-- This Trigger fires when a > 20 animals are being 
-- added to the sanctuary
-- Works
--====================================
use ToTheRescue
go
drop trigger TwentyOneAnimalTrigger
go

create trigger TwentyOneAnimalTrigger
	on ProfileAnimals
	after insert
AS 
	if exists (select inserted.ProfileID 
				from inserted 
				join ProfileAnimals as PA
				on inserted.ProfileID = PA.ProfileID
				where inserted.ProfileID = PA.ProfileID
				group by inserted.ProfileID
				having count(PA.AnimalID) > 20
				)
	begin
		;throw 50001, 'Too many animals', 1;
		rollback tran
	end;
go

--====================================
-- This Trigger fires when a third MiniGameID is 
-- added to a certain ProfileID
--Works
--====================================
use ToTheRescue
go

drop trigger Three_MiniGame_Trigger
go

create trigger Three_MiniGame_Trigger
	 on ProfileProgressHistory
	 after insert
AS 
	if exists (select inserted.ProfileID
				from inserted 
				join ProfileProgressHistory as PPH
				on inserted.ProfileID = PPH.ProfileID
				where inserted.ProfileID = PPH.ProfileID
				group by inserted.ProfileID
				having count(PPH.MiniGameID) > 3
				)
	begin
		;
		delete from ProfileProgressHistory
		where ProfileID = 
			(select ProfileID
			where ProfileID = (select ProfileID from inserted)
			and 
			ProgressID =
				(select min(ProgressID)
					from ProfileProgressHistory
					where ProfileID = (select ProfileID from inserted)))
	end;
go