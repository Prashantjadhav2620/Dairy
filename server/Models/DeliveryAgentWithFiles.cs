// DeliveryAgentWithFiles.cs
namespace DairyApp.Models
{
    public class DeliveryAgentWithFiles
    {
        public IFormFile Photo { get; set; }
        public IFormFile Proof { get; set; }
        public DeliveryAgent DeliveryAgent { get; set; }
    }
}
