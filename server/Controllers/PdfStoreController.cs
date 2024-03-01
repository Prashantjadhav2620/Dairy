
using DairyApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;




namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfStoreController : ControllerBase
    {
        // POST method for PDF upload
        [HttpPost]
        [Route("PdfUpload")]
        public IActionResult PdfUpload([FromForm] PdfStore file)
        {
            try
            {
                // Generate a unique filename to prevent overwrites
                string filename = file.Filename + ".pdf"; // Assuming PDF extension

                // Use a more flexible path for storing files
                string path = Path.Combine(Directory.GetCurrentDirectory(),"Proof", file.Filename);

                using (Stream stream = new FileStream(path, FileMode.Create)) // Use FileMode.Create for overwriting
                {
                    file.File.CopyTo(stream);
                }

                return Ok("pass");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("DownloadPdf/{filename}")]
        public IActionResult DownloadPdf(string filename, [FromServices] IWebHostEnvironment webHostEnvironment)
        {
            try
            {
                //string Filename = filename + ".pdf";
                string Filename = filename ;

                string path = Path.Combine(webHostEnvironment.ContentRootPath, "Proof", Filename);

                if (!System.IO.File.Exists(path))
                {
                    return NotFound(); // File not found
                }

                var fileContent = System.IO.File.ReadAllBytes(path);

                return File(fileContent, "application/pdf", Filename); // Set correct MIME type for PDF
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("GetPdfContent/{filename}")]
        public IActionResult GetPdfContent(string filename, [FromServices] IWebHostEnvironment webHostEnvironment)
        {
            try
            {
                string path = Path.Combine(webHostEnvironment.ContentRootPath, "Proof", filename);

                if (!System.IO.File.Exists(path))
                {
                    return NotFound();
                }

                var fileContent = System.IO.File.ReadAllBytes(path);

                // Set the content-disposition header to specify the filename
                var contentDisposition = new ContentDispositionHeaderValue("inline")
                {
                    FileName = filename
                };
                Response.Headers.Add("Content-Disposition", contentDisposition.ToString());

                // Set the content type
                Response.ContentType = "application/pdf"; // Adjust this to the appropriate MIME type for PDF

                return File(fileContent, "application/pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


    }
}




