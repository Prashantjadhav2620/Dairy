using System.ComponentModel.DataAnnotations;

namespace DairyApp.Models
{
    public class UpdateUserModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "New username is required")]
        [StringLength(50, ErrorMessage = "New username must be between {2} and {1} characters", MinimumLength = 3)]
        public string NewUsername { get; set; }

        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Mobile number must contain only digits")]
        public string NewMobileNumber { get; set; }
    }

}
