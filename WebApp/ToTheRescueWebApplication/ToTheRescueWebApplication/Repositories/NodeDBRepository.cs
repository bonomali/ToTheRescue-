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
    //get a single node by NodeID
    public class NodeDBRepository
    {
        public Nodes Get(int id)
        {
            Nodes node = new Nodes();
            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Nodes WHERE NodeID=@ID";
                    command.Parameters.AddWithValue("@ID", id);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            node.ID = (int)reader["NodeID"];
                            node.MapID = (int)reader["MapID"];
                            node.XCoordinate = (float)reader["XCoordinate"];
                            node.YCoordinate = (float)reader["YCoordinate"];
                        }
                    }
                }
            }
            return node;
        }
        //Get all nodes for a map
        public List<Nodes> GetList(int mapID)
        {
            List<Nodes> n = new List<Nodes>();

            using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Nodes WHERE MapID=@ID";
                    command.Parameters.AddWithValue("@ID", mapID);
                    command.Connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Nodes node = new Nodes();

                            node.ID = (int)reader["NodeID"];
                            node.MapID = (int)reader["MapID"];
                            node.XCoordinate = (double)reader["XCoordinate"];
                            node.YCoordinate = (double)reader["YCoordinate"];

                            n.Add(node);
                        }
                    }
                }
            }
            return n;
        }
    }
}