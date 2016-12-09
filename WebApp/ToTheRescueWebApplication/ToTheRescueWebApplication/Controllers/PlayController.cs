using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Repositories;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Models.Play;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    public class PlayController : Controller
    {
        IDataEntityRepository<Map> _map;
        IDataEntityRepository<Sounds> _music;
        NodeDBRepository _node;
        ImageDBRepository _image;
        ProfileProgressDBRepository _progress;
        OptionsDBRepository _options;
        AnimalDBRepository _animal;

        public PlayController()
        {
            _map = new MapDBRepository();
            _music = new SoundDBRepository();
            _node = new NodeDBRepository();
            _image = new ImageDBRepository();
            _progress = new ProfileProgressDBRepository();
            _options = new OptionsDBRepository();
            _animal = new AnimalDBRepository();
        }
        // GET: Play
        public ActionResult Play()
        {
            Options options = _options.Get(ImportantVariables.ProfileID);
            ProfileProgress progress = _progress.Get(ImportantVariables.ProfileID);
            PlayModel model = new PlayModel();
            List<Nodes> nodes = _node.GetList(progress.CurrentMap);
            int level = 0;

            if (options.SubjectFilter == "Reading")
                level = options.ReadingDifficultyLevel;
            else if (options.SubjectFilter == "Math")
                level = options.MathDifficultyLevel;
            else
                level = options.ReadingDifficultyLevel > options.MathDifficultyLevel ? 
                        options.ReadingDifficultyLevel : options.MathDifficultyLevel;

            if (level == 1)
                model.GradeLevel = "Pre-Preschool";
            else if (level == 2)
                model.GradeLevel = "Preschool";
            else if (level == 3)
                model.GradeLevel = "Pre-Kindergarten";
            else
                model.GradeLevel = "Kindergarten";

            model.ProfileName = options.profileName;
            model.Subject = options.SubjectFilter;
            if (model.Subject == "")
                model.Subject = "All";

            if(progress.CurrentNode == nodes.Count)
            {
                //call functions to update
            }
            model.Animal = progress.AnimalID;
            model.CurrentMap = progress.CurrentMap;
            model.CurrentNode = progress.CurrentNode;
            model.MapNodes = _node.GetList(progress.CurrentMap);
            model.Avatar = options.AvatarID;
            model.MapNodes = nodes;

            return View(model);
        }
        public ActionResult ShowMapImage(int mapID)
        {
            Map currentMap = _map.Get(mapID);  //get map from database
            Images image = _image.Get(currentMap.ImageID);  //get map image from database
            
            return File(image.Image, image.ImageName);
        }
        public ActionResult ShowAnimalImage(int AnimalID)
        {
            Animal animal = _animal.Get(AnimalID);  //get animal from database
            Images image = _image.Get(animal.ImageID);  //get animal image from database

            return File(image.Image, image.ImageName);
        }
        public ActionResult ShowAvatarImage(int profileID)
        {
            Options profile = _options.Get(ImportantVariables.ProfileID);  //get profile from database
            Images image = _image.Get(profile.AvatarID);  //get profile image from database

            return File(image.Image, image.ImageName);
        }
        public ActionResult LoadAudio(int mapID)
        {
            Map currentMap = _map.Get(mapID);  //get map from database
            Sounds audio = _music.Get(currentMap.SoundID);  //get sound from database
            
            return base.File(audio.Sound, audio.SoundName);
        }
        public void FinishMiniGame()
        {
            _progress.UpdateCurrentNode(ImportantVariables.ProfileID);
        }
    }
}