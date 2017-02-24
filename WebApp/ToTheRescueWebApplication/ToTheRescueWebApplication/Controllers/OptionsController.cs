using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Models;
using ToTheRescueWebApplication.Repositories;

namespace ToTheRescueWebApplication.Controllers
{
    [Authorize]
    public class OptionsController : Controller
    {
        static private OptionsModel m_options;
        static private OptionsDBRepository m_optionsRepository;

        public OptionsController()
        {
            m_optionsRepository = new OptionsDBRepository();
        }

        public ActionResult InnerOptions()
        {
            m_options = new OptionsModel(m_optionsRepository.Get((int)Session["profileID"]));
            return View(m_options);
        }

        public ActionResult Options()
        {
            m_options = new OptionsModel(m_optionsRepository.Get((int)Session["profileID"]));
            return View(m_options);
        }

        public ActionResult GoToProfiles()
        {
            //User selected to play with a certain profile so I set those important variables

            return RedirectToAction("Profiles", "Profiles");
        }

        [HttpPost]
        public ActionResult InnerOptions(OptionsModel model)
        {

            if (ModelState.IsValid)
            {
                Options o = new Code.Options(model);
                o.profileID = (int)Session["profileID"];
                m_optionsRepository.Save(o);
                Session["toggleSound"] = o.toggleSound; //set Session variables for toggle music and sound
                Session["toggleMusic"] = o.toggleMusic;
            }
            else
            {
                return View(model);
            }
            m_options = new OptionsModel(m_optionsRepository.Get((int)Session["profileID"])); 
            return RedirectToAction("InnerOptions");
        }

        public ActionResult EnteredEmail(string email)
        {
            if (email == (string)Session["userEmail"])
            {
                return RedirectToAction("InnerOptions");
            }
            else
            {
                return RedirectToAction("Options");
            }
        }
    }
}