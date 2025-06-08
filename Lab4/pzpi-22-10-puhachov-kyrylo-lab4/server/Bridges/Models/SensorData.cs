using System;

namespace Bridges.Models
{
    public class SensorData
    {
        public int SensorDataId { get; set; }
        public DateTime Date { get; set; }
        public string Value { get; set; }
        public int SensorId { get; set; }
        public Sensor Sensor { get; set; }
    }
}
