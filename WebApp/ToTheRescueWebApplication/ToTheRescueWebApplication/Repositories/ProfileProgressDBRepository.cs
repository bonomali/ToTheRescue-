using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class ProfileProgressDBRepository
    {
        //get profile progress for a profile by profileID
        public ProfileProgress Get(int id)
        {
            ProfileProgress prog = new ProfileProgress();
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM ProfileProgress WHERE ProfileID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            prog.ID = (int)reader["ProfileID"];
                            prog.CurrentMap = (int)reader["CurrentMap"];
                            prog.CurrentNode = (int)reader["CurrentNode"];
                            prog.AnimalID = (int)reader["AnimalID"];
                        }
                    }
                }
            }
            return prog;
        }
        //update profile's current node
        public void UpdateCurrentNode(int profileID)
        {
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("proc_UpdateProgressNode", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
        //update profile's current map
        public void UpdateCurrentMap(int profileID, int currentMap, int newAnimal)
        {
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "UPDATE ProfileProgress SET CurrentMap=@NewMap, CurrentNode=@NewNode, AnimalID=@newAnimal WHERE ProfileID=@ProfileID";
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@NewMap", currentMap + 1);
                    cmd.Parameters.AddWithValue("@NewNode", 1);
                    cmd.Parameters.AddWithValue("@newAnimal", newAnimal);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
        //add rescued animalID to ProfileAnimals table for the profile, by ProfileID
        public void RescueAnimal(int profileID, int animalID)
        {
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("proc_InsertProfileAnimal", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@AnimalID", animalID);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
        //Add an entry for new profile in ProfileProgress table, assign map, current node, and an animal to rescue
        public void AddProfileProgress(int profileID, int newAnimal)
        {
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "INSERT INTO ProfileProgress(ProfileID, CurrentMap, CurrentNode, AnimalID) VALUES(@ProfileID, @NewMap, @NewNode, @newAnimal)";
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@NewMap", 1);
                    cmd.Parameters.AddWithValue("@NewNode", 1);
                    cmd.Parameters.AddWithValue("@newAnimal", newAnimal);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
    
