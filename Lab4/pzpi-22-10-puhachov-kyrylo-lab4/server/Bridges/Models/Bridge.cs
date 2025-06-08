using System;
using System.Collections.Generic;

namespace Bridges.Models
{
    public class Bridge
    {
        public int BridgeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string BridgeType { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public DateTime CreationDate { get; set; }
        public List<Sensor> Sensors { get; set; }
        public List<Inspector> Inspectors { get; set; }
    }
}
