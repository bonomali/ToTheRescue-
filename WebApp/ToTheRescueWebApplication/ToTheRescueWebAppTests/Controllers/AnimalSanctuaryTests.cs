using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Web.Mvc;
using System.Web;
using System.IO;
using System.Web.SessionState;
using System.Reflection;
using Moq;
using MySql.Data.MySqlClient;
using System.Data;
using System.Configuration;
using ToTheRescueWebApplication.Controllers;
using ToTheRescueWebApplication.Repositories;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication;

namespace ToTheRescueWebAppTests.Controllers.Tests
{
    [TestClass()]
    public class AnimalSanctuaryTests
    {
        /*Tests that the correct image is returned from the Images table for an AnimalID*/
        [TestMethod]
        public void ShowAnimalImageTest()
        {
            AnimalDBRepository _animal = new AnimalDBRepository();
            ImageDBRepository _image = new ImageDBRepository();
            int AnimalID = 2;
            int expectedImageID = 8;

            Animal animal = _animal.Get(AnimalID);  //get animal from database
            Images image = _image.Get(animal.ImageID);  //get animal image from database

            Assert.AreEqual(expectedImageID, image.ID);
        }

        /*Tests that the correct sound is returned from the Sounds table for an AnimalID*/
        [TestMethod]
        public void PlayAnimalSoundTest()
        {
            AnimalDBRepository _animal = new AnimalDBRepository();
            SoundDBRepository _sound = new SoundDBRepository();
            int AnimalID = 2;
            int expectedSoundID = 6;

            Animal animal = _animal.Get(AnimalID);  //get animal from database
            Sounds sound = _sound.Get(animal.SoundID);  //get animal sound from database

            Assert.AreEqual(expectedSoundID, sound.ID);
        }
    }
}
