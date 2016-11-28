using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Code
{
    public static class ImportantVariables
    {
        //Add static get and sets for any information you will need for
        //the entire application
        public static int UserID { get; set; }

        public static string UserEmail { get; set; }

        public static int ProfileID { get; set; }

        public static Byte[] ProfileAvatar { get; set; }

        public static string ProfileName { get; set; }

        public static bool toggleSound { get; set; }
        public static bool toggleMusic { get; set; }
    }
}