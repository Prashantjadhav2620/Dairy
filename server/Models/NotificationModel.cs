namespace DairyApp.Models
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public string SenderName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
        public bool IsActive { get; set; }
        public int DisplayColumn { get; set; }
    }
}
