using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Models;
using ToTheRescueWebApplication.Code;

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
            //Pass the current profile into the Sanctuary
            sanctuary.fillAnimals(ImportantVariables.ProfileID);

            return View(sanctuary);
        }
    }
}