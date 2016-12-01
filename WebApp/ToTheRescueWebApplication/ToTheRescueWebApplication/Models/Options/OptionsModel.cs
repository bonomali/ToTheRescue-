using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Models
{
    public class OptionsModel
    {
        public int profileID { get; set; }
        public string profileName { get; set; }
        public bool toggleSound { get; set; }
        public bool toggleMusic { get; set; }
        public int MathDifficultyLevel { get; set; }
        public float MathPerformanceStat { get; set; }
        public int ReadingDifficultyLevel { get; set; }
        public float ReadingPerformanceStat { get; set; }
        public string SubjectFilter { get; set; }

        public OptionsModel()
        {
            RetrieveCurrentProfileOptions(ImportantVariables.ProfileID);
        }

        [Authorize]
        public void RetrieveCurrentProfileOptions(int ProfileID)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("SELECT ProfileName, ToggleSound, ToggleMusic, MathDifficultyLevel, MathPerformanceStat, ReadingDifficultyLevel, ReadingPerformanceStat, SubjectFilter FROM profiles WHERE ProfileID = " + ProfileID + ";");
                    SqlDataReader reader;

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;

                    connection.Open();
                    reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        profileID = ProfileID;
                        profileName = reader["ProfileName"].ToString();
                        toggleSound = (bool)reader["ToggleSound"];
                        toggleMusic = (bool)reader["ToggleMusic"];
                        MathDifficultyLevel = (int)reader["MathDifficultyLevel"];
                        MathPerformanceStat = (float)reader.GetDouble(4);
                        ReadingDifficultyLevel = (int)reader["ReadingDifficultyLevel"];
                        ReadingPerformanceStat = (float)reader.GetDouble(6);
                        SubjectFilter = reader["SubjectFilter"].ToString();
                    }
                    reader.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                    throw e;
                }
                finally
                {
                    if (connection != null)
                        connection.Close();
                }
            }
        }

        [Authorize]
        public void UpdateToggleSound()
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateToggleSound", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", profileID);
                        cmd.Parameters.AddWithValue("@SoundBit", toggleSound);
                        connection.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    if (connection != null)
                        connection.Close();
                }
            }
        }

        [Authorize]
        public void UpdateToggleMusic()
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateToggleMusic", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", profileID);
                        cmd.Parameters.AddWithValue("@MusicBit", toggleMusic);
                        connection.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    if (connection != null)
                        connection.Close();
                }
            }
        }

        [Authorize]
        public void UpdateDifficulty()
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateDifficulty", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", profileID);
                        cmd.Parameters.AddWithValue("@NewMathDifficulty", MathDifficultyLevel);
                        cmd.Parameters.AddWithValue("@NewReadingDifficulty", ReadingDifficultyLevel);
                        connection.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    if (connection != null)
                        connection.Close();
                }
            }
        }

        [Authorize]
        public void UpdateFilter()
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateSubjectFilter", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", profileID);
                        cmd.Parameters.AddWithValue("@Filter", SubjectFilter);
                        connection.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    if (connection != null)
                        connection.Close();
                }
            }
        }

    }

}