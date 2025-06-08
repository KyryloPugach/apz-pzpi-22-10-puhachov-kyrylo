using System.Collections.Generic;

namespace Bridges.Models
{
    public class SensorType
    {
        public int SensorTypeId { get; set; }
        public string Name { get; set; }
        public string MeasurementValue { get; set; }
        public List<Sensor> Sensors { get; set; }
    }
}
