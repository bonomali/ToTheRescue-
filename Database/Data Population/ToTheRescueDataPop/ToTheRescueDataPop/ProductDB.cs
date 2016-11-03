using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;

namespace ToTheRescueDataPop
{
    class ProductDB
    {
        // The directory for the images
        public static string IMAGES_PATH = "C:\\Users\\Stephanie\\Documents\\GitHub\\ToTheRescue-\\Database\\testMedia";
        public static string SOUND_PATH = "C:\\Users\\Stephanie\\Documents\\GitHub\\ToTheRescue-\\Database\\testMedia";
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
        public static void WriteImage(int ImageClass, string ImageName) 
        {
            SqlConnection connection = null;
            try
            {
                // 1. Read image from file
                string filepath = IMAGES_PATH + ImageName;
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
                    "VALUES (@ImageClass, @LoadedFromFile, @ProductImage)";

                command.Parameters.AddWithValue("@ImageClass", ImageClass);
                command.Parameters.AddWithValue("@LoadedFromFile", filepath);
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
                command.CommandText =
                    "INSERT INTO dbo.MiniGameMedia (GameID, Difficulty, GameMedia) " +
                    "VALUES (@GameID, @Difficulty, @ProductMedia)";

                command.Parameters.AddWithValue("@GameID", GameID);
                command.Parameters.AddWithValue("@Difficulty", Difficulty);
                command.Parameters.AddWithValue("@ProductMedia", productMedia);

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
        public static void WriteSound(int SoundClass, string SoundName)
        {
            SqlConnection connection = null;
            try
            {
                // 1. Read image from file
                string filepath = SOUND_PATH + SoundName;
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
                    "VALUES (@SoundClass, @LoadedFromFile, @SoundImage)";
                command.Parameters.AddWithValue("@SoundClass", SoundClass);
                command.Parameters.AddWithValue("@LoadedFromFile", filepath);
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
                   "SELECT ImageDataID FROM ImageGameData " +
                   "ORDER BY ImageDataID";

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
    }
}