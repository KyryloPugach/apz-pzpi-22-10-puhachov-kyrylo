namespace Bridges.Models
{
    public class Inspector
    {
        public int InspectorId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int BridgeId { get; set; }
        public Bridge Bridge { get; set; }
    }
}
