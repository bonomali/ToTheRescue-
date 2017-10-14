using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;
using System.Data;

namespace ToTheRescueWebApplication.Repositories
{
    public class AnimalDBRepository
    {
        public Animal Get(int id)
        {
            Animal animal = new Animal();
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Animals WHERE AnimalID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            animal.ID = (int)reader["AnimalID"];
                            animal.FunFact = reader["FunFact"].ToString();
                            animal.ImageID = (int)reader["ImageID"];
                            animal.SoundID = (int)reader["SoundID"];
                            animal.ShinyBit = reader.GetBoolean("Shiny");
                        }
                    }
                }
            }
            return animal;
        }
        public List<Animal> GetList(int profileID)
        {
            List<Animal> animalList = new List<Animal>();
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand("GrabAnimals", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@profileID", profileID);
                    connection.Open();
                    command.ExecuteNonQuery();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Animal animal = new Animal();
                            animal.ID = (int)reader["AnimalID"];
                            animal.FunFact = reader["FunFact"].ToString();
                            animal.ImageID = (int)reader["ImageID"];
                            animal.SoundID = (int)reader["SoundID"];
                            animal.ShinyBit = (bool)reader["Shiny"];
                            animal.ActiveBit = (bool)reader["Active"];
                            animalList.Add(animal);
                        }
                    }
                }
            }
            return animalList;
        }
    }
}
      