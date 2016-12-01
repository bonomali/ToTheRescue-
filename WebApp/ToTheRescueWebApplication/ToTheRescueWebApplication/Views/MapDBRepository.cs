using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class MapDBRepository : IDataEntityRepository<Map>
    {
        public Map Get(int id)
        {
            Map map = new Map();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Maps WHERE MapID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            map.ID = (int)reader["MapID"];
                            map.MapName = reader["MapName"].ToString();
                            map.ImageID = (int)reader["ImageID"];
                            map.SoundID = (int)reader["SoundID"];
                        }
                    }
                }
            }
            return map;
        }

        public List<Map> GetList()
        {
            List<Map> maps = new List<Map>();

            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Maps";
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Map map = new Map();

                            map.ID = (int)reader["MapID"];
                            map.MapName = reader["MapName"].ToString();
                            map.ImageID = (int)reader["ImageID"];
                            map.SoundID = (int)reader["SoundID"];

                            maps.Add(map);
                        }
                    }
                }
            }
            return maps;
        }

        public void Save(Map entity)
        {
            throw new NotImplementedException();
        }
    }
}