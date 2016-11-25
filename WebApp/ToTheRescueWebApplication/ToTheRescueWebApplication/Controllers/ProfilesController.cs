using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    [Authorize]
    public class ProfilesController : Controller
    {
        static private int m_userID;

        static private string m_userEmail;

        static private ProfilesModel m_profiles;

        public ProfilesController()
        {
            m_profiles = new ProfilesModel();
        }

        // GET: ChooseProfilePage
        public ActionResult ChooseProfilePage()
        {
            //Give the view the Model object to utilize
            if (TempData["userID"] != null)
            {
                m_userID = (int)TempData["userID"];
                //will be able to have the current UserID passed into here
            }

            if (TempData["userEmail"] != null)
            {
                m_userEmail = (string)TempData["userEmail"];
            }

            m_profiles.RetrieveChooseProfilePageInformation(m_userID);
            //m_profiles.RetrieveChooseProfilePageInformation(3);

            return View(m_profiles);
        }

        //Gets the input from the ChooseProfilePage
        [HttpPost]
        public ActionResult ChooseProfilePage(ProfilesModel mod)
        {
            bool validEmail = false;

            if (mod.UserEmail == m_userEmail)
                validEmail = true;

            if (validEmail == true)
            {
                try
                {
                    m_profiles.DeleteProfile(mod.ProfileNameToDelete, m_userID);
                }
                catch (Exception e)
                {
                    return Content("Incorrect profilename eneterd. Press back to try again.");
                }
            }
            else
            {
                return Content("Incorrect email address  eneterd. Press back to try again.");
            }

            //return to the last page and hope it updates every time 
            return Redirect(Request.UrlReferrer.ToString());
        }

        public ActionResult CreateProfilePage()
        {
            m_profiles.RetrieveAllProfileAvatars();
            int num = m_profiles.GetAllProfileAvatars().Count();

            //call a function to get all of the possible avatars
            return View(m_profiles);
        }

        //gets the user input from the Create Profile Page
        [HttpPost]
        public ActionResult CreateProfilePage (ProfilesModel m)
        {
            m.RetrieveAllProfileAvatars();

            //if the user didn't enter anything
            if (m.NewProfileName == null)
            {
                return Content("You must enter a profile name in order to create a new profile.");
            }

            //if the user entered potentially only spaces
            if (m.NewProfileName[0] == ' ')
            {
                return Content("You can't begin a profile name with the space character.");
            }

            int selectedIndex = -1;

            //convert the entered string to an integer for the avatar that the user selected
            if (Int32.TryParse(m.SelectedAvatarIndex, out selectedIndex))
            {
                //if they entered a number not displayed to the screen
                if (selectedIndex < 0 || selectedIndex > m.GetAllProfileAvatars().Count()-1)
                {
                    return Content("To select an avatar, you must enter a number 0 and " + (m.GetAllProfileAvatars().Count() - 1) + ".");
                }
                else
                {
                    //call a stored proc in the database that adds this profile to the database
                }
            }
            else
            {
                //they didn't enter a number
                return Content("To select an avatar, you must enter a number 0 and " + (m.GetAllProfileAvatars().Count() - 1) + ".");
            }

            //on success, redirect to the Choose Profiles Page where the new profile will be located
            return RedirectToAction("ChooseProfilePage", "Profiles");
        }
    }
}