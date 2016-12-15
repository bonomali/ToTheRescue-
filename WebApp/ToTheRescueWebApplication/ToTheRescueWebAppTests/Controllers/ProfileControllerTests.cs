using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Web.Mvc;
using System.Web;
using System.IO;
using System.Web.SessionState;
using System.Reflection;
using Moq;

namespace ToTheRescueWebApplication.Controllers.Tests
{
    [TestClass()]
    public class ProfileControllerTests
    {
        //test data needed to be able to run the tests
        private string _testEmail = "stephanie.vetter@oit.edu";
        private int _testUserID = 1;
        private int _testProfileID = 1;

        private void FakeCurrentHttpContext()
        {
            //fake an http request by making one of my onwn
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
        public void TestChooseProfilePageMethodReturnsChooseProfilePageView()
        {
            //ARRANGE
            //get the http request
            FakeCurrentHttpContext();
            var controller = new ProfileController();

            //ACT
            //call the the function in the ProfileController that shows 
            //the ChooseProfilePage
            var result = controller.ChooseProfilePage() as ViewResult;
            
            //ASSERT
            //Ensure the correct view was returned
            Assert.AreEqual("ChooseProfilePage", result.ViewName);
            
        }

        [TestMethod()]
        public void TestClickedDeleteEnteringIncorrectEmail()
        {
            //ARRANGE
            //mock out the session variables used in the ClickedDelete function in the ProfileController
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["userEmail"]).Returns("stephanie.vetter@oit.edu");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            var controller = new ProfileController();
            controller.ControllerContext = mockControllerContext.Object;

            string expected = "Incorrect email address eneterd. Please try again.";

            //ACT
            controller.ClickedDelete("incorrectEmail", 1);
            string actual = controller.TempData["emailError"].ToString();

            //ASSERT
            Assert.AreEqual(expected, actual);
        }

        /**********************************************************************
        * Purpose: Ensures that the email check is correct and then a null
        * null reference exception will be throw because I didn't set up the
        * profileID session variable becuase I don't want any data out of the
        * database to be deleted.
        ***********************************************************************/
        [TestMethod()] //WILL FINISH COMPLETELY LATER, MAKE SO IT DELETES A SPECIFIC PROFILE OUT OF DATABASE
        [ExpectedException(typeof(NullReferenceException))]
        public void TestClickedDeleteEnteringCorrectEmail()
        {
            //ARRANGE
            //mock out the session variables used in the ClickedDelete function in the ProfileController
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["userEmail"]).Returns("stephanie.vetter@oit.edu");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            var controller = new ProfileController();
            controller.ControllerContext = mockControllerContext.Object;

            //ACT
            controller.ClickedDelete("stephanie.vetter@oit.edu", 1);
        }

        [TestMethod()]
        public void TestCreateNewProfileSuccess()
        {
            //PUT THE PROFILE I JUST CREATED BACK INTO THE DATABASE
        }

        [TestMethod()]
        public void TestCreateNewProfileAllWhiteSpace()
        {
            //ARRANGE
            var controller = new ProfileController();
            string expectedErrorMessage = "You must enter a profile name in order to create a new profile. Please try again.";

            //ACT
            var returnVal = controller.CreateNewProfile("~!null~$", 1) as ContentResult;
            string actualErrorMessage = controller.TempData["EmptyNameError"].ToString();


            //ensure the same error messages are returned
            Assert.AreEqual(expectedErrorMessage, actualErrorMessage);

            //ensure the same content message was returned
            Assert.AreEqual(expected: "Failure", actual: returnVal.Content);

        }

        [TestMethod()]
        public void TestCreateNewProfileTooLongName()
        {
            //ARRANGE
            var controller = new ProfileController();
            string expectedErrorMessage = "You must enter a profile name that is 15 characters long or less. Please try again.";

            //ACT
            var returnVal = controller.CreateNewProfile("thisNameIsMoreThanFifteenCharactersLong", 1) as ContentResult;
            string actualErrorMessage = controller.TempData["TooLongName"].ToString();

            //ASSERT
            //ensure the error messages are the same
            Assert.AreEqual(actualErrorMessage, expectedErrorMessage);

            //ensure the same content message was returned
            Assert.AreEqual(expected: "Failure", actual: returnVal.Content);
        }

        [TestMethod()]
        public void TestCreateProfilePageMethodReturnsCreateProfilePageView()
        {
            //ARRANGE
            var controller = new ProfileController();

            //ACT
            //call the the function in the ProfileController that shows 
            //the ChooseProfilePage
            var result = controller.CreateProfilePage() as ViewResult;

            //ASSERT
            //Ensure the correct view was returned
            Assert.AreEqual("CreateProfilePage", result.ViewName);
        }
    }
}