using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Models.Profiles
{
    public class ProfileModel
    {
        //profileID
        public int ID { get; set; }

        //Holds the name of the profile to add to a user account
        public string ProfileName { get; set; }

        //The current Avatar's ID
        public int AvatarID { get; set; }

        public Byte[] Avatar { get; set; }
    }
}