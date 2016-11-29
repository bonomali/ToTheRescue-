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
            List<string> result = new List<string>();
            List<string> expected = new List<string>();
            expected.Add("Sophia");
            expected.Add("Emma");
            expected.Add("Lily");

            using (SqlConnection connection = new SqlConnection())
            {
              connection.ConnectionString = 
              "Server=aura.cset.oit.edu;" +
              "Persist Security Info = False;" +
              "DataBase=ToTheRescue;" +
              "User Id=;" +
              "Password=;";
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
                connection.Close();
                using (SqlCommand command = new SqlCommand())
                {
                    string name = null;
                    command.Connection = connection;
                    command.CommandText = "SELECT ProfileName FROM dbo.Profiles WHERE UserID = @id";
                    command.Parameters.AddWithValue("@id", userID);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            name = (string)reader["ProfileName"];
                            result.Add(name);
                        }
                    }
                }
            }
            Assert.AreEqual(expected, result);
        }
    }
}
