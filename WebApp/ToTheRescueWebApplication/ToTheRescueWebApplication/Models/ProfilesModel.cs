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
        private List<string> m_profileNames;
        private Byte[] m_profileAvatar;
        
        public ProfilesModel()
        {
            m_profileNames = null;
            m_profileAvatar = null;
        }

        /**********************************************************************
        * Purpose: This function grabs all of the profile names for a specific
        * userID from the database, and returns a list of those names.
        ***********************************************************************/
        public List<string> GetUserProfileNames(int userID)
        {
            m_profileNames = new List<string>();

            //Connect to the database using the connection string in the web.config file
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("SELECT ProfileName FROM Profiles WHERE UserID = " + userID + ";");
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
                            m_profileNames.Add(reader["ProfileName"].ToString());
                        }
                    }
                    //if it doesn't have rows then this user hasn't created a profile yet

                    return m_profileNames;
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

                m_profileAvatar = null;

                if (reader.Read() == false)
                    throw new Exception("Unable to read image.");

                m_profileAvatar = (Byte[])reader[0];

                reader.Close();

                return m_profileAvatar;
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