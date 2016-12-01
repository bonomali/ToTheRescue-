using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication
{
    public class ImageDBRepository
    {
        public Images Get(int id)
        {
            Images img = new Images();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Images WHERE ImageID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            img.ID = (int)reader["ImageID"];
                            img.ImageClass = (int)reader["ImageClass"];
                            img.Image = (byte[])reader["Image"];
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

            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Images WHERE ImageClass=@Class";
                    command.Parameters.AddWithValue("@Class", ImageClass);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Images img = new Images();

                            img.ID = (int)reader["ImageID"];
                            img.ImageClass = (int)reader["ImageClass"];
                            img.Image = (byte[])reader["Image"];
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
