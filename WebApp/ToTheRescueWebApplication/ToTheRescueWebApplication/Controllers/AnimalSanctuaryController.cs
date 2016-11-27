using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    [Authorize]
    public class AnimalSanctuaryController : Controller
    {
        //GET: AnimalSanctuary/Sanctuary
        public ActionResult Sanctuary()
        {
            // pass the the model to the view
            AnimalSanctuaryModel sanctuary = new AnimalSanctuaryModel();

           // if (TempData["profileID"] != null)
            //{
                sanctuary.fillAnimals(6);
                //Needs to get profile data from application variable?
           // }
            return View(sanctuary);
        }
    }
}