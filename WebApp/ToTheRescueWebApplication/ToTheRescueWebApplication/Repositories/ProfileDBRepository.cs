using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace ToTheRescueWebApplication.Repositories
{
    public class ProfileDBRepository : IDataEntityRepository<Profile>
    {
        //needed for the get all profile avatars class
        private const int AVTAR_IMAGE_CLASS = 1;

        //will hold the httpcontext in order to get a session variable's information
        private HttpContext _ctx;

        /**********************************************************************
        * Purpose: Uses dependency injection to get httpcontext in order 
        * to get a session variable's information.
        ***********************************************************************/
        public ProfileDBRepository(HttpContext ctx)
        {
            _ctx = ctx;
        }

        //Not implemented but needed due to inheritance
        public Profile Get(int profileID)
        {
            throw new NotImplementedException();
        }

        /**********************************************************************
        * Purpose: Gets a list of profiles needed for the choose profile page.
        ***********************************************************************/
        public List<Profile> GetList()
        {
            List<Profile> profiles = new List<Profile>();

            using (MySqlConnection connection = new MySqlConnection(WebConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                MySqlCommand cmd = null;

                try
                {
                    cmd = new MySqlCommand("SELECT ProfileName, ProfileID FROM Profiles WHERE UserID = @userID;");
                    MySqlDataReader reader;

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;
                    cmd.Parameters.Add(new MySqlParameter("@userID", System.Data.SqlDbType.Int));

                    //use the session variable to get the userID and assign it to the userID sql parameter
                    cmd.Parameters["@userID"].Value = (int)_ctx.Session["userID"];

                    connection.Open();
                    reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        //add all of the profiles to the list
                        while (reader.Read())
                        {
                            Profile profile = new Profile();

                            profile.ProfileName = reader["ProfileName"].ToString();

                            profile.ID = (int)reader["ProfileID"];

                            profiles.Add(profile);
                        }
                    }
                    //if it doesn't have rows then this user hasn't created a profile yet
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

                for (int i = 0; i < profiles.Count(); i++)
                {
                    //add all the avatar pictures for all of the profiles in the list
                    GetProfileAvatar(profiles[i]);
                }
            }

            return profiles;
        }

        /**********************************************************************
        * Purpose: Adds a profile to the Profiles table in the database
        ***********************************************************************/
        public void Save(Profile entity)
        {
            using (MySqlConnection connection = new MySqlConnection(WebConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand("proc_AddNewProfile", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        //use the session variable to assign the userID
                        cmd.Parameters.AddWithValue("@UserID", (int)_ctx.Session["userID"]);

                        cmd.Parameters.AddWithValue("@AvatarID", entity.AvatarID);
                        cmd.Parameters.AddWithValue("@ProfileName", entity.ProfileName);
                        connection.Open();
                        cmd.ExecuteNonQuery();
                    }
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
        * Purpose: This function grabs the avatar for the specific profileID
        * and assigns it to the Profile passed into the function.
        ***********************************************************************/
        public void GetProfileAvatar(Profile prof)
        {
            using (MySqlConnection connection = new MySqlConnection(WebConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand("GetProfileAvatar", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@profileID3", prof.ID);
                        connection.Open();
                        cmd.ExecuteNonQuery();

                        MySqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read() == false)
                            throw new Exception("Unable to read image.");

                        prof.Avatar = (Byte[])reader[0];

                        reader.Close();
                    }
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
        * Purpose: Deletes a profile out of the database using one of the functions in the database.
        * The parameter is the profileID.
        ***********************************************************************/
        public void DeleteProfile(int profileID)
        {
            //Delete that profileID out of the database
            using (MySqlConnection connection = new MySqlConnection(WebConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand("proc_DeleteProfile", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", profileID);
                        connection.Open();
                        cmd.ExecuteNonQuery();
                    }
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
        * Purpose: This function returns a list of all the profile avatars in the database.
        ***********************************************************************/
        public List<Byte[]> GetAllProfileAvatars()
        {
            List<Byte[]> allAvatars = new List<byte[]>();
            using (MySqlConnection connection = new MySqlConnection(WebConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                try
                {
                    MySqlCommand cmd = new MySqlCommand();
                    cmd.Connection = connection;
                    cmd.CommandText = "SELECT Images FROM Images WHERE ImageClass = @imgClass;";
                    cmd.Parameters.Add(new MySqlParameter("@imgClass", System.Data.SqlDbType.Int));


                    cmd.Parameters["@imgClass"].Value = AVTAR_IMAGE_CLASS;

                    connection.Open();
                    MySqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read() == false)
                        throw new Exception("Unable to read image.");

                    if (reader.HasRows)
                    {
                        //reader doens't take the first avatar for some reason, this gets the first one
                        allAvatars.Add((Byte[])reader[0]);

                        //add all of the profiles to the list
                        while (reader.Read())
                        {
                            allAvatars.Add((Byte[])reader["Images"]);
                        }
                    }

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
            return allAvatars;
        }
    }
}