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
        PlayModel _model;   //model for view
        Options _stats;      //stats for updating difficulty after minigame
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
            _model = new PlayModel();
            _stats = new Options();
        }
        // GET: Play
        // Set values from database to model, pass into Play/Map view
        public ActionResult Play()
        {
            _model = SetModel();

            return View(_model);
        }
        //set model values
        public PlayModel SetModel()
        { 
            ProfileProgress progress = _progress.Get((int)Session["profileID"]);
            _model.CurrentMap = progress.CurrentMap;
            if (_model.CurrentMap == 0)     //If MapID equals 0, no ProfileProgress
            {
                NewMap();                   //call function to set map and animal to save
                progress = _progress.Get((int)Session["profileID"]); //requery progress
                _model.CurrentMap = progress.CurrentMap;             //set current map
            }

            List<Nodes> nodes = _node.GetList(progress.CurrentMap);
            Options options = _options.Get((int)Session["profileID"]);
            int level = 0;

            _model.Animal = progress.AnimalID;
            _model.CurrentNode = progress.CurrentNode;
            _model.MapNodes = _node.GetList(progress.CurrentMap);
            _model.Avatar = options.AvatarID;
            _model.MapNodes = nodes;

            //set difficulty level for Play/Map display in View
            if (options.SubjectFilter == "Reading")
                level = options.ReadingDifficultyLevel;
            else if (options.SubjectFilter == "Math")
                level = options.MathDifficultyLevel;
            else
                level = options.ReadingDifficultyLevel > options.MathDifficultyLevel ?
                        options.ReadingDifficultyLevel : options.MathDifficultyLevel;

            //Set grade level for Play/Map display in View
            if (level == 1)
                _model.GradeLevel = "Pre-Preschool";
            else if (level == 2)
                _model.GradeLevel = "Preschool";
            else if (level == 3)
                _model.GradeLevel = "Pre-Kindergarten";
            else
                _model.GradeLevel = "Kindergarten";

            //Set name and subject filter for Play/Map display in View
            _model.ProfileName = options.profileName;
            _model.Subject = options.SubjectFilter;
            if (_model.Subject == "")
                _model.Subject = "All";

            //get list of playable minigames based on category and difficulty
            List<MiniGame> minigames = _minigame.GetListPlayable(3, 1, 2); //catID, minDiff, maxDiff
            //get list or recently played minigames
            List<int> playedgames = _minigame.GetListRecentlyPlayed((int)Session["profileID"]);

            //TO DO:
            /*****randomly choose a minigame that isn't in list of recently played
                  assign a minigame to the model******/

            return _model;
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
        //update ProfileProgress values for profile after a minigame is played
        [HttpPost]
        public void FinishMiniGame(int score, int miniGameID)
        {
            //update current node (move to next node on map)
            _progress.UpdateCurrentNode((int)Session["profileID"]);

            //add minigame to recenlty played
            //_minigame.UpdateRecentlyPlayedMiniGames((int)Session["profileID"], miniGameID);

            // recalculate performance statistic based on value returned from minigame
            //_stats = _options.Get((int)Session["profileID"]);
            
            //   check if difficulty needs to be adjusted*****/
        }
        //update ProfileProgress to a new map
        public void NewMap()
        {
            ProfileProgress p = _progress.Get((int)Session["profileID"]);
            Random random = new Random();
            int newAnimal = random.Next(1, 21); //generate a number between 1 and 20
            
            //if user is a new user, add a map and animal to save to ProfileProgress
            if(p.AnimalID == 0)
            {
                _progress.AddProfileProgress((int)Session["profileID"], newAnimal);
            }
            //if user hasn't reached last map, go to next map
            else if (p.CurrentMap < LAST_MAP)
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
        //page that executes minigame script
        public ActionResult MiniGame(PlayModel model)
        {
            _model = SetModel();
            return View(model);
        }
    }
}