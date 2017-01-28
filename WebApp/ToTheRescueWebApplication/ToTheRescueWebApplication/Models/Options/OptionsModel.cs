using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Required]
        public bool toggleSound { get; set; }
        [Required]
        public bool toggleMusic { get; set; }
        [Required]
        public int MathDifficultyLevel { get; set; }
        [Required]
        public float MathPerformanceStat { get; set; }
        [Required]
        public int ReadingDifficultyLevel { get; set; }
        [Required]
        public float ReadingPerformanceStat { get; set; }
        public string SubjectFilter { get; set; }
        public OptionsModel()
        {

        }

        public OptionsModel(Options options) {
            this.profileID = options.profileID;
            this.profileName = String.Copy(options.profileName);
            this.toggleSound = options.toggleSound;
            this.toggleMusic = options.toggleMusic;
            this.MathDifficultyLevel = options.MathDifficultyLevel;
            this.MathPerformanceStat = options.MathPerformanceStat;
            this.ReadingDifficultyLevel = options.ReadingDifficultyLevel;
            this.ReadingPerformanceStat = options.ReadingPerformanceStat;
            this.SubjectFilter = String.Copy(options.SubjectFilter);

        }

    }

}