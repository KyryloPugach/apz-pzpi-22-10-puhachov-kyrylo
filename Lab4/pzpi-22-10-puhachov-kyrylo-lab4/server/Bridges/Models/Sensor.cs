using System;
using System.Collections.Generic;

namespace Bridges.Models
{
    public class Sensor
    {
        public int SensorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime InstallationDate { get; set; }
        public int BridgeId { get; set; }
        public Bridge Bridge { get; set; }
        public int SensorTypeId { get; set; }
        public SensorType SensorType { get; set; }
        public List<SensorData> SensorDatas { get; set; }
    }
}
