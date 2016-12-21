using Microsoft.VisualStudio.TestTools.UnitTesting;
using ToTheRescueWebApplication.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToTheRescueWebApplication.Models.Play;
using System.Web;
using System.IO;
using System.Web.SessionState;
using System.Reflection;
using Moq;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;
using System.Web.Script.Serialization;
using ToTheRescueWebApplication.Repositories;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace ToTheRescueWebApplication.Controllers.Tests
{
    [TestClass()]
    public class PlayControllerTests
    {
        PlayController _controller;
        ImageDBRepository _image;
        MapDBRepository _map;
        ProfileProgressDBRepository _progress;
        MiniGamesDBRepository _minigame;
        OptionsDBRepository _options;
        int profileID = 1;  
        int animalID = 2;        //original animalID
        int mapID = 1;           //original mapID
        int currentNode = 1;     //original nodeID
        const int LAST_MAP = 7;  //last map in the game
        const int FIRST_MAP = 1; //first map in game
        const int HIGHEST_DIFF = 4; //highest diff level
        const int LOWEST_DIFF = 1;  //lowest diff level

        public PlayControllerTests()
        {
            _controller = new PlayController();
            _image = new ImageDBRepository();
            _map = new MapDBRepository();
            _progress = new ProfileProgressDBRepository();
            _minigame = new MiniGamesDBRepository();
            _options = new OptionsDBRepository();
        }
        /*Tests that the model for a profile is correctly set in Play Controller by pulling
         * data from multiple tables in database*/
        [TestMethod]
        public void SetModelTest()
        {
            //set expected values
            PlayModel expected = new PlayModel();
            expected.Animal = animalID;
            expected.Avatar = 1;
            expected.CurrentMap = mapID;
            expected.CurrentNode = currentNode;
            expected.GradeLevel = "Preschool";

            expected.MapNodes = new List<Nodes>();
            Nodes node1 = new Nodes();
            node1.ID = 1;
            node1.MapID = mapID;
            node1.XCoordinate = -90;
            node1.YCoordinate = 32;
            expected.MapNodes.Add(node1);
            Nodes node2 = new Nodes();
            node2.ID = 2;
            node2.MapID = mapID;
            node2.XCoordinate = -82;
            node2.YCoordinate = 31;
            expected.MapNodes.Add(node2);
            Nodes node3 = new Nodes();
            node3.ID = 3;
            node3.MapID = mapID;
            node3.XCoordinate = -76;
            node3.YCoordinate = 30;
            expected.MapNodes.Add(node3);
            Nodes node4 = new Nodes();
            node4.ID = 4;
            node4.MapID = mapID;
            node4.XCoordinate = -70;
            node4.YCoordinate = 29;
            expected.MapNodes.Add(node4);
            Nodes node5 = new Nodes();
            node5.ID = 5;
            node5.MapID = mapID;
            node5.XCoordinate = -64;
            node5.YCoordinate = 28;
            expected.MapNodes.Add(node5);
            Nodes node6 = new Nodes();
            node6.ID = 6;
            node6.MapID = mapID;
            node6.XCoordinate = -58;
            node6.YCoordinate = 27;
            expected.MapNodes.Add(node6);

            expected.ProfileName = "Sophia";
            expected.Subject = "All";

            //mock out session variable
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["profileID"]).Returns(profileID);
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            //call SetModel method in PlayController
            _controller.ControllerContext = mockControllerContext.Object;
            PlayModel result = _controller.SetModel();

            //convert PlayModels into JSON to compare
            var js = new JavaScriptSerializer();
            Assert.AreEqual(js.Serialize(expected), js.Serialize(result));
        }

        /*Tests that the correct image is returned from the Images table for a MapID*/
        [TestMethod]
        public void ShowMapImageTest()
        {
            int expectedImageID = 27;

            Map currentMap = _map.Get(mapID);  //get map from database
            Images result = _image.Get(currentMap.ImageID);  //get map image from database

            Assert.AreEqual(expectedImageID, result.ID);
        }
        /*Tests that the correct image is returned from the Images table for an AnimalID*/
        [TestMethod]
        public void ShowAnimalImageTest()
        {
            AnimalDBRepository _animal = new AnimalDBRepository();
            int AnimalID = 2;
            int expectedImageID = 8;

            Animal animal = _animal.Get(AnimalID);  //get animal from database
            Images image = _image.Get(animal.ImageID);  //get animal image from database

            Assert.AreEqual(expectedImageID, image.ID);
        }
        /*Tests that the correct image is returned from the Images table for an AvatarID*/
        [TestMethod]
        public void ShowAvatarImageTest()
        {
            int expectedImageID = 1;

            Options profile = _options.Get(profileID);  //get profile from database
            Images image = _image.Get(profile.AvatarID);  //get profile image from database

            Assert.AreEqual(expectedImageID, image.ID);
        }
        /*Tests that the correct audio file is returned from the Sounds table for a MapID*/
        [TestMethod]
        public void LoadAudioTests()
        {
            SoundDBRepository _music = new SoundDBRepository();
            int expectedSoundID = 11;

            Map currentMap = _map.Get(mapID);  //get map from database
            Sounds audio = _music.Get(currentMap.SoundID);  //get sound from database

            Assert.AreEqual(expectedSoundID, audio.ID);
        }
        /*Tests that node is updated to next node on map*/
        [TestMethod]
        public void UpdateCurrentNodeTest()
        {
            int expectedNode = 2;

            //update current node (move to next node on map)
            _progress.UpdateCurrentNode(profileID);

            //get current profile progress
            ProfileProgress progess = _progress.Get(profileID);
            int result = progess.CurrentNode;

            //Restore current node back to original value   
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "UPDATE ProfileProgress SET CurrentNode=@NewNode WHERE ProfileID=@ProfileID";
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@NewNode", currentNode);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }

            //get current profile progress
            progess = _progress.Get(profileID);

            //check that expected node, result node from update, and current node + 1 from
            //restoring of current node value are equal
            Assert.AreEqual(expectedNode, result, (progess.CurrentNode + 1));
        }
        /*Tests that the MiniGameID of the recently played minigame is added to list of recently played in DB*/
        [TestMethod]
        public void UpdateRecentlyPlayedMiniGamesTest()
        {
            int miniGameID = 3;

            //add minigame to recenlty played
            _minigame.UpdateRecentlyPlayedMiniGames(profileID, miniGameID);

            //get list of recently plated minigames
            List<int> recentlyPlayed = _minigame.GetListRecentlyPlayed(profileID);

            //check that miniGameID is equal to last miniGameID in list of recently played
            Assert.AreEqual(miniGameID, recentlyPlayed[recentlyPlayed.Count - 1]);
        }
        /*Tests that reading performance statistic is correctly calculated and updated for profile*/
        [TestMethod]
        public void UpdateReadingPerformanceStatTest()
        {
            int score = 20;             //score from minigame
            float oldReadingStat = 0;   //stat for reading from database for profile
            float oldMathStat = 0;      //stat for math from database for profile
            float newStat = 0;          //new stat for profile       
            int oldReadingDifficulty;    //reading difficulty from database for profile
            int categoryID = 1;         //minigame CategoryID (1 for Reading)
            Options _stats;             //stats for updating difficulty after minigame
          
            //set initial reading stat and math stats for profile
            _minigame.UpdatePerformanceStats(profileID, 10, 70);

            _stats = _options.Get(profileID);   //get information for profile from database
            oldReadingStat = _stats.ReadingPerformanceStat;  //get reading stat from database
            oldMathStat = _stats.MathPerformanceStat;  //ensure that math stat doesn't change
            oldReadingDifficulty = _stats.ReadingDifficultyLevel;   //ensure difficulty doesn't change

            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            if (categoryID == 1) //Reading category
            {
                newStat = _stats.ReadingPerformanceStat + score;
                _minigame.UpdatePerformanceStats(profileID, newStat, _stats.MathPerformanceStat);

                //check if difficulty needs to be adjusted up or down   
                if (newStat > 100 && _stats.ReadingDifficultyLevel < HIGHEST_DIFF)
                {
                    _stats.ReadingDifficultyLevel = _stats.ReadingDifficultyLevel + 1;
                    _options.UpdateDifficulty(_stats);
                }
                else if (newStat < 0 && _stats.ReadingDifficultyLevel > LOWEST_DIFF)
                {
                    _stats.ReadingDifficultyLevel = _stats.ReadingDifficultyLevel - 1;
                    _options.UpdateDifficulty(_stats);
                }
            }

            //requery for latest profile information
            _stats = _options.Get(profileID);   //get information for profile from database

            Assert.AreEqual(oldMathStat, _stats.MathPerformanceStat);   //ensure didn't change
            Assert.AreEqual(newStat, _stats.ReadingPerformanceStat);   //check if updated correctly
            Assert.AreEqual(oldReadingDifficulty, _stats.ReadingDifficultyLevel);   //ensure didn't change
        }
        /*Tests that math performance statistic is correctly calculated and updated for profile*/
        [TestMethod]
        public void UpdateMathPerformanceStatTest()
        {
            int score = 20;             //score from minigame
            float oldReadingStat = 0;   //stat for reading from database for profile
            float oldMathStat = 0;      //stat for math from database for profile
            float newStat = 0;          //new stat for profile       
            int oldMathDifficulty;      //math difficulty from database for profile
            int categoryID = 2;         //minigame CategoryID (2 for Math)
            Options _stats;             //stats for updating difficulty after minigame
           
            //set initial reading stat and math stats for profile
            _minigame.UpdatePerformanceStats(profileID, 60, 20);
   
            _stats = _options.Get(profileID);   //get information for profile from database
            oldReadingStat = _stats.ReadingPerformanceStat;  //ensure that reading stat doesn't change
            oldMathStat = _stats.MathPerformanceStat;  //get math stat from database for profile
            oldMathDifficulty = _stats.MathDifficultyLevel;   //ensure difficulty doesn't change

            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            if (categoryID == 2) //Math category
            {
                newStat = _stats.MathPerformanceStat + score;
                _minigame.UpdatePerformanceStats(profileID, _stats.ReadingPerformanceStat, newStat);

                //check if difficulty needs to be adjusted up or down   
                if (newStat > 100 && _stats.MathDifficultyLevel < HIGHEST_DIFF)
                {
                    _stats.MathDifficultyLevel = _stats.MathDifficultyLevel + 1;
                    _options.UpdateDifficulty(_stats);
                }
                else if (newStat < 0 && _stats.MathDifficultyLevel > LOWEST_DIFF)
                {
                    _stats.MathDifficultyLevel = _stats.MathDifficultyLevel - 1;
                    _options.UpdateDifficulty(_stats);
                }
            }

            //requery for latest profile information
            _stats = _options.Get(profileID);   //get information for profile from database

            Assert.AreEqual(oldReadingStat, _stats.ReadingPerformanceStat);   //ensure didn't change
            Assert.AreEqual(newStat, _stats.MathPerformanceStat);   //check if updated correctly
            Assert.AreEqual(oldMathDifficulty, _stats.MathDifficultyLevel);   //ensure didn't change
        }
        /*Tests that difficulty level is incremented when performance statistic reaches highest value for range*/
        [TestMethod]
        public void IncrementDifficultyLevelTest()
        {
            int score = 50;              //score from minigame
            float newStat = 0;           //new performance statistic      
            int oldReadingDifficulty;    //reading difficulty from database for profile
            int newReadingDifficulty;    //new difficulty level for profile
            int categoryID = 1;          //minigame CategoryID (1 for Reading)
            Options _stats;              //stats for updating difficulty after minigame

            //set initial reading stat and math stats for profile
            _minigame.UpdatePerformanceStats(profileID, 70, 10);

            _stats = _options.Get(profileID);   //get information for profile from database
            oldReadingDifficulty = _stats.ReadingDifficultyLevel;   //old difficulty level for profile

            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            if (categoryID == 1) //Reading category
            {
                newStat = _stats.ReadingPerformanceStat + score;
                _minigame.UpdatePerformanceStats(profileID, newStat, _stats.MathPerformanceStat);

                //check if difficulty needs to be adjusted up or down   
                if (newStat > 100 && _stats.ReadingDifficultyLevel < HIGHEST_DIFF)
                {
                    _stats.ReadingDifficultyLevel = _stats.ReadingDifficultyLevel + 1;
                    _options.UpdateDifficulty(_stats);
                }
                else if (newStat < 0 && _stats.ReadingDifficultyLevel > LOWEST_DIFF)
                {
                    _stats.ReadingDifficultyLevel = _stats.ReadingDifficultyLevel - 1;
                    _options.UpdateDifficulty(_stats);
                }
            }

            //requery for latest profile information
            _stats = _options.Get(profileID);   //get information for profile from database
            newReadingDifficulty = _stats.ReadingDifficultyLevel;

            //reset reading difficulty level
            _stats.ReadingDifficultyLevel = 2;
            _options.UpdateDifficulty(_stats);

            //check that current difficulty level is one higher than old difficulty level
            Assert.AreEqual((oldReadingDifficulty + 1), newReadingDifficulty); 
        }
        /*Tests that difficulty level is decremented when performance statistic reaches lowest value for range*/
        [TestMethod]
        public void DecrementDifficultyLevelTest()
        {
            int score = -15;             //score from minigame
            float newStat = 0;          //new stat for profile       
            int oldMathDifficulty;      //math difficulty from database for profile
            int newMathDifficulty;      //new math difficulty for profile
            int categoryID = 2;         //minigame CategoryID (2 for Math)
            Options _stats;             //stats for updating difficulty after minigame

            //set initial reading stat and math stats for profile
            _minigame.UpdatePerformanceStats(profileID, 20, 10);

            _stats = _options.Get(profileID);   //get information for profile from database
            oldMathDifficulty = _stats.MathDifficultyLevel;   //old difficulty level for profile

            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            if (categoryID == 2) //Math category
            {
                newStat = _stats.MathPerformanceStat + score;
                _minigame.UpdatePerformanceStats(profileID, _stats.ReadingPerformanceStat, newStat);

                //check if difficulty needs to be adjusted up or down   
                if (newStat > 100 && _stats.MathDifficultyLevel < HIGHEST_DIFF)
                {
                    _stats.MathDifficultyLevel = _stats.MathDifficultyLevel + 1;
                    _options.UpdateDifficulty(_stats);
                }
                else if (newStat < 0 && _stats.MathDifficultyLevel > LOWEST_DIFF)
                {
                    _stats.MathDifficultyLevel = _stats.MathDifficultyLevel - 1;
                    _options.UpdateDifficulty(_stats);
                }
            }

            //requery for latest profile information
            _stats = _options.Get(profileID);   //get information for profile from database
            newMathDifficulty = _stats.MathDifficultyLevel;

            //reset math difficulty for profile
            _stats.MathDifficultyLevel = 2;
            _options.UpdateDifficulty(_stats);

            //check that currently difficulty level is one less than old difficulty level           
            Assert.AreEqual((oldMathDifficulty - 1), newMathDifficulty);  
        }
        /*Tests that difficulty level stays the same when performance statistic reaches highest value for range
         and hightest difficulty level is already reached*/
        [TestMethod]
        public void BoundaryOfIncrementDifficultyLevelTest()
        {
            int score = 50;              //score from minigame
            float newStat = 0;           //new performance statistic      
            int oldReadingDifficulty;    //reading difficulty from database for profile
            int newReadingDifficulty;    //new difficulty level for profile
            int categoryID = 1;          //minigame CategoryID (1 for Reading)
            Options _stats;              //stats for updating difficulty after minigame

            //set initial reading stat and math stats for profile
            _minigame.UpdatePerformanceStats(profileID, 70, 10);
            
            //set Reading difficulty to highest upper bound
            _stats = _options.Get(profileID);   //get information for profile from database
            _stats.ReadingDifficultyLevel = 4;
            _options.UpdateDifficulty(_stats);

            _stats = _options.Get(profileID);   //get information for profile from database
            oldReadingDifficulty = _stats.ReadingDifficultyLevel;   //old difficulty level for profile

            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            if (categoryID == 1) //Reading category
            {
                newStat = _stats.ReadingPerformanceStat + score;
                _minigame.UpdatePerformanceStats(profileID, newStat, _stats.MathPerformanceStat);

                //check if difficulty needs to be adjusted up or down   
                if (newStat > 100 && _stats.ReadingDifficultyLevel < HIGHEST_DIFF)
                {
                    _stats.ReadingDifficultyLevel = _stats.ReadingDifficultyLevel + 1;
                    _options.UpdateDifficulty(_stats);
                }
                else if (newStat < 0 && _stats.ReadingDifficultyLevel > LOWEST_DIFF)
                {
                    _stats.ReadingDifficultyLevel = _stats.ReadingDifficultyLevel - 1;
                    _options.UpdateDifficulty(_stats);
                }
            }

            //requery for latest profile information
            _stats = _options.Get(profileID);   //get information for profile from database
            newReadingDifficulty = _stats.ReadingDifficultyLevel;

            //reset reading difficulty level
            _stats.ReadingDifficultyLevel = 2;
            _options.UpdateDifficulty(_stats);

            //check that current difficulty level is same as old difficulty level
            Assert.AreEqual(oldReadingDifficulty, newReadingDifficulty);
        }
        /*Tests that difficulty level stays the same when performance statistic reaches lowest value for range
         and difficulty level is at lowest difficulty level*/
        [TestMethod]
        public void BoundaryOfDecrementDifficultyLevelTest()
        {
            int score = -15;             //score from minigame
            float newStat = 0;          //new stat for profile       
            int oldMathDifficulty;      //math difficulty from database for profile
            int newMathDifficulty;      //new math difficulty for profile
            int categoryID = 2;         //minigame CategoryID (2 for Math)
            Options _stats;             //stats for updating difficulty after minigame

            //set initial reading stat and math stats for profile
            _minigame.UpdatePerformanceStats(profileID, 20, 10);

            //set Math difficulty to lowest lower bound
            _stats = _options.Get(profileID);   //get information for profile from database
            _stats.MathDifficultyLevel = 1;
            _options.UpdateDifficulty(_stats);

            _stats = _options.Get(profileID);   //get information for profile from database
            oldMathDifficulty = _stats.MathDifficultyLevel;   //old difficulty level for profile

            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            if (categoryID == 2) //Math category
            {
                newStat = _stats.MathPerformanceStat + score;
                _minigame.UpdatePerformanceStats(profileID, _stats.ReadingPerformanceStat, newStat);

                //check if difficulty needs to be adjusted up or down   
                if (newStat > 100 && _stats.MathDifficultyLevel < HIGHEST_DIFF)
                {
                    _stats.MathDifficultyLevel = _stats.MathDifficultyLevel + 1;
                    _options.UpdateDifficulty(_stats);
                }
                else if (newStat < 0 && _stats.MathDifficultyLevel > LOWEST_DIFF)
                {
                    _stats.MathDifficultyLevel = _stats.MathDifficultyLevel - 1;
                    _options.UpdateDifficulty(_stats);
                }
            }

            //requery for latest profile information
            _stats = _options.Get(profileID);   //get information for profile from database
            newMathDifficulty = _stats.MathDifficultyLevel;

            //reset math difficulty for profile
            _stats.MathDifficultyLevel = 2;
            _options.UpdateDifficulty(_stats);

            //check that currently difficulty level is the same as old difficulty level           
            Assert.AreEqual(oldMathDifficulty, newMathDifficulty);
        }
        /*Tests that a map and animal are added to ProfileProgress table by ProfileID
         if AnimalID is 0 (new user)*/
        [TestMethod]
        public void AddProfileProgressTest()
        {
            int UserID = 1;
            string ProfileName = "Test";
            int ProfileID = 0;

            //Create a new profile
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("proc_AddNewProfile", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", UserID);
                    cmd.Parameters.AddWithValue("@AvatarID", 1);
                    cmd.Parameters.AddWithValue("@ProfileName", ProfileName);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }

            //Query database to retrieve ProfileID of new profile
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "SELECT * FROM Profiles WHERE UserID=@UserID AND ProfileName=@ProfileName";
                    cmd.Parameters.AddWithValue("@UserID", UserID);
                    cmd.Parameters.AddWithValue("@ProfileName", ProfileName);
                    cmd.Connection.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            ProfileID = (int)reader["ProfileID"];
                        }
                    }
                }
            }

            //get profile progress from ProfileProgress table for profile by ProfileID
            ProfileProgress p = _progress.Get(ProfileID);
            Random random = new Random();
            int newAnimal = random.Next(1, 21); //generate a number between 1 and 20 for animal to rescue

            //if user is a new user, add a map and animal to save to ProfileProgress
            if (p.AnimalID == 0)
            {
                _progress.AddProfileProgress(ProfileID, newAnimal);
            }

            p = _progress.Get(ProfileID);   //get profile progress again

            //Delete added profile from database
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("proc_DeleteProfile", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProfileID", ProfileID);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }

            //check that AnimalID is equal to random number generated for AnimalID 
            Assert.AreEqual(newAnimal, p.AnimalID);
            //check that MapID is equal to 1
            Assert.AreEqual(1, p.CurrentMap);
        }
        /*Tests that MapID is incremented when user completes current map and animal is saved in ProfileAnimals
         * table if MapID is less than the number of maps in the game*/
        [TestMethod]
        public void IncrementMapTest()
        {
            //get profile progress from ProfileProgress table for profile by ProfileID
            ProfileProgress p = _progress.Get(profileID);

            Random random = new Random();
            int newAnimal = random.Next(1, 21); //generate a number between 1 and 20 for animal to rescue
            int savedAnimal = p.AnimalID;       //id of saved animal
            int verifySavedAnimal = 0;          //id of saved animal from database
            int verifyNewMap = 0;               //id of new map from database
             
            //if user hasn't reached last map, go to next map
            if (p.CurrentMap < LAST_MAP)
            {
                _progress.RescueAnimal(profileID, p.AnimalID);   //save animal to ProfileAnimals
                _progress.UpdateCurrentMap(profileID, p.CurrentMap, newAnimal); //new map and animal
            }

            //Query database to retrieve recently saved AnimalID from ProfileAnimals by AnimalID and ProfileID
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "SELECT * FROM ProfileAnimals WHERE ProfileID=@ProfileID AND AnimalID=@AnimalID";
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@AnimalID", savedAnimal);
                    cmd.Connection.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            verifySavedAnimal = (int)reader["AnimalID"];
                        }
                    }
                }
            }

            //requery database for new current map
            p = _progress.Get(profileID);
            verifyNewMap = p.CurrentMap;

            //reset AnimalID and MapID values back to original
            //pass in mapID = 0 so will be incremented back to 1
            _progress.UpdateCurrentMap(profileID, (FIRST_MAP - 1), animalID);

            //check that AnimalID from database is same as saved AnimalID
            Assert.AreEqual(savedAnimal, verifySavedAnimal);
            //check that new MapID is one higher than original MapID
            Assert.AreEqual((mapID + 1), verifyNewMap);
        }
        /*Tests that MapID cycles back to first map when user completes current map if MapID 
         *is equal to the last map in the game*/
        [TestMethod]
        public void ReturnToFirstMapTest()
        {
            Random random = new Random();
            int newAnimal = random.Next(1, 21); //generate a number between 1 and 20 for animal to rescue
            int verifyNewMap = 0;               //id of new map from database

            //set map to last map in the game
            _progress.UpdateCurrentMap(profileID, (LAST_MAP - 1), newAnimal); //return to map1

            //mock out session variable
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["profileID"]).Returns(profileID);
            mockControllerContext.Setup(x => x.HttpContext.Session).Returns(mockSession.Object);

            //call method to update map in Play Controller
            _controller.ControllerContext = mockControllerContext.Object;
            _controller.NewMap();
            
            //requery database for new current map
            ProfileProgress p = _progress.Get(profileID);
            verifyNewMap = p.CurrentMap;

            //reset AnimalID and MapID values back to original
            //pass in mapID = 0 so will be incremented back to 1
            _progress.UpdateCurrentMap(profileID, (FIRST_MAP - 1), animalID);

            //check that new MapID is equal to first MapID
            Assert.AreEqual(FIRST_MAP, verifyNewMap);
        }
        /*Tests that the current node for a profile is returned*/
        [TestMethod]
        public void GetCurrentNodeTest()
        {
            int expected = 1;

            //mock out session variable
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["profileID"]).Returns(profileID);
            mockControllerContext.Setup(x => x.HttpContext.Session).Returns(mockSession.Object);

            //call method to get current node in Play Controller
            _controller.ControllerContext = mockControllerContext.Object;
            int result = _controller.GetCurrentNode();
            

            Assert.AreEqual(expected, result);
        }
        /*Tests that recenlty played minigames are returned from the ProfileProgressHistory table by ProfileID*/
        [TestMethod]
        public void GetRecentlyPlayMiniGamesTest()
        {
            List<int> expected = new List<int>();
            expected.Add(1);
            expected.Add(2);
            expected.Add(3);

            //add expected MiniGameIDs to ProfileProgressHistory table for profile
            for (int i = 0; i < expected.Count(); i++)
            {
                _minigame.UpdateRecentlyPlayedMiniGames(profileID, expected[i]);
            }
            //get list or recently played minigames
            List<int> result = _minigame.GetListRecentlyPlayed(profileID);

            CollectionAssert.AreEqual(expected, result);
        }
       
      
        /******Need a test for getting all minigames by subject filter and difficulty*****/
        /******Need a test to ensure random minigame in not in recently played*****/
    }
}