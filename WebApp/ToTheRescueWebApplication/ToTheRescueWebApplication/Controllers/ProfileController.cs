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
        //gets and puts information from/to the database
        private ProfileDBRepository _profileRepo;

        /**********************************************************************
        * Purpose: Constructor, news up the profile repository
        ***********************************************************************/
        public ProfileController()
        {
            //pass in the http context, constructor injection
            _profileRepo = new ProfileDBRepository(System.Web.HttpContext.Current);
        }

        /**********************************************************************
        * Purpose: Displays the ChooseProfilePage passing in the list of profiles
        * for a specific user
        ***********************************************************************/
        public ActionResult ChooseProfilePage()
        {
            return View("ChooseProfilePage", _profileRepo.GetList());
        }

        /**********************************************************************
        * Purpose: Deletes a profile out of the database or makes it so an
        * error message is displayed saying incorrect email.
        ***********************************************************************/
        public void ClickedDelete(string email, int? profileIndex)
        {
            int index = -10;

            if (profileIndex.HasValue)
            {
                index = (int)profileIndex;
            }

            if (email == (string)Session["userEmail"])
            {
                string profileName = _profileRepo.GetList()[index].ProfileName;

                _profileRepo.DeleteProfile((int)Session["profileID"]);
            }
            else
            {
                TempData["emailError"] = "Incorrect email address eneterd. Please try again.";
            }
        }

        /**********************************************************************
        * Purpose: Saves the name of the selected profile to the session variable, 
        * note the parameter must be nullable. The parameter passed in is an index 
        * to the profile the user selected on the choose profiles page.
        ***********************************************************************/
        public void SelectedProfile(int? id)
        {
            int selectedIndex = (int)id;

            List<Profile> allProfs = _profileRepo.GetList();

            //find the profile the user clicked
            for (int i = 0; i < allProfs.Count(); i++)
            {
                //assign the used profileID to the session variables
                if (i == selectedIndex)
                {
                    Session["profileID"] = allProfs[i].ID;
                }
            }
        }

        /**********************************************************************
        * Purpose: Directs you to the choose profile page.
        ***********************************************************************/
        public ActionResult CreateProfilePage()
        {
            return View("CreateProfilePage", _profileRepo.GetAllProfileAvatars());
        }

        /**********************************************************************
        * Purpose: Creates a new profile and adds it to the database or makes
        * it so an error message is displayed in the CreateProfilePage.
        ***********************************************************************/
        public ActionResult CreateNewProfile(string profileName, int? avatarIndex)
        {
            int index = -10;
            if (avatarIndex.HasValue)
            {
                index = (int)avatarIndex;
            }
            else
            {
                //go back to the Create Profile Page and display an error message
                TempData["EmptyNameError"] = "You must enter a profile name in order to create a new profile. Please try again.";
                return Content("Failure");
            }

            if (String.IsNullOrWhiteSpace(profileName))
            {
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

            //get the correct index of the AvatarID
            index++;

            prof.AvatarID = index;
            prof.ProfileName = profileName;

            //add teh profile to the database
            _profileRepo.Save(prof);

            //on success, redirect to the Choose Profiles Page where the new profile will be located
            return Content("Success");
        }
    }
}