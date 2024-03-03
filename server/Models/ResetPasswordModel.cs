using System.ComponentModel.DataAnnotations;

namespace DairyApp.Models
{
    public class ResetPasswordModel
    {

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string EmailId { get; set; }


        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
