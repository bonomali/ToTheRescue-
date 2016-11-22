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
        // GET: ChooseProfilePage
        public ActionResult ChooseProfilePage()
        {
            //Give the view the Model object to utilize
            ProfilesModel profiles = new ProfilesModel();

            //will be able to have the current UserID passed into here
            profiles.RetrieveChooseProfilePageInformation(7);

            return View(profiles);
        }
    }
}