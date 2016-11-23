using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    public class ProfilesController : Controller
    {
        private int userID;

        // GET: ChooseProfilePage
        public ActionResult ChooseProfilePage()
        {
            //Give the view the Model object to utilize
            ProfilesModel profiles = new ProfilesModel();
            if (TempData["userID"] != null)
            {
                userID = (int)TempData["userID"];
                //will be able to have the current UserID passed into here
            }
            profiles.RetrieveChooseProfilePageInformation(userID);
            
            return View(profiles);
        }
    }
}