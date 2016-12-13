using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class MiniGamesDBRepository
    {
        public List<MiniGame> GetList(int categoryID, int minDifficulty, int maxDifficulty)
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
    }
}