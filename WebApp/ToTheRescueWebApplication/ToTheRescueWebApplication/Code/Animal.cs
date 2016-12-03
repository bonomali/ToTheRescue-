using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Code
{
    public class Animal : IDataEntity
    {
        public int ID { get; set; } //AnimalID
        public int ImageID { get; set; }
        public int SoundID { get; set; }
        public String FunFact { get; set; }
        public bool ShinyBit { get; set; }
        public bool ActiveBit { get; set; }
    }
}