using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Models.Play
{
    public class PlayModel
    {
        [Required]
        public string ProfileName { get; set; }

        [Required]
        public string GradeLevel { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public int CurrentMap { get; set; }

        [Required]
        public List<Nodes> MapNodes { get; set; }

        [Required]
        public int CurrentNode { get; set; }

        [Required]
        public int Animal { get; set; }

        [Required]
        public string AnimalName { get; set; }

        [Required]
        public int Avatar { get; set; }

        public string MiniGame { get; set; }

        public int MiniGameID { get; set; }
    }
}