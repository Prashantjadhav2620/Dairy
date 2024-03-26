namespace DairyApp.Models
{
    public class NotificationModel
    {
        public int ID { get; set; }
        public string SenderName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public bool IsActive { get; set; }
        public int DisplayColumn { get; set; }
    }
}
