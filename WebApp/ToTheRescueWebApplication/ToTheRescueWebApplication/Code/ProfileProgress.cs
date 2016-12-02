using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Code
{
    public class ProfileProgress : IDataEntity
    {
        public int ID { get; set; }//profile progress ID

        public int CurrentMap { get; set; }

        public int CurrentNode { get; set; }

        public int AnimalID { get; set; }
    }
}