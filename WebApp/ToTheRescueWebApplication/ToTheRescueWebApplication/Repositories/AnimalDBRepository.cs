using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class AnimalDBRepository
    {
        public Animal Get(int id)
        {
            Animal animal = new Animal();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Animals WHERE AnimalID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            animal.ID = (int)reader["AnimalID"];
                            animal.FunFact = reader["FunFact"].ToString();
                            animal.ImageID = (int)reader["ImageID"];
                            animal.SoundID = (int)reader["SoundID"];
                            animal.ShinyBit = (bool)reader["Shiny"];
                        }
                    }
                }
            }
            return animal;
        }
        public List<Animal> GetList(int profileID)
        {
            List<Animal> animalList = new List<Animal>();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM GrabAnimals(@ID)";
                    command.Parameters.AddWithValue("@ID", profileID);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
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
      