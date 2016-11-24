using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    public class AnimalSanctuaryController : Controller
    {
        //GET: AnimalSanctuary/Sanctuary
        public ActionResult Sanctuary()
        {
            // pass the the model to the view
            AnimalSanctuaryModel sanctuary = new AnimalSanctuaryModel();
            
            //fills the sanctuary object with the profileID 3
            sanctuary.fillAnimals(4);
            
            return View(sanctuary);
        }
    }
}