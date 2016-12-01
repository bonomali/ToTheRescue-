using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Code
{
    public class Images : IDataEntity
    {
        public int ID { get; set; }//ImageID
        public int ImageClass { get; set; }
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
    }
}