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

    public class UserLoginResponse
    {
        public UserResponse User { get; set; }
        public TokenResponse TokenResponse { get; set; }
        public string OperationType { get; set; }

    }

    public class UserResponse
    {
        public string Uid { get; set; } 
        public string Email { get; set; }
        public bool EmailVerified { get; set; }
        public bool isAnonymous { get; set; }
        // Add other user-related properties as needed
    }

    public class TokenResponse
    {
        public string IdToken { get; set; }
        public string RefreshToken { get; set; }
        public string AccessToken { get; set; }
        public long ExpiresIn { get; set; }
    }

}
