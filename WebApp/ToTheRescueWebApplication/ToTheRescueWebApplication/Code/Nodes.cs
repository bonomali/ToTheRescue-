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
        public double XCoordinate { get; set; }
        public double YCoordinate { get; set; }
    }
}