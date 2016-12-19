using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class MiniGamesDBRepository
    {
        //get a list of playable minigames based on category and difficulty
        public List<MiniGame> GetListPlayable(int categoryID, int minDifficulty, int maxDifficulty)
        {
            List<MiniGame> miniGames = new List<MiniGame>();

            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM MiniGames WHERE MiniGameCategoryID=@categoryID AND MinDifficulty=@minDifficulty AND MaxDifficulty=@maxDifficulty";
                    command.Parameters.AddWithValue("@categoryID", categoryID);
                    command.Parameters.AddWithValue("@minDifficulty", minDifficulty);
                    command.Parameters.AddWithValue("@maxDifficulty", maxDifficulty);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            MiniGame code = new MiniGame();

                            code.ID = (int)reader["MiniGameID"];
                            code.MiniGameCategoryID = (int)reader["MiniGameCategoryID"];
                            code.MiniGameCode = reader["MiniGameCode"].ToString();
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

            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT MiniGameID FROM ProfileProgressHistory WHERE ProfileID=@profileID";
                    command.Parameters.AddWithValue("@ProfileID", profileID);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
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
        //add recently played minigame to list of recently played minigames
        public void UpdateRecentlyPlayedMiniGames(int profileID, int miniGameID)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("proc_UpdateProgressHistory  ", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@MiniGameID", miniGameID);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}