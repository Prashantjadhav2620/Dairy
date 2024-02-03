//using DairyApp.Models;
//using iText.Kernel.Geom;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Configuration;
//using System;
//using System.Data.SqlClient;
//using System.Globalization;
//using System.IO;
//using System.util.zlib;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Net;
using System.Web;



namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentDataController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public AgentDataController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("createDeliveryAgent")]
        public IActionResult CreateDeliveryAgent2([FromForm] DeliveryAgentWithFiles deliveryAgentWithFiles)
        {
            try
            {
                //Validate file extensions
                if (!deliveryAgentWithFiles.Photo.FileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) || !deliveryAgentWithFiles.Photo.FileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase)||
                    !deliveryAgentWithFiles.Proof.FileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest("Only .jpg files are allowed for photo and proof.");
                }

                string ProofFilename = deliveryAgentWithFiles.DeliveryAgent.NAME+ deliveryAgentWithFiles.DeliveryAgent.ID + "Proof"; // Assuming PDF extension
                string PhotoFilename = deliveryAgentWithFiles.DeliveryAgent.NAME + deliveryAgentWithFiles.DeliveryAgent.ID + "Photo"; // Assuming PDF extension

                //Use a more flexible path for storing files

               string proofPath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "Proof", ProofFilename);
                string photoPath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "Photo", PhotoFilename);

                //Build the file paths

                //Ensure paths include.jpg extension
                photoPath = Path.ChangeExtension(photoPath, ".jpg");
                proofPath = Path.ChangeExtension(proofPath, ".pdf");

                //Save photo file
                using (Stream photoStream = new FileStream(photoPath, FileMode.CreateNew))
                {
                    deliveryAgentWithFiles.Photo.CopyTo(photoStream);
                }

                //Save proof file

                using (Stream proofStream = new FileStream(proofPath, FileMode.CreateNew)) // Use FileMode.Create for overwriting
                {
                    deliveryAgentWithFiles.Proof.CopyTo(proofStream);
                }

                //Now, you can use the file paths in your SQL query
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO DeliveryAgent(ID, PHOTO, NAME, ADDRESS, MobileNo, EmailId, PASSWORD, JoiningDate, Proof) VALUES(@ID, @Photo, @Name, @Address, @MobileNo, @EmailId, @Password, @JoiningDate, @Proof)", con))
                    {
                        cmd.Parameters.AddWithValue("@ID", deliveryAgentWithFiles.DeliveryAgent.ID);
                        cmd.Parameters.AddWithValue("@Photo", PhotoFilename);
                        cmd.Parameters.AddWithValue("@Name", deliveryAgentWithFiles.DeliveryAgent.NAME);
                        cmd.Parameters.AddWithValue("@Address", deliveryAgentWithFiles.DeliveryAgent.ADDRESS);
                        cmd.Parameters.AddWithValue("@MobileNo", deliveryAgentWithFiles.DeliveryAgent.MobileNo);
                        cmd.Parameters.AddWithValue("@EmailId", deliveryAgentWithFiles.DeliveryAgent.EmailId);
                        cmd.Parameters.AddWithValue("@Password", deliveryAgentWithFiles.DeliveryAgent.PASSWORD);
                        cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgentWithFiles.DeliveryAgent.JoiningDate);
                        cmd.Parameters.AddWithValue("@Proof", ProofFilename);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Data inserted");
                        }
                        else
                        {
                            return BadRequest("Error inserting data");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //Log the exception details
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }



        [HttpGet]
        [Route("getAllDeliveryAgents")]
        public IActionResult GetAllDeliveryAgents()
        {
            try
            {
                List<DeliveryAgentWithFiles> deliveryAgentsData = new List<DeliveryAgentWithFiles>();

                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();

                    string query = "SELECT * FROM DeliveryAgent";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                string photoFileName = reader["Photo"].ToString() + ".jpg";
                                string proofFileName = reader["Proof"].ToString() + ".pdf";

                                string photoPath = Path.Combine(Directory.GetCurrentDirectory(), "Photo", photoFileName);
                                string proofPath = Path.Combine(Directory.GetCurrentDirectory(), "Proof", proofFileName);

                                if (System.IO.File.Exists(photoPath) && System.IO.File.Exists(proofPath))
                                {
                                    byte[] photoBytes = System.IO.File.ReadAllBytes(photoPath);
                                    var photoFileResult = CreateFormFile(photoBytes, "image/jpeg", photoFileName);

                                    var fileContent = System.IO.File.ReadAllBytes(proofPath);
                                    var proofFileResult = CreateFormFile(fileContent, "application/pdf", proofFileName);

                                    DeliveryAgent deliveryAgent = new DeliveryAgent
                                    {
                                        ID = Convert.ToInt32(reader["ID"]),
                                        NAME = reader["NAME"].ToString(),
                                        ADDRESS = reader["ADDRESS"].ToString(),
                                        MobileNo = reader["MobileNo"].ToString(),
                                        EmailId = reader["EmailId"].ToString(),
                                        PASSWORD = reader["PASSWORD"].ToString(),
                                        JoiningDate = Convert.ToDateTime(reader["JoiningDate"]),
                                    };

                                    DeliveryAgentWithFiles deliveryAgentWithFiles = new DeliveryAgentWithFiles
                                    {
                                        Photo = photoFileResult,
                                        Proof = proofFileResult,
                                        DeliveryAgent = deliveryAgent
                                    };

                                    deliveryAgentsData.Add(deliveryAgentWithFiles);
                                }
                                else
                                {
                                    Console.WriteLine($"Files not found for delivery agent ID: {reader["ID"]}");
                                    return NotFound(); // File not found
                                }
                            }
                        }
                    }
                }

                return Ok(deliveryAgentsData);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex}");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        private IFormFile CreateFormFile(byte[] fileBytes, string contentType, string fileName)
        {
            MemoryStream memoryStream = new MemoryStream(fileBytes);
            return new FormFile(memoryStream, 0, fileBytes.Length, fileName, fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = contentType
            };
        }



        ///////////////////////////////////////////////////////////////////////////////////////////


        //GET All DATA

        [HttpGet]
        [Route("getAllDeliveryAgentsWithImages")]
        public IActionResult GetAllDeliveryAgentsWithImages()
        {
            try
            {
                
                
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT * FROM DeliveryAgent", con))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            List<DeliveryAgentWithFiles> deliveryAgentWithFiles = new List<DeliveryAgentWithFiles>();
                            // Create a list to store the retrieved delivery agents
                            List<DeliveryAgent> deliveryAgents = new List<DeliveryAgent>();

                            while (reader.Read())
                            {
                                // Assuming Photo is stored as a filename
                                string photoName = reader["Photo"].ToString()+ ".jpg";
                                string path = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "Photo", photoName);

                                if (!System.IO.File.Exists(path))
                                {
                                    // Handle the case when the file is not found
                                    return NotFound($"File not found: {photoName}");
                                }
                                else
                                {
                                    byte[] photoBytes = System.IO.File.ReadAllBytes(path);
                                    var photoFileResult = File(photoBytes, "image/jpeg", photoName);
                                    // deliveryAgentWithFiles.Add(File(fileBytes, "image/jpeg", photoName));

                                }


                                DeliveryAgent deliveryAgent = new DeliveryAgent
                                {
                                    ID = Convert.ToInt32(reader["ID"]),
                                    NAME = reader["Name"].ToString(),
                                    ADDRESS = reader["Address"].ToString(),
                                    MobileNo = reader["MobileNo"].ToString(),
                                    EmailId = reader["EmailId"].ToString(),
                                    PASSWORD = reader["PASSWORD"].ToString(),
                                    JoiningDate = Convert.ToDateTime(reader["JoiningDate"]),
                                    
                                    // Assuming Proof is stored as a filename
                                                                        // Add other properties as needed
                                };

                                deliveryAgents.Add(deliveryAgent);
                            }

                            return Ok(deliveryAgents);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        // update method
        //[HttpPut]
        //[Route("updateDeliveryAgent/{Id}")]
        //public IActionResult UpdateDeliveryAgent([FromForm] DeliveryAgentWithFiles deliveryAgentWithFiles)
        //{
        //    try
        //    {
        //        // Validate file extensions
        //        if (!deliveryAgentWithFiles.Photo.FileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase))
        //        {
        //            return BadRequest("Only .jpg files are allowed for photo.");
        //        }
        //        if (!deliveryAgentWithFiles.Proof.FileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
        //        {
        //            return BadRequest("Only .pdf files are allowed for proof.");
        //        }

        //        // Generate new filenames if necessary (considering potential overwrites)
        //        string proofFilename = deliveryAgentWithFiles.DeliveryAgent.NAME + "Proof";
        //        string photoFilename = deliveryAgentWithFiles.DeliveryAgent.NAME + "Photo";
        //        // ... (add logic to handle potential overwrites or filename conflicts)

        //        // Construct file paths
        //        string proofPath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "Proof", proofFilename);
        //        string photoPath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "Photo", photoFilename);

        //        // Save photo and proof files if they have been updated
        //        if (deliveryAgentWithFiles.Photo.Length > 0)
        //        {
        //            using (Stream photoStream = new FileStream(photoPath, FileMode.Create)) // Overwrite existing
        //            {
        //                deliveryAgentWithFiles.Photo.CopyTo(photoStream);
        //            }
        //        }
        //        if (deliveryAgentWithFiles.Proof.Length > 0)
        //        {
        //            using (Stream proofStream = new FileStream(proofPath, FileMode.Create)) // Overwrite existing
        //            {
        //                deliveryAgentWithFiles.Proof.CopyTo(proofStream);
        //            }
        //        }

        //        // Update database records
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();
        //            using (SqlCommand cmd = new SqlCommand("UPDATE DeliveryAgent SET Photo = @Photo, Name = @Name, ADDRESS = @ADDRESS, MobileNo = @MobileNo, EmailId = @EmailId, PASSWORD = @Password, JoiningDate = @JoiningDate, Proof = @Proof WHERE ID = @ID", con))
        //            {
        //                cmd.Parameters.AddWithValue("@ID", deliveryAgentWithFiles.DeliveryAgent.ID);
        //                cmd.Parameters.AddWithValue("@Photo", photoFilename); // Assuming the database column for Photo is a string (filename)
        //                cmd.Parameters.AddWithValue("@Name", deliveryAgentWithFiles.DeliveryAgent.NAME);
        //                cmd.Parameters.AddWithValue("@ADDRESS", deliveryAgentWithFiles.DeliveryAgent.ADDRESS);
        //                cmd.Parameters.AddWithValue("@MobileNo", deliveryAgentWithFiles.DeliveryAgent.MobileNo);
        //                cmd.Parameters.AddWithValue("@EmailId", deliveryAgentWithFiles.DeliveryAgent.EmailId);
        //                cmd.Parameters.AddWithValue("@Password", deliveryAgentWithFiles.DeliveryAgent.PASSWORD);
        //                cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgentWithFiles.DeliveryAgent.JoiningDate);
        //                cmd.Parameters.AddWithValue("@Proof", proofFilename); // Assuming the database column for Proof is a string (filename)

        //                cmd.ExecuteNonQuery();
        //            }
        //        }

        //        return Ok("Delivery agent updated successfully.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}

        [HttpPut]
        [Route("updateDeliveryAgent/{agentId}")]
        public IActionResult UpdateDeliveryAgent(int agentId, DeliveryAgent updatedAgent)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();

                    string updateQuery = @"UPDATE DeliveryAgent 
                                   SET  Name = @Name, 
                                        ADDRESS = @ADDRESS, 
                                        MobileNo = @MobileNo, 
                                        EmailId = @EmailId, 
                                        PASSWORD = @Password, 
                                        JoiningDate = @JoiningDate 
                                   WHERE ID = @agentId";

                    using (SqlCommand cmd = new SqlCommand(updateQuery, con))
                    {
                        cmd.Parameters.AddWithValue("@ID", agentId);
                        cmd.Parameters.AddWithValue("@Name", updatedAgent.NAME);
                        cmd.Parameters.AddWithValue("@ADDRESS", updatedAgent.ADDRESS);
                        cmd.Parameters.AddWithValue("@MobileNo", updatedAgent.MobileNo);
                        cmd.Parameters.AddWithValue("@EmailId", updatedAgent.EmailId);
                        cmd.Parameters.AddWithValue("@Password", updatedAgent.PASSWORD);
                        cmd.Parameters.AddWithValue("@JoiningDate", updatedAgent.JoiningDate);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Delivery agent updated successfully.");
                        }
                        else
                        {
                            return NotFound("Delivery agent not found with the provided ID.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }





        //Delete 
        [HttpDelete]
        [Route("deleteDeliveryAgent/{id}")]
        public IActionResult DeleteDeliveryAgent(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();

                    // Retrieve file names before executing delete operation
                    string photoName = null;
                    string proofName = null;

                    using (SqlCommand cmdSelect = new SqlCommand("SELECT Photo, Proof FROM DeliveryAgent WHERE ID = @ID", con))
                    {
                        cmdSelect.Parameters.AddWithValue("@ID", id);

                        using (SqlDataReader reader = cmdSelect.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                photoName = reader["Photo"].ToString() + ".jpg";
                                proofName = reader["Proof"].ToString() + ".pdf";
                            }
                        }
                    }

                    if (!string.IsNullOrEmpty(photoName))
                        DeleteFileInFolder("Photo", photoName);

                    if (!string.IsNullOrEmpty(proofName))
                        DeleteFileInFolder("Proof", proofName);

                    using (SqlCommand cmdDelete = new SqlCommand("DELETE FROM DeliveryAgent WHERE ID = @ID", con))
                    {
                        cmdDelete.Parameters.AddWithValue("@ID", id);

                        int rowsAffected = cmdDelete.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Data deleted");
                        }
                        else
                        {
                            return NotFound($"DeliveryAgent with ID {id} not found");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        

        private void DeleteFileInFolder(string folderName, string fileName)
        {
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), folderName); 
            string filePath = Path.Combine(folderPath, fileName);

            try
            {
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    Console.WriteLine($"Deleted: {filePath}");
                }
                else
                {
                    Console.WriteLine($"File not found: {filePath}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting {filePath}: {ex.Message}");
            }
        }
    }
}