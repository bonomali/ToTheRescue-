using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class ProfileDBRepository : IDataEntityRepository<Profile>
    {
        //Gets all the profile information for a certain profileID
        public Profile Get(int profileID)
        {
            throw new NotImplementedException();
        }

        //Gets a list of profiles needed for the choose profile page
        public List<Profile> GetList()
        {
            List<Profile> profiles = new List<Profile>();

            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("SELECT ProfileName, ProfileID FROM Profiles WHERE UserID = @userID;");
                    SqlDataReader reader;

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;
                    cmd.Parameters.Add(new SqlParameter("@userID", System.Data.SqlDbType.Int));
                    cmd.Parameters["@userID"].Value = ImportantVariables.UserID;

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

        //adds a profile to the Profiles table in the database
        public void Save(Profile entity)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_AddNewProfile", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", ImportantVariables.UserID);
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
        * and returns it as a byte array.
        ***********************************************************************/
        public void GetProfileAvatar(Profile prof)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = connection;
                    cmd.CommandText = "SELECT Images FROM dbo.GetProfileAvatar(@profileID);";
                    cmd.Parameters.Add(new SqlParameter("@profileID", System.Data.SqlDbType.Int));
                    cmd.Parameters["@profileID"].Value = prof.ID;

                    connection.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read() == false)
                        throw new Exception("Unable to read image.");

                    prof.Avatar = (Byte[])reader[0];

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
        }

        //Deletes a profile out of the database using one of the functions in the database
        public void DeleteProfile(string profileName, int uID)
        {
            int profileID = 0;

            //Get the profileID to delete
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    //parameterized statement
                    string sql = "SELECT ProfileID FROM Profiles WHERE UserID = @userID AND ProfileName = @profileName;";
                    SqlCommand cmd = new SqlCommand(sql);

                    cmd.Parameters.Add(new SqlParameter("@userID", System.Data.SqlDbType.Int));
                    cmd.Parameters.Add(new SqlParameter("@profileName", System.Data.SqlDbType.VarChar));
                    cmd.Parameters["@userID"].Value = uID;
                    cmd.Parameters["@profileName"].Value = profileName;

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;

                    connection.Open();
                    //how to get a single value back
                    profileID = (int)cmd.ExecuteScalar();
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

            //Delete that profileID out of the database
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_DeleteProfile", connection))
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
        * Purpose: This function populates the m_allAvatars list with all the 
        * Images from the Images table that are avatars.
        ***********************************************************************/
        public List<Byte[]> GetAllProfileAvatars()
        {
            List<Byte[]> allAvatars = new List<byte[]>();
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = connection;
                    cmd.CommandText = "SELECT Images FROM Images WHERE ImageClass = @imgClass;";
                    cmd.Parameters.Add(new SqlParameter("@imgClass", System.Data.SqlDbType.Int));
                    cmd.Parameters["@imgClass"].Value = 1;

                    connection.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

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