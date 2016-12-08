using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Repositories
{
    public class OptionsDBRepository
    {
        
        public Options Get(int id)
        {
            Options returnable = new Options();
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                SqlCommand cmd = null;

                try
                {
                    cmd = new SqlCommand("SELECT ProfileName, ToggleSound, ToggleMusic, MathDifficultyLevel, MathPerformanceStat, ReadingDifficultyLevel, ReadingPerformanceStat, SubjectFilter, AvatarID FROM profiles WHERE ProfileID = " + id + ";");
                    SqlDataReader reader;

                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;

                    connection.Open();
                    reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        returnable.profileID = id;
                        returnable.profileName = reader["ProfileName"].ToString();
                        returnable.toggleSound = (bool)reader["ToggleSound"];
                        returnable.toggleMusic = (bool)reader["ToggleMusic"];
                        returnable.MathDifficultyLevel = (int)reader["MathDifficultyLevel"];
                        returnable.MathPerformanceStat = (float)reader.GetDouble(4);
                        returnable.ReadingDifficultyLevel = (int)reader["ReadingDifficultyLevel"];
                        returnable.ReadingPerformanceStat = (float)reader.GetDouble(6);
                        returnable.SubjectFilter = reader["SubjectFilter"].ToString();
                        returnable.AvatarID = (int)reader["AvatarID"];
                    }
                    reader.Close();
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

            return returnable;
        }

        public void Save(Options entity)
        {
            UpdateToggleSound(entity);
            UpdateToggleMusic(entity);
            UpdateDifficulty(entity);
            UpdateFilter(entity);
        }

        public void UpdateToggleSound(Options entity)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateToggleSound", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", entity.profileID);
                        cmd.Parameters.AddWithValue("@SoundBit", entity.toggleSound);
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

        public void UpdateToggleMusic(Options entity)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateToggleMusic", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", entity.profileID);
                        cmd.Parameters.AddWithValue("@MusicBit", entity.toggleMusic);
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

        public void UpdateDifficulty(Options entity)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateDifficulty", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", entity.profileID);
                        cmd.Parameters.AddWithValue("@NewMathDifficulty", entity.MathDifficultyLevel);
                        cmd.Parameters.AddWithValue("@NewReadingDifficulty", entity.ReadingDifficultyLevel);
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

        public void UpdateFilter(Options entity)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateSubjectFilter", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (entity.SubjectFilter == null)   
                        {
                            entity.SubjectFilter = "";
                        }
                        cmd.Parameters.AddWithValue("@ProfileID", entity.profileID);
                        cmd.Parameters.AddWithValue("@Filter", entity.SubjectFilter);
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