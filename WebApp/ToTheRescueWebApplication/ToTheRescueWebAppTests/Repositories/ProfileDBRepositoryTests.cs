using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.SessionState;
using System.Reflection;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace ToTheRescueWebApplication.Repositories.Tests
{
    [TestClass()]
    public class ProfileDBRepositoryTests
    {
        //test data needed to be able to run the tests
        private string _testEmail = "stephanie.vetter@oit.edu";
        private int _testUserID = 1;
        private int _testProfileID = 1;

        private const int NUM_OF_AVATARS = 6;

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
        * Purpose: Deletes the test profile made in the TestSaveFunction() 
        * function.
        ***********************************************************************/
        private void DeleteProfileOutOfDatabase()
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("DELETE FROM Profiles WHERE ProfileName = @profileName;");

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;
                    cmd.Parameters.Add(new SqlParameter("@profileName", System.Data.SqlDbType.VarChar));

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

        /**********************************************************************
        * Purpose: Gets the profileID of the testProf which is needed for the
        * TestDeleteProfile test.
        ***********************************************************************/
        public int GetTestProfProfileID()
        {
            int id = -1;
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("SELECT ProfileID FROM Profiles WHERE ProfileName = @profileName;");

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;
                    cmd.Parameters.Add(new SqlParameter("@profileName", System.Data.SqlDbType.VarChar));

                    cmd.Parameters["@profileName"].Value = "testProf";

                    connection.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read() == false)
                        throw new Exception("Unable to read image.");

                    //get the id
                    id = (int)reader[0];

                    reader.Close();
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

            return id;
        }

        [TestMethod()]
        public void TestGetListFunction()
        {
            //ARRANGE
            //make a fake http context, used for the repo's constructor
            FakeCurrentHttpContext();
            ProfileDBRepository repo = new ProfileDBRepository(HttpContext.Current);

            //The fake user should always have only 3 profiles
            int expected = 3;

            //ACT
            List<Profile> actual = repo.GetList();

            //ASSERT
            Assert.AreEqual(expected, actual.Count());
        }

        [TestMethod()]
        public void TestSaveFunction()
        {
            //ARRANGE
            //make a fake http context, used for the repo's constructor
            FakeCurrentHttpContext();
            ProfileDBRepository repo = new ProfileDBRepository(HttpContext.Current);

            //needed to be passed into the Save function
            Profile entity = new Profile();
            entity.AvatarID = 1;
            entity.ProfileName = "testProf";

            //there should be one more profile for the test user
            int expected = 4;

            //ACT
            repo.Save(entity);
            List<Profile> actual = repo.GetList();

            //ASSERT
            Assert.AreEqual(expected, actual.Count());

            //delete the newely saved profile out of the database
            DeleteProfileOutOfDatabase();
        }

        [TestMethod()]
        public void TestGetProfileAvatar()
        {
            //ARRANGE
            //make a fake http context, used for the repo's constructor
            FakeCurrentHttpContext();
            ProfileDBRepository repo = new ProfileDBRepository(HttpContext.Current);

            //needed to be passed into the GetProfileAvatar function
            Profile entity = new Profile();
            entity.ID = 1;

            //ACT
            repo.GetProfileAvatar(entity);

            //ASSERT
            //ensures that it is getting an avatar converted to a Byte[] from the database
            //and that it is not null
            Assert.IsInstanceOfType(entity.Avatar, typeof(Byte[]));
            Assert.IsNotNull(entity.Avatar);
        }

        [TestMethod()]
        public void TestDeleteProfileFunction()
        {
            //ARRANGE
            //make a fake http context, used for the repo's constructor
            FakeCurrentHttpContext();
            ProfileDBRepository repo = new ProfileDBRepository(HttpContext.Current);

            //need to add a temp profile to be deleted
            Profile entity = new Profile();
            entity.AvatarID = 1;
            entity.ProfileName = "testProf";

            //add it to the database
            repo.Save(entity);

            //get it's profileID
            int id = GetTestProfProfileID();

            //after adding the test profile, after deletion there
            //should be only 3 profiles for the test user
            int expected = 3;

            //ACT
            repo.DeleteProfile(id);
            List<Profile> actual = repo.GetList();

            //Assert
            Assert.AreEqual(expected, actual.Count());
        }

        [TestMethod()]
        public void TestGetAllProfileAvatars()
        {
            //ARRANGE
            //make a fake http context, used for the repo's constructor
            FakeCurrentHttpContext();
            ProfileDBRepository repo = new ProfileDBRepository(HttpContext.Current);

            int expected = NUM_OF_AVATARS;

            //ACT
            List<Byte[]> actual = repo.GetAllProfileAvatars();

            //ASSERT
            Assert.AreEqual(expected, actual.Count());
        }

    }
}