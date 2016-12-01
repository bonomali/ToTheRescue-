using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToTheRescueWebApplication.Code
{
    public class Nodes : IDataEntity
    {
        public int ID { get; set; }//NodeID
        public int MapID { get; set; }
        public int XCoordinate { get; set; }
        public int YCoordinate { get; set; }
    }
}