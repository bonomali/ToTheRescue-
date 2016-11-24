using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;


namespace ToTheRescueWebApplication.Models
{
    public class AnimalSanctuaryModel
    {

        public int a_ProfileID { get; set; }
        public List<Byte[]> a_AnimalImg { get; set; }
        public string a_ProfileName { get; set; }
        public List<Byte[]> a_AnimalSound { get; set; }
        public List<string> a_FunFact { get; set; }
        public AnimalSanctuaryModel()
        {
            a_ProfileID = 0;
            //a_ProfileName = "";
            a_ProfileName = "";
            a_AnimalImg = new List<Byte[]>();
            a_AnimalSound = new List<Byte[]>();
            a_FunFact = new List<string>();
        }

        public void setProfileID(int profileID)
        {
            a_ProfileID = profileID;
        }
        /**********************************************************************
        * Purpose: This function fills the lists of animal properties on a given profile ID
        * Inputs: Either input the profile ID to fill the animal lists or
                if the setProfileID has already been called, call with no paramaters
        ***********************************************************************/
        public void fillAnimals(int profileID = 0)
        {
            if (profileID == 0)
            {
                profileID = a_ProfileID;
            }//a work around for setting the default profileID to a previously set profileID if the function
             //is called without any parameters.
            else
            {
                a_ProfileID = profileID;
            }
            makeProfileName();
            //Connect to the database using the connection string in the web.config file
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("SELECT * FROM GrabAnimals(" + a_ProfileID + ")" + ";");
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
                            //add all of the animal images to the a_AnimalImg list
                            a_AnimalImg.Add((Byte[])reader["Images"]);
                            a_AnimalSound.Add((Byte[])reader["Sound"]);
                            a_FunFact.Add(reader["FunFact"].ToString());
                        }
                    }//success
                    else
                    {
                        Console.WriteLine("AnimalSancuaryModel did not recieve animals from database and did not throw an exception, no changes made");
                    }//failure?
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    if (connection != null)
                    {
                        connection.Close();
                    }
                }
            }
        }

        public void displayBackground()
        {

        }

        /**********************************************************************
       * Purpose: Simply sets the a_ProfileName based on a profileID
       * should only be called in the FillAnimals() function!
       ***********************************************************************/
        public void makeProfileName()
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("SELECT ProfileName FROM GetProfile(" + a_ProfileID + ")" + ";");
                    SqlDataReader reader;

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;

                    connection.Open();
                    reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            //Grabs the Profilename
                            a_ProfileName = reader["ProfileName"].ToString();
                        }
                    }//success
                    else
                    {
                        Console.WriteLine("AnimalSancuaryModel did not recieve ProfileName from database and did not throw an exception, no changes made");
                    }//failure?
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    if (connection != null)
                    {
                        connection.Close();
                    }
                }
            }
        }
    }
}