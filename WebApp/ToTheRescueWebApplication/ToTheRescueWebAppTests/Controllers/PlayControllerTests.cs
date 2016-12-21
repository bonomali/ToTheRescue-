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
        ImageDBRepository _image;
        MapDBRepository _map;
        ProfileProgressDBRepository _progress;
        MiniGamesDBRepository _minigame;
        OptionsDBRepository _options;
        int profileID = 1;      

        public PlayControllerTests()
        {
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
            expected.Animal = 2;
            expected.Avatar = 1;
            expected.CurrentMap = 1;
            expected.CurrentNode = 1;
            expected.GradeLevel = "Pre-Preschool";

            expected.MapNodes = new List<Nodes>();
            Nodes node1 = new Nodes();
            node1.ID = 1;
            node1.MapID = 1;
            node1.XCoordinate = -90;
            node1.YCoordinate = 32;
            expected.MapNodes.Add(node1);
            Nodes node2 = new Nodes();
            node2.ID = 2;
            node2.MapID = 1;
            node2.XCoordinate = -82;
            node2.YCoordinate = 31;
            expected.MapNodes.Add(node2);
            Nodes node3 = new Nodes();
            node3.ID = 3;
            node3.MapID = 1;
            node3.XCoordinate = -76;
            node3.YCoordinate = 30;
            expected.MapNodes.Add(node3);
            Nodes node4 = new Nodes();
            node4.ID = 4;
            node4.MapID = 1;
            node4.XCoordinate = -70;
            node4.YCoordinate = 29;
            expected.MapNodes.Add(node4);
            Nodes node5 = new Nodes();
            node5.ID = 5;
            node5.MapID = 1;
            node5.XCoordinate = -64;
            node5.YCoordinate = 28;
            expected.MapNodes.Add(node5);
            Nodes node6 = new Nodes();
            node6.ID = 6;
            node6.MapID = 1;
            node6.XCoordinate = -58;
            node6.YCoordinate = 27;
            expected.MapNodes.Add(node6);

            expected.ProfileName = "Sophia";
            expected.Subject = "All";

            //mock out session variable
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["profileID"]).Returns(1);
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            //call SetModel method in PlayController
            PlayController testController = new PlayController();
            testController.ControllerContext = mockControllerContext.Object;
            PlayModel result = testController.SetModel();

            //convert PlayModels into JSON to compare
            var js = new JavaScriptSerializer();
            Assert.AreEqual(js.Serialize(expected), js.Serialize(result));
        }

        /*Tests that the correct image is returned from the Images table for a MapID*/
        [TestMethod]
        public void ShowMapImageTest()
        {
            int mapID = 1;
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
            int mapID = 1;
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
            int newNode = 1;

            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "UPDATE ProfileProgress SET CurrentNode=@NewNode WHERE ProfileID=@ProfileID";
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@NewNode", newNode);
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
        /*[TestMethod]
        public void UpdateReadingPerformanceStatTest()
        {
            int score = 20;      //score from minigame
            float newStat = 0;   //new stat for profile       
            Options _stats;      //stats for updating difficulty after minigame
            
            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            /*_stats = _options.Get(profileID);
            
            newStat = _stats.ReadingPerformanceStat + score;
            _minigame.UpdatePerformanceStats(profileID, newStat, _stats.MathPerformanceStat);

            //check if difficulty needs to be adjusted up or down   
            if (newStat > 100 && _stats.ReadingPerformanceStat < 4)
                _stats.ReadingPerformanceStat = _stats.ReadingPerformanceStat + 1;
            else if (newStat < 0 && _stats.ReadingPerformanceStat > 1)
                _stats.ReadingPerformanceStat = _stats.ReadingPerformanceStat - 1;
        }
        [TestMethod]
        public void UpdateMathPerformanceStatTest()
        {
            int score = 20;      //score from minigame
            float newStat = 0;   //new stat for profile       
            Options _stats;      //stats for updating difficulty after minigame

            //recalculate performance statistic based on value returned from minigame
            /*************************************WE NEED AN ACTUAL ALGORTHIM HERE***************************/
            /*_stats = _options.Get(profileID);

            newStat = _stats.MathPerformanceStat + score;
            _minigame.UpdatePerformanceStats(profileID, _stats.ReadingPerformanceStat, newStat);

            //check if difficulty needs to be adjusted up or down   
            if (newStat > 100 && _stats.MathPerformanceStat < 4)
                _stats.MathPerformanceStat = _stats.MathPerformanceStat + 1;
            else if (newStat < 0 && _stats.MathPerformanceStat > 1)
                _stats.MathPerformanceStat = _stats.MathPerformanceStat - 1;
        }*/


        /***************************Need NewMap Tests**************************/
        
             
        /*Tests that the current node for a profile is returned*/
        [TestMethod]
        public void GetCurrentNodeTest()
        {
            int expected = 1;   
            ProfileProgress p = _progress.Get(profileID);

            Assert.AreEqual(expected, p.CurrentNode);
        }


        /***************************Need MiniGame Tests**************************/
    }
}