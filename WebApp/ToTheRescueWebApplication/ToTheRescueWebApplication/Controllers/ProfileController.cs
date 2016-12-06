using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Models.Profiles;
using ToTheRescueWebApplication.Repositories;

namespace ToTheRescueWebApplication.Controllers
{
    public class ProfileController : Controller
    {

        private ProfileDBRepository _profileRepo;

        public ProfileController()
        {
            _profileRepo = new ProfileDBRepository();
        }

        // GET: Profile
        public ActionResult ChooseProfilePage()
        {
            //Get the UserID and the UserEmail
            if (TempData["userID"] != null)
            {
                ImportantVariables.UserID = (int)TempData["userID"];
            }

            if (TempData["userEmail"] != null)
            {
                ImportantVariables.UserEmail = (string)TempData["userEmail"];
            }

            return View(_profileRepo.GetList());
        }

        public void ClickedDelete(string email, int? profileIndex)
        {
            int index = -10;
            bool validEmail = false;

            if (profileIndex.HasValue)
            {
                index = (int)profileIndex;
            }

            if (email == ImportantVariables.UserEmail)
                validEmail = true;


            if (validEmail == true)
            {
                string profileName = _profileRepo.GetList()[index].ProfileName;

                _profileRepo.DeleteProfile(profileName, ImportantVariables.UserID);
            }
            else
            {
                TempData["emailError"] = "Incorrect email address eneterd. Please try again.";
            }
        }

        //Saves the name of the selected profile to the m_profileNameSelected variable, note the parameter must be a nullable
        //The parameter passed in is an index to the profile the user selected on the choose profiles page
        public void ClickedPlay(int? id)
        {
            int selectedIndex = (int)id;

            List<Profile> allProfs = _profileRepo.GetList();

            //find the profile the user clicked
            for (int i = 0; i < allProfs.Count(); i++)
            {
                //assign the important variables to the thing that holds the information 
                //for the lifetime of the application
                if (i == selectedIndex)
                {
                    //refactor to only include the profileID to add to the Important variables thing once
                    //we figure out what to do
                    ImportantVariables.ProfileName = allProfs[i].ProfileName;
                    ImportantVariables.ProfileAvatar = allProfs[i].Avatar;
                    ImportantVariables.ProfileID = allProfs[i].ID;
                }
            }
        }

        //directs you to the choose profile page
        public ActionResult CreateProfilePage()
        {
            
            return View(_profileRepo.GetAllProfileAvatars());
        }

        //routes don't work seperately
        public ActionResult CreateNewProfile(string profileName, int? avatarIndex)
        {
            int index = -10;
            if (avatarIndex.HasValue)
            {
                index = (int)avatarIndex;
            }
            else
            {
                TempData["EmptyNameError"] = "You must enter a profile name in order to create a new profile. Please try again.";
                return Content("Failure");
            }

            if (String.IsNullOrWhiteSpace(profileName))
            {
                //go back to the Create Profile Page and display an alert
                TempData["EmptyNameError"] = "You must enter a profile name in order to create a new profile. Please try again.";
                return Content("Failure");
            }

           if (profileName == "~!null~$")
            {
                TempData["EmptyNameError"] = "You must enter a profile name in order to create a new profile. Please try again.";
                return Content("Failure");
            }

           if (profileName.Length > 15)
            {
                TempData["TooLongName"] = "You must enter a profile name that is 15 characters long or less. Please try again.";
                return Content("Failure");
            }

            Profile prof = new Profile();
            index++;

            prof.AvatarID = index;
            prof.ProfileName = profileName;

            _profileRepo.Save(prof);

            //on success, redirect to the Choose Profiles Page where the new profile will be located
            return Content("Success");
        }

    }
}