using System.ComponentModel.DataAnnotations;

namespace DairyApp.Models
{
    public class UserModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string EmailId { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "MobileNumber is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "MobileNumber must be 10 digits")]
        public string MobileNumber { get; set; }


    }
}
