using System;
using System.Collections.Generic;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication
{
    public class ImageDBRepository
    {
        //get an image by ImageID
        public Images Get(int id)
        {
            Images img = new Images();
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Images WHERE ImageID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            img.ID = (int)reader["ImageID"];
                            img.ImageClass = (int)reader["ImageClass"];
                            img.Image = (byte[])reader["Images"];
                            img.ImageName = reader["ImageName"].ToString();
                        }
                    }
                }
            }
            return img;
        }
        //Get all images in an Image Class
        public List<Images> GetList(int ImageClass)
        {
            List<Images> images = new List<Images>();

            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Images WHERE ImageClass=@Class";
                    command.Parameters.AddWithValue("@Class", ImageClass);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Images img = new Images();

                            img.ID = (int)reader["ImageID"];
                            img.ImageClass = (int)reader["ImageClass"];
                            img.Image = (byte[])reader["Images"];
                            img.ImageName = reader["ImageName"].ToString();

                            images.Add(img);
                        }
                    }
                }
            }
            return images;
        }
    }
}
