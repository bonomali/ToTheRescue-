using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Web.Mvc;
using System.Web;
using System.IO;
using System.Web.SessionState;
using System.Reflection;
using Moq;
using System.Data.SqlClient;
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
        //test data needed to be able to run the tests
        private string _testEmail = "lake@gmail.com";
        private int _testUserID = 1;
        private int _testProfileID = 1;

        /**********************************************************************
        * Purpose: Fakes an http current context 
        ***********************************************************************/
        private void FakeCurrentHttpContext()
        {
            //fake an http request by making one of my own
            var httpRequest = new HttpRequest("", "http://mySomething/", "");
            var stringWriter = new StringWriter();
            var httpResponce = new HttpResponse(stringWriter);
            var httpContext = new HttpContext(httpRequest, httpResponce);

            var sessionContainer = new HttpSessionStateContainer("id", new SessionStateItemCollection(),
                                                                 new HttpStaticObjectsCollection(), 10, true,
                                                                 HttpCookieMode.AutoDetect,
                                                                 SessionStateMode.InProc, false);

            httpContext.Items["AspSession"] = typeof(HttpSessionState).GetConstructor(
                                                     BindingFlags.NonPublic | BindingFlags.Instance,
                                                     null, CallingConventions.Standard,
                                                     new[] { typeof(HttpSessionStateContainer) },
                                                     null)
                                                .Invoke(new object[] { sessionContainer });

            //assign it as the current http request
            HttpContext.Current = httpContext;

            //assign session varibales for the important data in the app
            //this makes it so the tests will actually work
            HttpContext.Current.Session["userID"] = _testUserID;
            HttpContext.Current.Session["userEmail"] = _testEmail;
            HttpContext.Current.Session["profileID"] = _testProfileID;
        }

        [TestMethod()]
        public void TestSanctuaryMethodReturnsSanctuaryPageView()
        {
            FakeCurrentHttpContext();
            var controller = new AnimalSanctuaryController();

            var result = controller.Sanctuary() as ViewResult;

            Assert.AreEqual(expected: "Sanctuary", actual: result.ViewName);
        }

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
            int expectedSoundID = 8;

            Animal animal = _animal.Get(AnimalID);  //get animal from database
            Sounds sound = _sound.Get(animal.SoundID);  //get animal sound from database

            Assert.AreEqual(expectedSoundID, sound.ID);
        }
    }
}
