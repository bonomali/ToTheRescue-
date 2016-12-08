using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Models;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Repositories;

namespace ToTheRescueWebApplication.Controllers
{
    [Authorize]
    public class AnimalSanctuaryController : Controller
    {
        ImageDBRepository _image;
        AnimalDBRepository _animal;
        IDataEntityRepository<Sounds> _sounds;
        ProfileDBRepository _profile;
        OptionsDBRepository _options;
        
        public AnimalSanctuaryController()
        {
            _image = new ImageDBRepository();
            _animal = new AnimalDBRepository();
            _sounds = new SoundDBRepository();
            _profile = new ProfileDBRepository();
            _options = new OptionsDBRepository();//used to get profile name
        }
        public ActionResult Sanctuary()
        {
            List<Animal> listOfAnimals = _animal.GetList(ImportantVariables.ProfileID);//subject to change
            return View(listOfAnimals);
        }
        public ActionResult ShowAnimalImage (int animalID)
        {
            Animal animal = _animal.Get(animalID);
            Images image = _image.Get(animal.ImageID);

            return File(image.Image, image.ImageName);
        }
        public ActionResult PlayAnimalSound(int animalID)
        {
            Animal animal = _animal.Get(animalID);
            Sounds sounds = _sounds.Get(animal.SoundID);

            return File(sounds.Sound, sounds.SoundName);
        }
        public ActionResult getProfileName()
        {
            OptionsModel m_options;
            m_options = new OptionsModel(_options.Get(ImportantVariables.ProfileID));

            return View("getProfileName", m_options.profileName);
            //return File(profile.ProfileName, profile.ProfileName);//hmm
        }
    }
}