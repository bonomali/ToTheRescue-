using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    [Authorize]
    public class ProfilesController : Controller
    {
        //static private byte[] m_profileAvatarSelected;
       
        //will hold a user's selected avtar when creating a profile
        static private Byte[] m_profileAvatarSelected;

        //will hold a user's selected profile's profileID
        static private int m_profileIDSelected;

        //instance of the ProfilesModel object
        static private ProfilesModel m_profiles;

        //determines if a user chose an avatar on the choose profiles page
        static private bool m_choseAvatar;

        //The index of the avtar a user chose
        static private int m_chosenAvatarIndex;

        //will hold a user's chosen profile name
        static private string m_profileNameSelected;

        public ProfilesController()
        {
            m_profiles = new ProfilesModel();
        }

        //Takes you to the Choose profile page on the website
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

            //get all the information needed for the choose profiles page
            m_profiles.RetrieveChooseProfilePageInformation(ImportantVariables.UserID);

            return View(m_profiles);
        }

        //Gets the input from the ChooseProfilePage and
        [HttpPost]
        public ActionResult GetUserInputToDeleteProfile(ProfilesModel mod)
        {
            bool validEmail = false;

            //check the user inputted email and the chosen email
            if (mod.UserEmail == ImportantVariables.UserEmail)
                validEmail = true;

            if (validEmail == true)
            {
                try
                {
                    m_profiles.DeleteProfile(mod.ProfileNameToDelete, ImportantVariables.UserID);
                }
                catch (Exception e)
                {
                    //go back to choose profile page and show an alert for an incorrect profile name inputted
                    TempData["DProfileError"] = "Incorrect profile name eneterd. Press try again.";
                    return RedirectToAction("ChooseProfilePage", "Profiles");
                }
            }
            else
            {
                //go back to choose profile page and show an alert for an incorrect email inputted
                TempData["DEmailError"] = "Incorrect email address  eneterd. Press back to try again.";
                return RedirectToAction("ChooseProfilePage", "Profiles");
            }

            //return to the last page and hope it updates every time 
            return Redirect(Request.UrlReferrer.ToString());
        }

        //Saves the name of the selected profile to the m_profileNameSelected variable, note the parameter must be a nullable
        //The parameter passed in is an index to the profile the user selected for the choose profiles page
        public void SelectedProfile(int? id)
        {
            int selectedIndex = (int)id;

            m_profiles.RetrieveChooseProfilePageInformation(ImportantVariables.UserID);
            for (int i = 0; i < m_profiles.GetProfileNamesForASpecificUser().Count(); i++)
            {
                //The selected index
                if (i == selectedIndex)
                {
                    m_profileNameSelected = m_profiles.GetProfileNamesForASpecificUser()[i];
                    m_profileAvatarSelected = m_profiles.GetAllProfileAvatarsForASpecificUser()[i];
                    m_profileIDSelected = m_profiles.GetAllProfileIDsForASpecificUser()[i];
                }
            }
        }

        //goes to the main menu after the profile is selected from the choose profiles page
        public ActionResult GoToMainMenu()
        {
            //User selected to play with a certain profile so I set those important variables
            ImportantVariables.ProfileName = m_profileNameSelected;
            ImportantVariables.ProfileAvatar = m_profileAvatarSelected;
            ImportantVariables.ProfileID = m_profileIDSelected;

            return RedirectToAction("MainMenu", "MainMenu");
        }

        //directs you to the choose profile page
        public ActionResult CreateProfilePage()
        {
            //call a function to get all of the possible avatars
            m_profiles.RetrieveAllProfileAvatars();

            return View(m_profiles);
        }

        //gets the user input from the Create Profile Page and redirects to choose profiles page on success
        //and redirects to Create Profile Page on failure and displays an alert
        [HttpPost]
        public ActionResult CreateNewProfile(ProfilesModel m)
        {
            //if the user didn't enter anything
            if (m.NewProfileName == null)
            {
                //go back to the Create Profile Page and display an alert
                TempData["CEmptyNameError"] = "You must enter a profile name in order to create a new profile. Please try again.";
                return RedirectToAction("CreateProfilePage", "Profiles");
            }

            //if the user entered potentially only spaces
            if (m.NewProfileName[0] == ' ')
            {
                //go back to the Create Profile Page and display an alert
                TempData["CSpaceNameError"] = "You can't begin a profile name with the space character. Please try again.";
                return RedirectToAction("CreateProfilePage", "Profiles");
            }

            //increment the index to reference the correct avatar id
            int selectedAvatarID = m_chosenAvatarIndex + 1;

            m.RetrieveAllProfileAvatars();

            if (m_choseAvatar == true)
            {
                //if they some how selected an avatar out of index
                if (selectedAvatarID < 1 || selectedAvatarID > m.GetAllProfileAvatars().Count())
                {
                    //go back to the Create Profile Page and display an alert
                    TempData["cInvalidAvatarIndex"] = "You must select an avatar by clicking on an avatar picture. Please try again.";
                    return RedirectToAction("CreateProfilePage", "Profiles");
                }
                else
                {
                    //Add the profile to the database
                    m.AddNewProfile(ImportantVariables.UserID, selectedAvatarID, m.NewProfileName);
                }
            }
            else
            {
                //go back to the Create Profile Page and display an alert
                TempData["cInvalidAvatarIndex"] = "You must select an avatar by clicking on an avatar picture. Please try again.";
                return RedirectToAction("CreateProfilePage", "Profiles");
            }
          
            //on success, redirect to the Choose Profiles Page where the new profile will be located
            return RedirectToAction("ChooseProfilePage", "Profiles");
        }

        //After the user selcts an avtar on the Choose profiles page, this function is called.
        public void SelectedAvatar(int? id)
        {
            //assign the seleceted avatar index  to m_chosenAvatarIndex 
            int avatarIndex = (int)id;
            m_chosenAvatarIndex = avatarIndex;

            //specify that the user did choose an avatar
            m_choseAvatar = true;
        }

        //After the user deselcts an avtar on the Choose profiles page, this function is called.
        public void UnSelectedAvatar()
        {
            //assign it to something out of bounds on the array
            m_chosenAvatarIndex = -1;

            //thhe user did not choose an avatar
            m_choseAvatar = false;
        }
    }
}