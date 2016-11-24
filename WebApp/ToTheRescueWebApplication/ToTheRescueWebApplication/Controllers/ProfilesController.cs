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
        private int m_userID;

        private string m_userEmail;

        private ProfilesModel m_profiles;

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

            if(TempData["userEmail"] != null)
            {
                m_userEmail = (string)TempData["userEmail"];
            }

            //get the user's email
            m_profiles.UserEmail = m_userEmail;

            //get the user's id
            m_profiles.UserID = m_userID;

            //m_profiles.RetrieveChooseProfilePageInformation(m_userID);
            m_profiles.RetrieveChooseProfilePageInformation(7);

            return View(m_profiles);
        }

        //For some reason all of the datamembers when this function is called
        //are set to null and zero and I don't know why. Then they stay like that after
        //I try to repopulate them. Makes no sense
       [HttpPost]
       public ActionResult ChooseProfilePage(string profName, string email)
        {
            bool validProfName = false;
            bool validEmail = false;

            for (int i = 0; i < m_profiles.GetProfileNamesForASpecificUser().Count(); i++)
            {
                if (profName == m_profiles.GetProfileNamesForASpecificUser()[i])
                    validProfName = true;
            }

            if (email == m_userEmail)
                validEmail = true;

            if (validEmail == true && validProfName == true)
            {
                m_profiles.DeleteProfile(profName);
                
                //return to the last page and hope it updates every time 
                return Redirect(Request.UrlReferrer.ToString());
            }

            //Display the error message for now, learn how to handle it properly later
            return Content("Incorrect profilename and/or email address eneterd. Press back to try again.");
        }
    }
}