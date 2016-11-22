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
        public  Byte[] GetProfileAvatar(int profileID)
        {
            SqlConnection connection = null;
            try
            {
                connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString);

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

        //will hold all the profile names for a specific user
        private List<string> m_profileNamesForAUser;

        //will hold all the profile avatars for a profile for a specific user
        private List<Byte[]> m_allUserProfileAvatars;
    }
}

//code that turns a ByteArray to an image
//used the private variable  Image m_profileAvatar; rather than the Byte[]

//public Image GetProfileAvatar(int profileID)
//{
//    SqlConnection connection = null;
//    byte[] avatar = null;

//    try
//    {
//        connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString);

//        SqlCommand cmd = new SqlCommand();
//        cmd.Connection = connection;
//        cmd.CommandText = "SELECT Images FROM dbo.GetProfileAvatar(" + profileID + ");";

//        connection.Open();
//        SqlDataReader reader = cmd.ExecuteReader();

//        if (reader.Read() == false)
//            throw new Exception("Unable to read image.");

//        avatar = (Byte[])reader[0];

//        reader.Close();
//    }
//    catch (Exception e)
//    {
//        throw e;
//    }
//    finally
//    {
//        if (connection != null)
//            connection.Close();
//    }

//    Image newImage = ByteArrayToImage(avatar);
//    m_profileAvatar = newImage;

//    return m_profileAvatar;
//}

//private Image ByteArrayToImage(Byte[] avatar)
//{
//    using (var ms = new MemoryStream(avatar))
//    {
//        return Image.FromStream(ms);
//    }
//}