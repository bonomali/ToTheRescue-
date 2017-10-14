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
    public class MiniGamesDBRepository
    {
        //get a list of playable minigames based on category and difficulty
        public List<MiniGame> GetListPlayable(int categoryID, int difficulty)
        {
            List<MiniGame> miniGames = new List<MiniGame>();

            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM MiniGames WHERE MiniGameCategoryID=@categoryID AND MinDifficulty <= @difficulty AND MaxDifficulty >= @difficulty";
                    command.Parameters.AddWithValue("@categoryID", categoryID);
                    command.Parameters.AddWithValue("@difficulty", difficulty);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            MiniGame code = new MiniGame();

                            code.ID = (int)reader["MiniGameID"];
                            code.MiniGameCategoryID = (int)reader["MiniGameCategoryID"];
                            code.MiniGamePath = reader["MiniGamePath"].ToString();
                            code.MiniGameName = reader["MiniGameName"].ToString();
                            code.MinDifficulty = (int)reader["MinDifficulty"];
                            code.MaxDifficulty = (int)reader["MaxDifficulty"];

                            miniGames.Add(code);
                        }
                    }
                }
            }
            return miniGames;
        }
        //Get list of recently played minigames
        public List<int> GetListRecentlyPlayed(int profileID)
        {
            List<int> miniGames = new List<int>();

            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT MiniGameID FROM ProfileProgressHistory WHERE ProfileID=@profileID";
                    command.Parameters.AddWithValue("@ProfileID", profileID);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            miniGames.Add((int)reader["MiniGameID"]);
                        }
                    }
                }
            }
            return miniGames;
        }
        //return a list of all minigames in the database
        public List<MiniGame> GetAllMinigames()
        {
            List<MiniGame> miniGames = new List<MiniGame>();

            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM MiniGames";
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            MiniGame code = new MiniGame();

                            code.ID = (int)reader["MiniGameID"];
                            code.MiniGameCategoryID = (int)reader["MiniGameCategoryID"];
                            code.MiniGamePath = reader["MiniGamePath"].ToString();
                            code.MiniGameName = reader["MiniGameName"].ToString();
                            code.MinDifficulty = (int)reader["MinDifficulty"];
                            code.MaxDifficulty = (int)reader["MaxDifficulty"];

                            miniGames.Add(code);
                        }
                    }
                }
            }
            return miniGames;
        }
        //add recently played minigame to list of recently played minigames
        public void UpdateRecentlyPlayedMiniGames(int profileID, int miniGameID)
        {
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("proc_UpdateProgressHistory", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@MiniGameID", miniGameID);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
        //update the reading and math performance statistics
        public void UpdatePerformanceStats(int profileID, float readingStat, float mathStat)
        {
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("proc_UpdatePerformanceStats", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@NewMathStat", mathStat);
                    cmd.Parameters.AddWithValue("@NewReadingStat", readingStat);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}