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
        PlayModel _model;        //model for view
        Options _stats;          //stats for updating difficulty after minigame
        const int LAST_MAP = 7;  //last map in game
        const int FIRST_MAP = 1; //first map in game
        const int HIGHEST_DIFF = 4; //highest diff level
        const int LOWEST_DIFF = 1;  //lowest diff level
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
                _model.CurrentMap = progress.CurrentMap;             //set current map for model
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
        public void FinishMiniGame(int score, int miniGameID, int categoryID)
        {
            float newStat = 0;

            //update current node (move to next node on map)
            _progress.UpdateCurrentNode((int)Session["profileID"]);

            //add minigame to recenlty played
            _minigame.UpdateRecentlyPlayedMiniGames((int)Session["profileID"], miniGameID);

            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            _stats = _options.Get((int)Session["profileID"]);

            if (categoryID == 1) //Reading category
            {
                newStat = _stats.ReadingPerformanceStat + score;
                
                //check if difficulty needs to be adjusted up or down   
                if (newStat > 125 && _stats.ReadingDifficultyLevel < HIGHEST_DIFF)  //increase difficulty
                {
                    _stats.ReadingDifficultyLevel = _stats.ReadingDifficultyLevel + 1;
                    _options.UpdateDifficulty(_stats);
                    newStat = 100;  //reset stat
                }
                else if (newStat < 75 && _stats.ReadingDifficultyLevel > LOWEST_DIFF)
                {
                    _stats.ReadingDifficultyLevel = _stats.ReadingDifficultyLevel - 1;  //decrease difficulty
                    _options.UpdateDifficulty(_stats);
                    newStat = 100;  //reset stat
                }
                else if(newStat < 75 && _stats.ReadingDifficultyLevel == LOWEST_DIFF ||
                        newStat > 125 && _stats.ReadingDifficultyLevel == HIGHEST_DIFF)
                {
                    newStat = 100;  //already at boundary, reset stat
                }
                //write stats to DB
                _minigame.UpdatePerformanceStats((int)Session["profileID"], newStat, _stats.MathPerformanceStat);
            }
            else  //Math category
            {
                newStat = _stats.MathPerformanceStat + score;

                //check if difficulty needs to be adjusted up or down   
                if (newStat > 125 && _stats.MathDifficultyLevel < HIGHEST_DIFF) //increase difficulty
                {
                    _stats.MathDifficultyLevel = _stats.MathDifficultyLevel + 1;
                    _options.UpdateDifficulty(_stats);
                    newStat = 100;  //reset stat
                }
                else if (newStat < 75 && _stats.MathDifficultyLevel > LOWEST_DIFF)
                {
                    _stats.MathDifficultyLevel = _stats.MathDifficultyLevel - 1;    //decrease difficulty
                    _options.UpdateDifficulty(_stats);
                    newStat = 100;  //reset stat
                }
                else if (newStat < 75 && _stats.MathDifficultyLevel == LOWEST_DIFF ||
                         newStat > 125 && _stats.MathDifficultyLevel == HIGHEST_DIFF)
                {
                    newStat = 100;  //already at boundary, reset stat
                }
                //write stats to DB
                _minigame.UpdatePerformanceStats((int)Session["profileID"], _stats.ReadingPerformanceStat, newStat);
            }
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
            else //pass in FIRST_MAP - 1 so increment in UpdateCurrentMap function will increment to MapID = 1
            { 
                _progress.UpdateCurrentMap((int)Session["profileID"], (FIRST_MAP - 1), newAnimal); //return to map1
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
        /***********************THIS IS NOT FULLY FUNCTIONAL, WE NEED MINIGAMES*******************/
        /*******************************MAY BREAK FOR SOME PROFILES*******************************/
        /*************************************NOT YET TESTED**************************************/
        //page that executes minigame script, set MiniGame model
        public ActionResult MiniGame()
        {
            Options profileSettings = _options.Get((int)Session["profileID"]);
            MiniGameModel model = new MiniGameModel();
            List<MiniGame> minigames = new List<MiniGame>();
            Random random = new Random();
            int catID = 0;  //category id

            //get subject filter for profile, if no filter, randomly choose a subject for minigame
            if (profileSettings.SubjectFilter == "Reading")
                catID = 1;
            else if (profileSettings.SubjectFilter == "Math")
                catID = 2;
            else  
                catID = random.Next(1, 3); //no subject filter, randomly choose a minigame category        

            //get a list of minigames that adheres to subject filter and difficulty level
            if (catID == 1)
            {
                minigames = _minigame.GetListPlayable(catID, profileSettings.ReadingDifficultyLevel); //catID, difficulty level
                model.Difficulty = profileSettings.ReadingDifficultyLevel;  //difficult level for model
            }
            else if (catID == 2)
            {
                minigames = _minigame.GetListPlayable(catID, profileSettings.MathDifficultyLevel); //catID, difficulty level   
                model.Difficulty = profileSettings.MathDifficultyLevel; //difficulty level for model
            }
            //get list or recently played minigames
            List<int> playedgames = _minigame.GetListRecentlyPlayed((int)Session["profileID"]);

            //randomly choose a minigame that isn't in list of recently played, assign a minigame to the model
            int ranGame = random.Next(1, minigames.Count()) - 1; //generate an index between 1 and num of playable games

            //continue generating random gameID while recently played game is randomly selected
            bool played = true;
            int loopCounter = 0;
            while (played == true)  
            {
                played = false;
                for(int i = 0; i < playedgames.Count(); i++)
                {
                    if(minigames[ranGame].ID == playedgames[i]) 
                    {
                        //generate an index between 1 and num of playable games
                        ranGame = random.Next(1, minigames.Count()) - 1;
                        played = true; 
                    }
                }
                loopCounter++;       //increment number of times through loop
                if(loopCounter == 6) //Ensure that game doesn't get stuck in endless loop if not enough minigames
                {
                    played = false;
                }
            }
            model.MiniGameID = minigames[ranGame].ID;
            //model.MiniGame = minigames[ranGame].MiniGamePath;
            //model.MiniGame = "../../MiniGames/Alphabet_BubblePop/javascript/bubble.js"; //path to minigame (eventually on server)
            model.MiniGame = "../../MiniGames/ColorSortingGame/javascript/ColorSortingGame.js"; //path to minigame (eventually on server)
            //model.MiniGame = "../../MiniGames/Number_Comparison/javascript/Number_Comparison.js"; //path to minigame (eventually on server)
            model.CategoryID = minigames[ranGame].MiniGameCategoryID;
            return View(model);
        }
    }
}