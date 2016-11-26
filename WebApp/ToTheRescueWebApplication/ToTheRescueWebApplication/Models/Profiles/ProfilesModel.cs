using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace ToTheRescueWebApplication.Models
{
    public class ProfilesModel
    {
        public ProfilesModel()
        {
            m_profileNamesForAUser = new List<string>();
            m_allUserProfileAvatars = new List<byte[]>();
            m_allAvatars = new List<byte[]>();
        }

        /**********************************************************************
        * Purpose: This function sets two data members to all of the profile names
        * for a specific profile and all the avatars for each of those profiles.
        ***********************************************************************/
        public void RetrieveChooseProfilePageInformation(int userID)
        {
            List<int> allProfileIDs = new List<int>();
            //Connect to the database using the connection string in the web.config file
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("SELECT ProfileName, ProfileID FROM Profiles WHERE UserID = " + userID + ";");
                    SqlDataReader reader;

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;

                    connection.Open();
                    reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        //add all of the profiles to the list
                        while (reader.Read())
                        {
                            //add all of the profile names to a list
                            m_profileNamesForAUser.Add(reader["ProfileName"].ToString());

                            //add all of the profileIDs to the allProfileIDs list
                            allProfileIDs.Add((int)reader["ProfileID"]);
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

                for (int i = 0; i < allProfileIDs.Count; i++)
                {
                    //add all the avatar pictures for all of the profiles to a list
                    m_allUserProfileAvatars.Add(GetProfileAvatar(allProfileIDs[i]));
                }
            }
        }

        /**********************************************************************
        * Purpose: This function grabs the avatar for the specific profileID
        * and returns it as a byte array.
        ***********************************************************************/
        public Byte[] GetProfileAvatar(int profileID)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = connection;
                    cmd.CommandText = "SELECT Images FROM dbo.GetProfileAvatar(" + profileID + ");";

                    connection.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    Byte[] profileAvatar = null;

                    if (reader.Read() == false)
                        throw new Exception("Unable to read image.");

                    profileAvatar = (Byte[])reader[0];

                    reader.Close();

                    return profileAvatar;
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
        public void RetrieveAllProfileAvatars()
        {
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
                        m_allAvatars.Add((Byte[])reader[0]);

                        //add all of the profiles to the list
                        while (reader.Read())
                        {
                            m_allAvatars.Add((Byte[])reader["Images"]);
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
        }

        //Woo, it works!
        public void DeleteProfile(string profileName, int uID)
        {
            int profileID = 0;
            UserID = uID;

            //Get the profileID
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    //parameterized statement
                    string sql = "SELECT ProfileID FROM Profiles WHERE UserID = @userID AND ProfileName = @profileName;";
                    SqlCommand cmd = new SqlCommand(sql);
                    
                    cmd.Parameters.Add(new SqlParameter("@userID", System.Data.SqlDbType.Int));
                    cmd.Parameters.Add(new SqlParameter("@profileName", System.Data.SqlDbType.VarChar));
                    cmd.Parameters["@userID"].Value = UserID;
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
                   // returnVal = false;
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

        //Adds a new profile to users table in the database
        public void AddNewProfile(int userID, int avatarID, string profileName)
        {
            //Delete that profileID out of the database
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_AddNewProfile", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", userID);
                        cmd.Parameters.AddWithValue("@AvatarID", avatarID);
                        cmd.Parameters.AddWithValue("@ProfileName", profileName);
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

        //Returns a list of all the profile names for a certain user
        public List<String> GetProfileNamesForASpecificUser()
        {
            return m_profileNamesForAUser;
        }

        //Returns a list of all the avatars for each profile for a certain user
        public List<Byte[]> GetAllProfileAvatarsForASpecificUser()
        {
            return m_allUserProfileAvatars;
        }

        public List<Byte[]> GetAllProfileAvatars()
        {
            return m_allAvatars;
        }

        //Holds the name of the profile to add to a user account
        public string NewProfileName { get; set; }

        //Holds the user inputted email in the ChooseProfiles page
        public string UserEmail { get; set; }

        //Holds the user inputted UserID
        public int UserID { get; set; }

        //Holds the profile name that the user wants to delete
        public string ProfileNameToDelete { get; set; }
        
        //holds the index of the profile to delete
        public string SelectedAvatarNum { get; set; }

        //will hold all the profile names for a specific user
        private List<string> m_profileNamesForAUser;

        //will hold all the profile avatars for a profile for a specific user
        private List<Byte[]> m_allUserProfileAvatars;

        //will hold all the possible avatar choices for the create profile page
        private List<Byte[]> m_allAvatars;
    }
}