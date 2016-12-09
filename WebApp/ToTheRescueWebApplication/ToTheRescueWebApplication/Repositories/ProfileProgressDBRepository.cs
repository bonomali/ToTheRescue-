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
    public class ProfileProgressDBRepository
    {
        public ProfileProgress Get(int id)
        {
            ProfileProgress prog = new ProfileProgress();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM ProfileProgress WHERE ProfileID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
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
        //Get all nodes for a map
        public List<ProfileProgress> GetList(int profileID)
        {
            List<ProfileProgress> progress = new List<ProfileProgress>();

            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM ProfileProgress WHERE ProfileID=@ID";
                    command.Parameters.AddWithValue("@ID", profileID);
                    command.Connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            ProfileProgress prog = new ProfileProgress();

                            prog.ID = (int)reader["ProfileID"];
                            prog.CurrentMap = (int)reader["CurrentMap"];
                            prog.CurrentNode = (int)reader["CurrentNode"];
                            prog.AnimalID = (int)reader["AnimalID"];

                            progress.Add(prog);
                        }
                    }
                }
            }
            return progress;
        }
        public void UpdateCurrentNode(int profileID)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("proc_UpdateProgressNode", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void UpdateCurrentMap(int profileID, int currentMap)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "UPDATE ProfileProgress SET CurrentMap=@NewMap WHERE ProfileID=@ProfileID";
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.AddWithValue("@ProfileID", profileID);
                    cmd.Parameters.AddWithValue("@NewMap", currentMap + 1);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
    
