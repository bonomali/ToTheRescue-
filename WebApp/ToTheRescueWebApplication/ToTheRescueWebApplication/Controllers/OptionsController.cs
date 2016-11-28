using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    public class OptionsController : Controller
    {
        static private OptionsModel m_options;

        public OptionsController()
        {
            m_options = new OptionsModel();
        }
        public ActionResult Options()
        {
            return View(m_options);
        }

        public ActionResult GoToProfiles()
        {
            //User selected to play with a certain profile so I set those important variables

            return RedirectToAction("Profiles", "Profiles");
        }
    }
}