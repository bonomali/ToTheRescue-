using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Models.Play
{
    public class MiniGameModel
    {
        public int MiniGameID { get; set; }
        public string MiniGame { get; set; }
        public int CategoryID { get; set; }
        public int Difficulty { get; set; }
        public string ToggleMusic { get; set; }
        public string ToggleSound { get; set; }
    }
}