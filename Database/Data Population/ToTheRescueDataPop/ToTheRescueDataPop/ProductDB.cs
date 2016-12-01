using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Text.RegularExpressions;

namespace ToTheRescueDataPop
{
    class ProductDB
    {
        // The directory for the images
        public static string IMAGES_PATH = Path.Combine(Environment.CurrentDirectory, "..\\..\\..\\..\\testMedia\\ProfileAnimals.sql");
        public static string SOUND_PATH = Path.Combine(Environment.CurrentDirectory, "..\\..\\..\\..\\testMedia\\ProfileAnimals.sql");
        static string DB_USER_NAME = "";
        static string DB_USER_PWD = "";
        public static SqlConnection GetConnection()
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString =
                "Data Source=aura.students.cset.oit.edu" +
                ";Initial Catalog=" + DB_USER_NAME +
                ";Integrated Security=False" +
                ";User ID=" + DB_USER_NAME + ";Password=" + DB_USER_PWD;
            return connection;
        }
        public static void WriteImage(int ImageClass, string ImagePath, string ImageName) 
        {
            SqlConnection connection = null;
            try
            {
                // 1. Read image from file
                string filepath = IMAGES_PATH + ImagePath;
                if (File.Exists(filepath) == false)
                    throw new Exception("File Not Found: " + filepath);
                FileStream sourceStream = new FileStream(
                    filepath,
                    FileMode.Open,
                    FileAccess.Read);

                int streamLength = (int) sourceStream.Length;
                Byte[] productImage = new Byte[streamLength];
                sourceStream.Read(productImage, 0, streamLength);
                sourceStream.Close();

                // 2. Write image to database
                connection = GetConnection();

                SqlCommand command = new SqlCommand();
                command.Connection = connection;
                command.CommandText =
                    "INSERT INTO dbo.Images (ImageClass, ImageName, Images) " +
                    "VALUES (@ImageClass, @ImageName, @ProductImage)";

                command.Parameters.AddWithValue("@ImageClass", ImageClass);
                command.Parameters.AddWithValue("@ImageName", ImageName);
                command.Parameters.AddWithValue("@ProductImage", productImage);

                connection.Open();
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
        }
        public static void WriteMiniGameMedia(int GameID, string MediaName, int Difficulty)
        {
            SqlConnection connection = null;
            try
            {
                // 1. Read image from file
                string filepath = IMAGES_PATH + MediaName;
                if (File.Exists(filepath) == false)
                    throw new Exception("File Not Found: " + filepath);
                FileStream sourceStream = new FileStream(
                    filepath,
                    FileMode.Open,
                    FileAccess.Read);

                int streamLength = (int)sourceStream.Length;
                Byte[] productMedia = new Byte[streamLength];
                sourceStream.Read(productMedia, 0, streamLength);
                sourceStream.Close();

                // 2. Write image to database
                connection = GetConnection();

                SqlCommand command = new SqlCommand();
                command.Connection = connection;

                if (Difficulty.Equals(0))
                {
                    command.CommandText =
                    "INSERT INTO dbo.MiniGameMedia (MiniGameID, MiniGameMedia) " +
                    "VALUES (@GameID, @ProductMedia)";

                    command.Parameters.AddWithValue("@GameID", GameID);
                    command.Parameters.AddWithValue("@ProductMedia", productMedia);
                }
                else
                {
                    command.CommandText =
                        "INSERT INTO dbo.MiniGameMedia (MiniGameID, Difficulty, MiniGameMedia) " +
                        "VALUES (@GameID, @Difficulty, @ProductMedia)";

                    command.Parameters.AddWithValue("@GameID", GameID);
                    command.Parameters.AddWithValue("@ProductMedia", productMedia);
                    command.Parameters.AddWithValue("@Difficulty", Difficulty);
                }
                connection.Open();
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
        }
        public static void WriteSound(int SoundClass, string SoundPath, string SoundName)
        {
            SqlConnection connection = null;
            try
            {
                // 1. Read image from file
                string filepath = SOUND_PATH + SoundPath;
                if (File.Exists(filepath) == false)
                    throw new Exception("File Not Found: " + filepath);
                FileStream sourceStream = new FileStream(
                    filepath,
                    FileMode.Open,
                    FileAccess.Read);

                int streamLength = (int)sourceStream.Length;
                Byte[] soundImage = new Byte[streamLength];
                sourceStream.Read(soundImage, 0, streamLength);
                sourceStream.Close();

                // 2. Write image to database
                connection = GetConnection();

                SqlCommand command = new SqlCommand();
                command.Connection = connection;
                command.CommandText =
                    "INSERT INTO dbo.Sounds (SoundClass, SoundName, Sound) " +
                    "VALUES (@SoundClass, @SoundName, @SoundImage)";
                command.Parameters.AddWithValue("@SoundClass", SoundClass);
                command.Parameters.AddWithValue("@SoundName", SoundName);
                command.Parameters.AddWithValue("@SoundImage", soundImage);

                connection.Open();
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
        }
        public static List<int> GetImageIDList()
        {
            SqlConnection connection = null;
            try
            {
                connection = GetConnection();

                SqlCommand command = new SqlCommand();
                command.Connection = connection;
                command.CommandText = 
                    "SELECT ImageID FROM Images " +
                    "ORDER BY ImageID"; 

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                List<int> imageIDList = new List<int>();
                while (reader.Read())
                {
                    int imageID = (int) reader[0];
                    imageIDList.Add(imageID);
                }
                reader.Close();

                return imageIDList;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
        }
        public static List<int> GetDataImageIDList()
        {
            SqlConnection connection = null;
            try
            {
                connection = GetConnection();

                SqlCommand command = new SqlCommand();
                command.Connection = connection;
                command.CommandText =
                   "SELECT MediaID FROM MiniGameMedia " +
                   "ORDER BY MediaID";

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                List<int> dataImageIDList = new List<int>();
                while (reader.Read())
                {
                    int imageID = (int)reader[0];
                    dataImageIDList.Add(imageID);
                }
                reader.Close();

                return dataImageIDList;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
        }
        public static List<int> GetSoundIDList()
        {
            SqlConnection connection = null;
            try
            {
                connection = GetConnection();

                SqlCommand command = new SqlCommand();
                command.Connection = connection;
                command.CommandText =
                    "SELECT SoundID FROM Sounds " +
                    "ORDER BY SoundID";

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                List<int> soundIDList = new List<int>();
                while (reader.Read())
                {
                    int soundID = (int)reader[0];
                    soundIDList.Add(soundID);
                }
                reader.Close();

                return soundIDList;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
        }

        public static void WriteSQL(string path)
        {
            SqlConnection connection = null;
            try
            {
                string script = File.ReadAllText(path);

                IEnumerable<string> commandStrings = Regex.Split(script, @"^\s*GO\s*$",
                           RegexOptions.Multiline | RegexOptions.IgnoreCase);

                // 2. Write image to database
                connection = GetConnection();
                connection.Open();
                foreach (string commandString in commandStrings)
                {
                    if (commandString.Trim() != "")
                    {
                        using (var command = new SqlCommand(commandString, connection))
                        {
                            command.ExecuteNonQuery();
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
        }
    }
}