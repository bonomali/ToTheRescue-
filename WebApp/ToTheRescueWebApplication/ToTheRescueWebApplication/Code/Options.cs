using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Code
{
    public class Options
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

        public Options()
        {

        }
        public Options(OptionsModel entity)
        {
            this.profileID = entity.profileID;
            this.profileName = String.Copy(entity.profileName);
            this.toggleSound = entity.toggleSound;
            this.toggleMusic = entity.toggleMusic;
            this.MathDifficultyLevel = entity.MathDifficultyLevel;
            this.MathPerformanceStat = entity.MathPerformanceStat;
            this.ReadingDifficultyLevel = entity.ReadingDifficultyLevel;
            this.ReadingPerformanceStat = entity.ReadingPerformanceStat;
            this.SubjectFilter = String.Copy(entity.SubjectFilter);

        }
    }
}