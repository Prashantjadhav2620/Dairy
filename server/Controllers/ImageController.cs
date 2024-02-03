


//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Hosting;
//using System;
//using System.Data.SqlClient;
//using System.Data;
//using System.IO;
//using System.Threading.Tasks;

//[Route("api/images")]
//public class ImageController : ControllerBase
//{

//    private readonly IConfiguration _configuration;

//    public ImageController(IConfiguration configuration)
//    {
//        _configuration = configuration;
//    }

//    //[HttpPost]
//    //[Route("uploadimage")]
//    //public IActionResult UploadImage([FromBody] byte[] imageData)
//    //{
//    //    try
//    //    {
//    //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
//    //        {
//    //            con.Open();
//    //            using (SqlCommand cmd = new SqlCommand("INSERT INTO Images(ImageData) VALUES (@ImageData); SELECT SCOPE_IDENTITY();", con))
//    //            {
//    //                cmd.Parameters.Add("@ImageData", SqlDbType.VarBinary).Value = imageData;

//    //                int imageId = Convert.ToInt32(cmd.ExecuteScalar());

//    //                return Ok(new { ImageId = imageId });
//    //            }
//    //        }
//    //    }
//    //    catch (Exception ex)
//    //    {
//    //        // Log the exception details
//    //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
//    //    }
//    //}

//    //[HttpGet("{id}")]
//    //[Route("getimage")]
//    //public IActionResult GetImage(int id)
//    //{
//    //    try
//    //    {
//    //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
//    //        {
//    //            con.Open();
//    //            using (SqlCommand cmd = new SqlCommand("SELECT ImageData FROM Images WHERE ImageId = @ImageId", con))
//    //            {
//    //                cmd.Parameters.AddWithValue("@ImageId", id);

//    //                using (SqlDataReader reader = cmd.ExecuteReader())
//    //                {
//    //                    if (reader.Read())
//    //                    {
//    //                        byte[] imageBytes = (byte[])reader["ImageData"];
//    //                        return File(imageBytes, "image/jpeg");
//    //                    }
//    //                    else
//    //                    {
//    //                        return NotFound();
//    //                    }
//    //                }
//    //            }
//    //        }
//    //    }
//    //    catch (Exception ex)
//    //    {
//    //        // Log the exception details
//    //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
//    //    }
//    //}

//    [HttpPost]
//    public IActionResult UploadImage()
//    {
//        try
//        {
//            var file = Request.Form.Files[0];

//            using (var stream = file.OpenReadStream())
//            using (var reader = new BinaryReader(stream))
//            {
//                byte[] imageBytes = reader.ReadBytes((int)stream.Length);

//                // Connect to database and insert image data
//                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
//                {
//                    string sql = "INSERT INTO Image (ImageData) VALUES (@ImageData)";
//                    using (SqlCommand command = new SqlCommand(sql, con))
//                    {
//                        command.Parameters.AddWithValue("@ImageData", imageBytes);
//                        con.Open();
//                        command.ExecuteNonQuery();
//                    }
//                }
//            }

//            return Ok("Image uploaded successfully");
//        }
//        catch (Exception ex)
//        {
//            return StatusCode(500, "Error uploading image: " + ex.Message);
//        }
//    }

//    [HttpGet("{imageId}")]
//    public IActionResult GetImage(int imageId)
//    {
//        try
//        {
//            // Connect to database and retrieve image data
//            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
//            {
//                string sql = "SELECT ImageData FROM Image WHERE imageId = @imageId";
//                using (SqlCommand command = new SqlCommand(sql, con))
//                {
//                    command.Parameters.AddWithValue("@imageId", imageId);
//                    con.Open();
//                    byte[] imageBytes = (byte[])command.ExecuteScalar();

//                    if (imageBytes != null)
//                    {
//                        return File(imageBytes, "image/jpeg"); // Or other appropriate content type
//                    }
//                    else
//                    {
//                        return NotFound();
//                    }
//                }
//            }
//        }
//        catch (Exception ex)
//        {
//            return StatusCode(500, "Error retrieving image: " + ex.Message);
//        }
//    }

//[HttpPost("upload")]
//public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
//{
//    try
//    {
//        if (file == null || file.Length == 0)
//            return BadRequest("File not selected");

//        var uploadsFolder = Path.Combine(_hostEnvironment.ContentRootPath, "uploads");

//        if (!Directory.Exists(uploadsFolder))
//            Directory.CreateDirectory(uploadsFolder);

//        var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
//        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

//        using (var stream = new FileStream(filePath, FileMode.Create))
//        {
//            await file.CopyToAsync(stream);
//        }

//        return Ok(new { filePath });
//    }
//    catch (Exception ex)
//    {
//        return BadRequest($"Error: {ex.Message}");
//    }
//}



//    //[HttpGet("download/{fileName}")]
//    //public IActionResult DownloadImage(string fileName)
//    //{
//    //    try
//    //    {
//    //        var filePath = Path.Combine(_hostEnvironment.ContentRootPath, "uploads", fileName);

//    //        if (!System.IO.File.Exists(filePath))
//    //            return NotFound($"File not found: {fileName}");

//    //        var fileBytes = System.IO.File.ReadAllBytes(filePath);
//    //        var contentType = "image/jpeg"; // Change the content type based on your file type

//    //        return File(fileBytes, contentType, fileName);
//    //    }
//    //    catch (Exception ex)
//    //    {
//    //        return BadRequest($"Error: {ex.Message}");
//    //    }
//    //}

//}


using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/images")]
public class ImageController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IHostEnvironment _hostEnvironment;

    public ImageController(IConfiguration configuration, IHostEnvironment hostEnvironment)
    {
        _configuration = configuration;
        _hostEnvironment = hostEnvironment;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
                return BadRequest("File not selected");

            var uploadsFolder = Path.Combine(_hostEnvironment.ContentRootPath, "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { filePath });
        }
        catch (Exception ex)
        {
            return BadRequest($"Error: {ex.Message}");
        }
    }
}

