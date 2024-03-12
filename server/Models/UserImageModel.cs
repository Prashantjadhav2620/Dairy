using System.ComponentModel.DataAnnotations;

namespace DairyApp.Models
{
    public class UserImageModel
    {
        public string Id { get; set; }
        public string Name { get; set; }

        [Required]
        public IFormFile FilePath { get; set; }

        // Corrected property type: DateTime
        public DateTime Date { get; set; }
    }

    public class UserGetImageModel
    {
        public string Name { get; set; }
        public byte[] ImageData { get; set; }
    }


}
