using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Repositories;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Controllers
{
    public class MainMenuController : Controller
    {
        // GET: MainMenu
        public ActionResult MainMenu()
        {
            return View();
        }
    }
}