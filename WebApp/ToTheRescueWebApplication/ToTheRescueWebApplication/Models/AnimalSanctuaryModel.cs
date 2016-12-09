using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Models
{
    public class AnimalSanctuaryModel
    {
        [Required]
        public int ID { get; set; } //AnimalID
        [Required]
        public int ImageID { get; set; }
        [Required]
        public int SoundID { get; set; }
     
        public String FunFact { get; set; }

        public bool ShinyBit { get; set; }

        public bool ActiveBit { get; set; }      
    }
}