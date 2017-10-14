using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MySql.Data.MySqlClient;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace ToTheRescueWebAppTests
{
    [TestClass]
    public class LoginControllerTests
    {
        /*Test that the correct profiles are retrieved from the database when a user logs
         into the web application. This test checks that the added UserID row to the Entity
         Framework generated table correctly corresponds to the Profiles table 
         (correct PK-FK relationship). The expected profiles for a UserID are stored in a List 
         and the result profiles are queried from the database. Both lists are ordered before
         comparision.*/
        [TestMethod]
        public void GetProfilesforUser()
        {
            List<string> temp = new List<string>(); //put in temp array to sort
            temp.Add("Sophia");

            List<string> result = new List<string>();
            List<string> expected = temp.OrderBy(n => n).ToList();
            temp.Clear();   //clear list

            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                int userID = 0;
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT UserID FROM dbo.AspNetUsers WHERE Email = @email";
                    command.Parameters.AddWithValue("@email", "stephanie.vetter@oit.edu");
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userID = (int)reader["UserID"];
                        }
                    }
                }
                connection.Close();

                using (MySqlCommand command = new MySqlCommand())
                {
                    string name = null;
                    command.Connection = connection;
                    command.CommandText = "SELECT ProfileName FROM dbo.Profiles WHERE UserID = @id";
                    command.Parameters.AddWithValue("@id", userID);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            name = (string)reader["ProfileName"];
                            temp.Add(name);
                            result = temp.OrderBy(n => n).ToList();
                        }
                    }
                }
            }

            CollectionAssert.AreEqual(expected, result);
        }
    }
}
