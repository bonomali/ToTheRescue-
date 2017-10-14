using System;
using System.Collections.Generic;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class MapDBRepository : IDataEntityRepository<Map>
    {
        //get a map by MapID
        public Map Get(int id)
        {
            Map map = new Map();
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Maps WHERE MapID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
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
            throw new NotImplementedException();
        }

        public void Save(Map entity)
        {
            throw new NotImplementedException();
        }
    }
}