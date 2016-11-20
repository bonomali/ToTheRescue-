using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    public class ChooseProfilePageController : Controller
    {
        // GET: ChooseProfilePage
        public ActionResult Index() //was Index before
        {
            //Give the view the Model object to utilize
            ProfilesModel profiles = new ProfilesModel();

            return View(profiles);
        }
    }
}