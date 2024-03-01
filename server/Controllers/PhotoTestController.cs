
using DairyApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Drawing;
using System.Net.Http.Headers;

namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoTestController : ControllerBase
    {
        [HttpPost]
        [Route("ImageUpload")]
        public IActionResult ImageUpload([FromForm] Phototest fileModel)
        {
            try
            {
                // Validate file extension
                if (!fileModel.File.FileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest("Only .jpg files are allowed.");
                }

                // Build the file path
                string path = Path.Combine(@"F:\\FOR WORK\\PRASHANT\\DairyApp\\Photo\\", fileModel.Filename);

                // Ensure path includes .jpg extension
                path = Path.ChangeExtension(path, ".jpg");

                using (Stream stream = new FileStream(path, FileMode.CreateNew))
                {
                    fileModel.File.CopyTo(stream);
                }

                return Ok("pass");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("DownloadImage/{filename}")]
        public IActionResult DownloadImage(string filename)
        {
            try
            {
                string path = Path.Combine(@"F:\\FOR WORK\\PRASHANT\\DairyApp\\Photo\\", filename);

                if (!System.IO.File.Exists(path))
                {
                    return NotFound(); // File not found
                }

                byte[] fileBytes = System.IO.File.ReadAllBytes(path);
                return File(fileBytes, "image/jpeg", filename); // Assuming the image is in JPEG format, adjust accordingly
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


    }
}
