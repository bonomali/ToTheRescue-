using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Code
{
    public class Sounds : IDataEntity
    {
        public int ID { get; set; }//SoundID
        public int SoundClass { get; set; }
        public byte[] Sound { get; set; }
        public string SoundName { get; set; }
    }
}