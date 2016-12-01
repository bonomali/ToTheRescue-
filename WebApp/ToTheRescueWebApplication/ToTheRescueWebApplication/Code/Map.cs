using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Code
{
    public class Map : IDataEntity
    {
        public int ID { get; set; }
        public string MapName { get; set; }
        public int ImageID { get; set; }
        public int SoundID { get; set; }
    }
}