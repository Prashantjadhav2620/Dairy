using DairyApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserImageController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserImageController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string  FolderName = "USERPHOTOS";

        [HttpPost]
        [Route("postUserImageByIdAsync")]
        public IActionResult PostUserImageByIdAsync([FromForm] UserImageModel userImageModel)
        {
            try 
            {
                //if (!userImageModel.FilePath.FileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) || !userImageModel.FilePath.FileName.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase) || !userImageModel.FilePath.FileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
                //{
                //    return BadRequest("Only .jpg files are allowed for photo and proof.");
                //}

                string allowedExtensions = @"\.(jpg|jpeg|png)$";
                if (!Regex.IsMatch(userImageModel.FilePath.FileName, allowedExtensions, RegexOptions.IgnoreCase))
                {
                    return BadRequest("Only .jpg, .jpeg, or .png files are allowed for photo and proof.");
                }

                string PhotoFilename = userImageModel.Name + userImageModel.Id + "Photo";

                //Use a more flexible path for storing files
                string photoPath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "USERPHOTOS", PhotoFilename);

                //Build the file paths

                //Ensure paths include.jpg extension
                photoPath = Path.ChangeExtension(photoPath, ".jpg");

                //Save photo file
                using (Stream photoStream = new FileStream(photoPath, FileMode.CreateNew))
                {
                    userImageModel.FilePath.CopyTo(photoStream);
                }

                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand("InsertUserImage", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@Id", SqlDbType.Int).Value = userImageModel.Id;

                        cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = userImageModel.Name;
                        cmd.Parameters.Add("@FilePath", SqlDbType.NVarChar).Value = photoPath;
                        cmd.Parameters.Add("@Date", SqlDbType.NVarChar).Value = DateTime.Now;
                        cmd.ExecuteNonQuery();
                    }
                }
                return Ok("Success fully add");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("getUserImageByIdAsync/{userId}")]
        public IActionResult GetUserImageByIdAsync(int userId)
        {
            try
            {
                List<UserGetImageModel> userImageModels = new List<UserGetImageModel>();

                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    connection.Open();

                    using (SqlCommand cmd = new SqlCommand("GetUserImagesById", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", userId);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                string photoFileName = reader["FilePath"].ToString() + ".jpg";
                                string name = reader["Name"].ToString();

                                if (System.IO.File.Exists(photoFileName))
                                {
                                    byte[] photoBytes = System.IO.File.ReadAllBytes(photoFileName);
                                    var photoFileResult = CreateFormFile(photoBytes, "image/jpeg");

                                    userImageModels.Add(new UserGetImageModel { Name = name, ImageData = photoBytes });
                                }
                            }
                        }
                    }
                }

                return Ok(userImageModels);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine("Error: " + ex.Message);

                // Return a more detailed error message
                return StatusCode(500, "Error retrieving user Photo: " + ex.Message);
            }
        }

        private IFormFile CreateFormFile(byte[] fileBytes, string contentType)
        {
            MemoryStream memoryStream = new MemoryStream(fileBytes);
            return new FormFile(memoryStream, 0, fileBytes.Length, "Name", "FileName")
            {
                Headers = new HeaderDictionary(),
                ContentType = contentType
            };
        }




        [HttpPut]
        [Route("updateUserImageByIdAsync/{userId}")]
        public IActionResult UpdateUserImageByIdAsync(int userId, [FromForm] UserImageModel updatedUserImage)
        {
            try
            {
                // Check if the provided file is a valid image file
                if (!updatedUserImage.FilePath.FileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) && !updatedUserImage.FilePath.FileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest("Only .jpg or .png files are allowed for the photo.");
                }

                // Construct the filename based on user information
                string photoFilename = updatedUserImage.Name + userId + "Photo";

                // Use a more flexible path for storing files
                string photoPath = Path.Combine(Directory.GetCurrentDirectory(), FolderName, photoFilename);

                // Ensure the path includes the .jpg extension
                photoPath = Path.ChangeExtension(photoPath, ".jpg");

                // Check if the file already exists
                if (System.IO.File.Exists(photoPath))
                {
                    // If the file exists, replace it with the updated one
                    using (Stream photoStream = new FileStream(photoPath, FileMode.Create))
                    {
                        updatedUserImage.FilePath.CopyTo(photoStream);
                    }

                    // Update the database record
                    using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                    {
                        connection.Open();
                        using (SqlCommand cmd = new SqlCommand("UpdateUserImage", connection))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.Add("@Id", SqlDbType.Int).Value = userId;
                            cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = updatedUserImage.Name;
                            cmd.Parameters.Add("@FilePath", SqlDbType.NVarChar).Value = photoPath;
                            cmd.Parameters.Add("@Date", SqlDbType.NVarChar).Value = DateTime.Now;

                            cmd.ExecuteNonQuery();
                        }
                    }

                    return Ok("User image updated successfully.");
                }
                else
                {
                    // If the file doesn't exist, create a new record
                    using (Stream photoStream = new FileStream(photoPath, FileMode.Create))
                    {
                        updatedUserImage.FilePath.CopyTo(photoStream);
                    }

                    // Insert a new record into the database
                    using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                    {
                        connection.Open();
                        using (SqlCommand cmd = new SqlCommand("InsertUserImage", connection))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.Add("@Id", SqlDbType.Int).Value = userId;
                            cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = updatedUserImage.Name;
                            cmd.Parameters.Add("@FilePath", SqlDbType.NVarChar).Value = photoPath;
                            cmd.Parameters.Add("@Date", SqlDbType.NVarChar).Value = DateTime.Now;

                            cmd.ExecuteNonQuery();
                        }
                    }

                    return Ok("New user image created successfully.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
