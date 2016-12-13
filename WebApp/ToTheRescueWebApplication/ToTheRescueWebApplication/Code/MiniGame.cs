using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Code
{
    public class MiniGame : IDataEntity
    {
        public int ID { get; set; } //minigame id
        public int MiniGameCategoryID { get; set; }
        public string MiniGameCode { get; set; }
        public string MiniGameName { get; set; }
        public int MinDifficulty { get; set; }
        public int MaxDifficulty { get; set; }
    }
}