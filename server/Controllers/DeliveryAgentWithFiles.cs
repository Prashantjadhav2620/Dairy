namespace DairyApp.Controllers
{
    public class DeliveryAgentWithFiles
    {
        public IFormFile Photo { get; set; }
        public IFormFile Proof { get; set; }
        public DeliveryAgent DeliveryAgent { get; set; }
        
    }

    public class DeliveryAgent
    {
        public int ID { get; set; }
        public string NAME { get; set; }
        public string ADDRESS { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string PASSWORD { get; set; }
        public DateTime JoiningDate { get; set; }
    }
}
