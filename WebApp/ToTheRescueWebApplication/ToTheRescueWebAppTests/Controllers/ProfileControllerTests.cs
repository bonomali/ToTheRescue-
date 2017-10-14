using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Web.Mvc;
using System.Web;
using System.IO;
using System.Web.SessionState;
using System.Reflection;
using Moq;
using System.Data;
using System.Configuration;
using MySql.Data.MySqlClient;

namespace ToTheRescueWebApplication.Controllers.Tests
{
    [TestClass()]
    public class ProfileControllerTests
    {
        //test data needed to be able to run the tests
        private string _testEmail = "stephanie.vetter@oit.edu";
        private int _testUserID = 1;
        private int _testProfileID = 1;

        /**********************************************************************
        * Purpose: Fakes an http current context needed for any tests dealing with
        * the ProfileDBRepository
        ***********************************************************************/
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


        /**********************************************************************
        * Purpose: Deletes the test profile made in the TestCreateNewProfileSuccess() 
        * function.
        ***********************************************************************/
        private void DeleteProfileOutOfDatabase()
        {
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                MySqlCommand cmd = null;

                try
                {
                    cmd = new MySqlCommand("DELETE FROM Profiles WHERE ProfileName = @profileName;");

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;
                    cmd.Parameters.Add(new MySqlParameter("@profileName", System.Data.SqlDbType.VarChar));

                    cmd.Parameters["@profileName"].Value = "testProf";

                    //delete the test profile out of the database
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    if (connection != null)
                        connection.Close();
                }
            }
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
            Assert.AreEqual(expected: "ChooseProfilePage", actual: result.ViewName);
            
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

            string expected = "Incorrect email address entered. Please try again.";

            //ACT
            controller.ClickedDelete("incorrectEmail");
            string actual = controller.TempData["emailError"].ToString();

            //ASSERT
            Assert.AreEqual(expected, actual);
        }

        /**********************************************************************
        * Purpose: Ensures that the email check is correct and then a null
        * null reference exception will be throw because I didn't set up the
        * profileID session variable becuase I don't want any data out of the
        * database to be deleted. Note, the way my methods are set up, it will be
        * so much of a hassel in order to delete a profile out of the database.
        ***********************************************************************/
        [TestMethod()]
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
            controller.ClickedDelete("stephanie.vetter@oit.edu");
        }

        [TestMethod()]
        public void TestCreateNewProfileSuccess()
        {
            //ARRANGE
            //fake the http context
            FakeCurrentHttpContext();
            var controller = new ProfileController();
            string expected = "Success";

            //ACT
            var returnVal = controller.CreateNewProfile("testProf", 2) as ContentResult;

            //ASSERT
            Assert.AreEqual(expected, returnVal.Content);

            //delete the profile out of the database
            DeleteProfileOutOfDatabase();
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