using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections.Generic;

namespace ToTheRescueWebAppTests
{
    [TestClass]
    public class Tests
    {
        [TestMethod]
        public void GetProfilesforUser()
        {
            using (SqlConnection connection = new SqlConnection())
            {
                connection.ConnectionString = "Driver={SQL Server};" +
              "Server=Aura;" +
              "DataBase=ToTheRescue;" +
              "Uid=ToTheRescue;" +
              "Pwd=LakebertMattenie;";
                int userID = 0;
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT UserID FROM dbo.AspNetUsers WHERE Email = @email";
                    command.Parameters.AddWithValue("@email", "stephanie.vetter@oit.edu");
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userID = (int)reader["UserID"];
                        }
                    }
                }
                using (SqlCommand command = new SqlCommand())
                {
                    List<string> profiles = new List<string>();
                    string name = null;

                    command.CommandText = "SELECT ProfileName FROM dbo.Profiles WHERE UserID = @id";
                    command.Parameters.AddWithValue("@id", userID);
                    //command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            name = (string)reader["ProfileName"];
                            profiles.Add(name);
                        }
                    }
                }
            }
        }
    }
}
