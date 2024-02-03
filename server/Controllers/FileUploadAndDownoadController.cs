using DairyApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadAndDownoadController : ControllerBase
    {
        private static readonly string[] ImageExtensions = { ".png", ".jpg" };
        private static readonly string[] AllowedExtensions = { ".pdf", ".png", ".jpg" };


        [HttpPost]
        [Route("FileUpload")]
        public IActionResult FileUpload([FromForm] FileUploadAndDownoad fileModel)
        {
            try
            {
                // Check if the uploaded file has an allowed extension
                var fileExtension = Path.GetExtension(fileModel.File.FileName).ToLowerInvariant();
                if (string.IsNullOrEmpty(fileExtension) || !ImageExtensions.Contains(fileExtension))
                {
                    return BadRequest("Invalid file extension. Allowed extensions are: .png, .jpg");
                }

                if (string.IsNullOrEmpty(fileExtension) || !AllowedExtensions.Contains(fileExtension))
                {
                    return BadRequest("Invalid file extension. Allowed extensions are: .pdf, .png, .jpg");
                }

                // Perform additional actions based on the file extension
                if (fileExtension == ".jpg" || fileExtension == ".png")
                {
                    try
                    {
                        if (!fileModel.File.FileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase))
                        {
                            return BadRequest("Only .jpg files are allowed.");
                        }

                        // Build the file path
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "Photo", fileModel.Filename);

                        // Ensure path includes .jpg extension
                        path = Path.ChangeExtension(path, ".jpg");

                        using (Stream stream = new FileStream(path, FileMode.CreateNew))
                        {
                            fileModel.File.CopyTo(stream);
                        }

                        return Ok("Image uploaded successfully. ");
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, $"Internal Server Error: {ex.Message}");
                    }
                }
                else if (fileExtension == ".pdf")
                {
                    try
                    {
                        // Generate a unique filename to prevent overwrites
                        string filename = fileModel.Filename + ".pdf"; // Assuming PDF extension

                        // Use a more flexible path for storing files
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "PDF", fileModel.Filename);

                        using (Stream stream = new FileStream(path, FileMode.Create)) // Use FileMode.Create for overwriting
                        {
                            fileModel.File.CopyTo(stream);
                        }

                        return Ok("Pdf uploaded successfully.");
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, $"Internal Server Error: {ex.Message}");
                    }
                }

                return Ok("File uploaded successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
