using System;
using System.Collections.Generic;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class SoundDBRepository : IDataEntityRepository<Sounds>
    {
        //get a sound by SoundID
        public Sounds Get(int id)
        {
            Sounds sound = new Sounds();
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Sounds WHERE SoundID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            sound.ID = (int)reader["SoundID"];
                            sound.SoundName = reader["SoundName"].ToString();
                            sound.Sound = (byte[])reader["Sound"];
                            sound.SoundClass = (int)reader["SoundClass"];
                        }
                    }
                }
            }
            return sound;
        }

        public List<Sounds> GetList()
        {
            throw new NotImplementedException();
        }

        public void Save(Sounds entity)
        {
            throw new NotImplementedException();
        }
    }
}