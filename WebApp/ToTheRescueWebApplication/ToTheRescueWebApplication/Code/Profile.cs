using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Repositories
{
    public class Profile : IDataEntity
    {
        //The current profile's ID
        public int ID { get; set; }

        //Holds the name of a profile
        public string ProfileName { get; set; }

        //The current Avatar's ID
        public int AvatarID { get; set; }

        public Byte[] Avatar { get; set; }
    }
}