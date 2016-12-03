using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using ToTheRescueWebApplication.Code;

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
                    cmd = new SqlCommand("SELECT ProfileName, ToggleSound, ToggleMusic, MathDifficultyLevel, MathPerformanceStat, ReadingDifficultyLevel, ReadingPerformanceStat, SubjectFilter FROM profiles WHERE ProfileID = " + id + ";");
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

            return returnable;
        }

        public void Save(Options entity)
        {
            using (SqlConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Aura"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("proc_UpdateProfile", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProfileID", entity.profileID);
                        cmd.Parameters.AddWithValue("@ToggleSound", entity.toggleSound);
                        cmd.Parameters.AddWithValue("@ToggleMusic", entity.toggleMusic);
                        cmd.Parameters.AddWithValue("@MathPerformanceStat", entity.MathPerformanceStat);
                        cmd.Parameters.AddWithValue("@ReadingPerformanceStat", entity.ReadingPerformanceStat);
                        cmd.Parameters.AddWithValue("@SubjectFilter", entity.SubjectFilter);
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
    }
}