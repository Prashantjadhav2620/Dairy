
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
        // POST method for image upload
        //[HttpPost]
        //[Route("ImageUpload")]
        //public IActionResult ImageUpload([FromForm] Phototest fileModel)
        //{
        //    try
        //    {
        //        //string homeDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        //        //string newPath = homeDirectory + "\\DairyApp\\Photo\\";
        //        //string path = Path.Combine(newPath, fileModel.Filename);

        //        string path = Path.Combine(@"F:\\FOR WORK\\PRASHANT\\DairyApp\\Photo\\", fileModel.Filename);


        //        using (Stream stream = new FileStream(path, FileMode.CreateNew))
        //        {
        //            fileModel.File.CopyTo(stream);
        //        }

        //        return Ok("pass");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

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

        //[HttpGet]
        //[Route("DownloadImage/{filename}")]
        //public IActionResult DownloadImage(string filename)
        //{
        //    try
        //    {
        //        string path = Path.Combine(@"F:\\FOR WORK\\PRASHANT\\DairyApp\\Photo\\", filename);

        //        if (!System.IO.File.Exists(path))
        //        {
        //            return NotFound(); // File not found
        //        }

        //        byte[] fileBytes = System.IO.File.ReadAllBytes(path);

        //        // Determine the content type based on the file extension
        //        string contentType = GetContentType(filename);

        //        // Set response headers
        //        var contentDisposition = new ContentDispositionHeaderValue("inline")
        //        {
        //            FileName = filename
        //        };
        //        Response.Headers.Add("Content-Disposition", contentDisposition.ToString());
        //        Response.Headers.Add("Content-Type", contentType);

        //        return File(fileBytes, contentType);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        //// Helper method to get content type based on file extension
        //private string GetContentType(string fileName)
        //{
        //    string extension = Path.GetExtension(fileName).ToLowerInvariant();
        //    switch (extension)
        //    {
        //        case ".jpg":
        //        case ".jpeg":
        //            return "image/jpeg";
        //        case ".png":
        //            return "image/png";
        //        case ".gif":
        //            return "image/gif";
        //        // Add more cases for other image formats if necessary
        //        default:
        //            return "application/octet-stream"; // Default content type for unknown file types
        //    }
        //}

    }
}
