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
        //[Required]
       // public string Profile Name { get; set; }

        [Required]
        public string GradeLevel { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public List<Nodes> MapNodes { get; set; }

        //[Required]
        //public Animal animal { get; set; }

    }
}