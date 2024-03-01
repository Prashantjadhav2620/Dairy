using System.ComponentModel.DataAnnotations;

namespace DairyApp.Models
{
    public class UserLoginModel
    {
        [Required(ErrorMessage = "EmailId is required")]
        public string EmailId { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
