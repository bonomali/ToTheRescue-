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
        MiniGamesDBRepository _minigame;

        const int LAST_MAP = 7;    //last map in game
        public PlayController()
        {
            _map = new MapDBRepository();
            _music = new SoundDBRepository();
            _node = new NodeDBRepository();
            _image = new ImageDBRepository();
            _progress = new ProfileProgressDBRepository();
            _options = new OptionsDBRepository();
            _animal = new AnimalDBRepository();
            _minigame = new MiniGamesDBRepository();
        }
        // GET: Play
        // Set values from database to model, pass into Play/Map view
        public ActionResult Play()
        {
            PlayModel model = SetModel();

            if (model.CurrentMap == LAST_MAP)
                return RedirectToAction("EndofGame");

            return View(model);
        }
        //set model values
        public PlayModel SetModel()
        {
            Options options = _options.Get((int)Session["profileID"]);
            ProfileProgress progress = _progress.Get((int)Session["profileID"]);
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

            model.Animal = progress.AnimalID;
            model.CurrentMap = progress.CurrentMap;
            model.CurrentNode = progress.CurrentNode;
            model.MapNodes = _node.GetList(progress.CurrentMap);
            model.Avatar = options.AvatarID;
            model.MapNodes = nodes;

            //get minigame
            List<MiniGame> minigames = _minigame.GetList(3, 1, 2); //catID, minDiff, maxDiff

            model.MiniGame = minigames[2].MiniGameCode;
            model.MiniGameID = minigames[2].ID;

            return model;
        }
        //display map image
        public ActionResult ShowMapImage(int mapID)
        {
            Map currentMap = _map.Get(mapID);  //get map from database
            Images image = _image.Get(currentMap.ImageID);  //get map image from database
            
            return File(image.Image, image.ImageName);
        }
        //display animal image
        public ActionResult ShowAnimalImage(int AnimalID)
        {
            Animal animal = _animal.Get(AnimalID);  //get animal from database
            Images image = _image.Get(animal.ImageID);  //get animal image from database

            return File(image.Image, image.ImageName);
        }
        //display avatar image
        public ActionResult ShowAvatarImage(int profileID)
        {
            Options profile = _options.Get((int)Session["profileID"]);  //get profile from database
            Images image = _image.Get(profile.AvatarID);  //get profile image from database

            return File(image.Image, image.ImageName);
        }
        //play map background music
        public ActionResult LoadAudio(int mapID)
        {
            Map currentMap = _map.Get(mapID);  //get map from database
            Sounds audio = _music.Get(currentMap.SoundID);  //get sound from database
            
            return base.File(audio.Sound, audio.SoundName);
        }
        public ActionResult ExecMiniGame()
        {
            List<MiniGame> minigames = _minigame.GetList(3, 1, 2); //catID, minDiff, maxDiff
            MiniGame game = minigames[2];

            return base.File(game.MiniGameCode, game.MiniGameName);
        }
        //update ProfileProgress values for profile after a minigame is played
        public void FinishMiniGame()
        {
            _progress.UpdateCurrentNode((int)Session["profileID"]);
        }
        //update ProfileProgress to a new map
        public void NewMap()
        {
            ProfileProgress p = _progress.Get((int)Session["profileID"]);
            Random random = new Random();
            int newAnimal = random.Next(1, 21); //generate a number between 1 and 20
            //if user hasn't reached last map, go to next map
            if (p.CurrentMap < LAST_MAP)
            {
                _progress.RescueAnimal((int)Session["profileID"], p.AnimalID);   //save animal to ProfileAnimals
                _progress.UpdateCurrentMap((int)Session["profileID"], p.CurrentMap, newAnimal); //new map and animal
            }
            else
            { 
                _progress.UpdateCurrentMap((int)Session["profileID"], 1, newAnimal); //return to map1
            }
        }
        //get the number of the current node for profile
        [HttpPost]
        public int GetCurrentNode ()
        {
            ProfileProgress p = _progress.Get((int)Session["profileID"]);

            return p.CurrentNode;
        }
        //show end of game congratulatory screen
        public ActionResult EndofGame()
        {
            return View();
        }
    }
}