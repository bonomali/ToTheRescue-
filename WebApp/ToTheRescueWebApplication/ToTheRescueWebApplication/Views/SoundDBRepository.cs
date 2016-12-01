using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Repositories
{
    public class SoundDBRepository : IDataEntityRepository<Sounds>
    {
        public Sounds Get(int id)
        {
            Sounds sound = new Sounds();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Sounds WHERE SoundID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
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
            List<Sounds> s = new List<Sounds>();

            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Sounds";
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Sounds sound = new Sounds();

                            sound.ID = (int)reader["SoundID"];
                            sound.SoundName = reader["SoundName"].ToString();
                            sound.Sound = (byte[])reader["Sound"];
                            sound.SoundClass = (int)reader["SoundClass"];

                            s.Add(sound);
                        }
                    }
                }
            }
            return s;
        }

        public void Save(Sounds entity)
        {
            throw new NotImplementedException();
        }
    }
}