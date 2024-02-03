using DairyApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;

namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryAgentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DeliveryAgentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //[HttpPost]
        //[Route("createdeliveryagent1")]
        //public IActionResult CreateDeliveryAgent1(DeliveryAgent deliveryAgent)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();
        //            using (SqlCommand cmd = new SqlCommand("INSERT INTO DeliveryAgent(ID, PHOTO, NAME, ADDRESS, MobileNo, EmailId, PASSWORD, JoiningDate, Proof) VALUES(@ID, @Photo, @Name, @Address, @MobileNo, @EmailId, @Password, @JoiningDate, @Proof)", con))
        //            {
        //                cmd.Parameters.AddWithValue("@ID", deliveryAgent.ID);
        //                cmd.Parameters.AddWithValue("@Photo", deliveryAgent.Photo); // Assuming photoData is the byte array of the photo
        //                cmd.Parameters.AddWithValue("@Name", deliveryAgent.NAME);
        //                cmd.Parameters.AddWithValue("@Address", deliveryAgent.ADDRESS);
        //                cmd.Parameters.AddWithValue("@MobileNo", deliveryAgent.MobileNo);
        //                cmd.Parameters.AddWithValue("@EmailId", deliveryAgent.EmailId);
        //                cmd.Parameters.AddWithValue("@Password", deliveryAgent.PASSWORD);
        //                cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgent.JoiningDate);
        //                cmd.Parameters.AddWithValue("@Proof", deliveryAgent.Proof); // Assuming proofData is the byte array of the proof

        //                int rowsAffected = cmd.ExecuteNonQuery();

        //                if (rowsAffected > 0)
        //                {
        //                    return Ok("Data inserted");
        //                }
        //                else
        //                {
        //                    return BadRequest("Error inserting data");
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception details
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        //[HttpPost]
        //[Route("createdeliveryagent")]
        //public IActionResult CreateDeliveryAgent(DeliveryAgent deliveryAgent)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();
        //            using (SqlCommand cmd = new SqlCommand("INSERT INTO DeliveryAgent(ID,Photo, Name, Address, MobileNo, EmailId, Password, JoiningDate, Proof) VALUES(@ID,@Photo, @Name, @Address, @MobileNo, @EmailId, @Password, @JoiningDate, @Proof)", con))
        //            {
        //                cmd.Parameters.AddWithValue("@ID", deliveryAgent.ID); // Assuming Photo is the byte array of the photo
        //                cmd.Parameters.AddWithValue("@Photo", deliveryAgent.Photo); // Assuming Photo is the byte array of the photo
        //                cmd.Parameters.AddWithValue("@Name", deliveryAgent.NAME);
        //                cmd.Parameters.AddWithValue("@Address", deliveryAgent.ADDRESS);
        //                cmd.Parameters.AddWithValue("@MobileNo", deliveryAgent.MobileNo);
        //                cmd.Parameters.AddWithValue("@EmailId", deliveryAgent.EmailId);
        //                cmd.Parameters.AddWithValue("@Password", deliveryAgent.PASSWORD);
        //                cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgent.JoiningDate);
        //                cmd.Parameters.AddWithValue("@Proof", deliveryAgent.Proof); // Assuming Proof is the byte array of the proof

        //                // ExecuteScalar is used to get the generated ID after insertion
        //                int generatedId = Convert.ToInt32(cmd.ExecuteScalar());

        //                if (generatedId > 0)
        //                {
        //                    return Ok("Data inserted with ID: " + generatedId);
        //                }
        //                else
        //                {
        //                    return BadRequest("Error inserting data");
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception details
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}



        //[HttpGet]
        //public IActionResult GetAllDeliveryAgents()
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();
        //            using (SqlCommand cmd = new SqlCommand("SELECT * FROM DeliveryAgent", con))
        //            {
        //                DataTable dt = new DataTable();
        //                using (SqlDataAdapter da = new SqlDataAdapter(cmd))
        //                {
        //                    da.Fill(dt);
        //                }

        //                if (dt.Rows.Count > 0)
        //                {
        //                    // Convert DataTable to a list of DeliveryAgent objects
        //                    var deliveryAgents = new List<DeliveryAgent>();
        //                    foreach (DataRow row in dt.Rows)
        //                    {
        //                        deliveryAgents.Add(new DeliveryAgent
        //                        {
        //                            ID = Convert.ToInt32(row["Id"]),
        //                            Photo = row["Photo"].ToString(),
        //                            NAME = row["Name"].ToString(),
        //                            ADDRESS = row["Address"].ToString(),
        //                            MobileNo = row["MobileNo"].ToString(),
        //                            EmailId = row["EmailId"].ToString(),
        //                            PASSWORD = row["Password"].ToString(),
        //                            JoiningDate = Convert.ToDateTime(row["JoiningDate"]),
        //                            Proof = row["Proof"].ToString()
        //                        });
        //                    }

        //                    return Ok(deliveryAgents);
        //                }
        //                else
        //                {
        //                    return NotFound("No delivery agents found");
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception details
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}



        //[HttpPut]
        //[Route("updatedeliveryagent/{agentId}")]
        //public IActionResult UpdateDeliveryAgent(int agentId, DeliveryAgent updatedDeliveryAgent)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();
        //            SqlCommand cmd = new SqlCommand("UPDATE DeliveryAgent SET PHOTO = @Photo, NAME = @Name, ADDRESS = @Address, MobileNo = @MobileNo, EmailId = @EmailId, PASSWORD = @Password, JoiningDate = @JoiningDate, Proof = @Proof WHERE ID = @AgentId", con);

        //            // Use parameters to avoid SQL injection
        //            cmd.Parameters.AddWithValue("@AgentId", agentId);
        //            cmd.Parameters.AddWithValue("@Photo", photoData); // Store photo as byte array
        //            cmd.Parameters.AddWithValue("@Name", updatedDeliveryAgent.NAME);
        //            cmd.Parameters.AddWithValue("@Address", updatedDeliveryAgent.ADDRESS);
        //            cmd.Parameters.AddWithValue("@MobileNo", updatedDeliveryAgent.MobileNo);
        //            cmd.Parameters.AddWithValue("@EmailId", updatedDeliveryAgent.EmailId);
        //            cmd.Parameters.AddWithValue("@Password", updatedDeliveryAgent.PASSWORD);
        //            cmd.Parameters.AddWithValue("@JoiningDate", updatedDeliveryAgent.JoiningDate);
        //            cmd.Parameters.AddWithValue("@Proof", Proof);

        //            int rowsAffected = cmd.ExecuteNonQuery();

        //            if (rowsAffected > 0)
        //            {
        //                return Ok("Data updated");
        //            }
        //            else
        //            {
        //                return NotFound("Delivery agent not found");
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        //[HttpDelete]
        //[Route("deletedeliveryagent/{agentId}")]
        //public IActionResult DeleteDeliveryAgent(int agentId)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();
        //            SqlCommand cmd = new SqlCommand("DELETE FROM DeliveryAgent WHERE ID = @AgentId", con);
        //            cmd.Parameters.AddWithValue("@AgentId", agentId);

        //            int rowsAffected = cmd.ExecuteNonQuery();

        //            if (rowsAffected > 0)
        //            {
        //                return Ok("Data deleted");
        //            }
        //            else
        //            {
        //                return NotFound("Delivery agent not found");
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        //    [HttpGet]
        //    [Route("getdeliveryagent/{agentId}")]
        //    public IActionResult GetDeliveryAgentById(int agentId)
        //    {
        //        try
        //        {
        //            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //            {
        //                con.Open();
        //                SqlCommand cmd = new SqlCommand("SELECT * FROM DeliveryAgent WHERE ID = @AgentId", con);
        //                cmd.Parameters.AddWithValue("@AgentId", agentId);

        //                SqlDataReader reader = cmd.ExecuteReader();

        //                if (reader.HasRows)
        //                {
        //                    reader.Read();
        //                    DeliveryAgent deliveryAgent = new DeliveryAgent
        //                    {
        //                        ID = reader.GetInt32(0),
        //                        PHOTO = Convert.ToBase64String((byte[])reader["PHOTO"]), // Convert byte array to base64 string
        //                        NAME = reader.GetString(2),
        //                        ADDRESS = reader.GetString(3),
        //                        MobileNo = reader.GetString(4),
        //                        EmailId = reader.GetString(5),
        //                        PASSWORD = reader.GetString(6),
        //                        JoiningDate = reader.GetDateTime(7),
        //                        Proof = Convert.ToBase64String((byte[])reader["Proof"]),
        //                    };

        //                    return Ok(deliveryAgent);
        //                }
        //                else
        //                {
        //                    return NotFound("Delivery agent not found");
        //                }
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //        }
        //    }

        //    [HttpGet]
        //    [Route("alldeliveryagents")]
        //    public IActionResult GetAllDeliveryAgents()
        //    {
        //        try
        //        {
        //            List<DeliveryAgent> deliveryAgentsList = new List<DeliveryAgent>();

        //            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //            {
        //                con.Open();
        //                SqlCommand cmd = new SqlCommand("SELECT * FROM DeliveryAgent", con);

        //                SqlDataReader reader = cmd.ExecuteReader();

        //                while (reader.Read())
        //                {
        //                    DeliveryAgent deliveryAgent = new DeliveryAgent
        //                    {

        //                        ID = reader.GetInt32(0),
        //                        PHOTO = (reader.GetString(1)),
        //                        //byte[] photoData = Convert.FromBase64String(reader.GetString(1)),
        //                        // PHOTO = (byte[])reader.GetValue(1);// Convert byte array to base64 string
        //                        //PHOTO = Convert.ToBase64String((byte[])reader["PHOTO"]), // Convert byte array to base64 string
        //                        NAME = reader.GetString(2),
        //                        ADDRESS = reader.GetString(3),
        //                        MobileNo = reader.GetString(4),
        //                        EmailId = reader.GetString(5),
        //                        PASSWORD = reader.GetString(6),
        //                        JoiningDate = reader.GetDateTime(7),
        //                       // Proof = Convert.ToBase64String((byte[])reader["Proof"]),
        //                    };

        //                    deliveryAgentsList.Add(deliveryAgent);
        //                }
        //            }
        //            Console.WriteLine("deliveryAgentsList", deliveryAgentsList);
        //            if (deliveryAgentsList.Count > 0)
        //            {
        //                return Ok(deliveryAgentsList);
        //            }
        //            else
        //            {
        //                return Ok("No delivery agents found");
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //        }
        //    }
        //}

        /////*
        ////[HttpPost]
        ////[Route("createdeliveryagent")]
        ////public IActionResult CreateDeliveryAgent(DeliveryAgent deliveryAgent)
        ////{
        ////    using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        ////    {
        ////        con.Open();
        ////        SqlCommand cmd = new SqlCommand("INSERT INTO DeliveryAgent(ID, PHOTO, NAME, ADDRESS, MOBILE_NO, EMAIL_ID, PASSWORD, JOINING_DATE, Proof) VALUES(@ID, @Photo, @Name, @Address, @MobileNo, @EmailId, @Password, @JoiningDate, @Proof)", con);

        ////        // Use parameters to avoid SQL injection
        ////        cmd.Parameters.AddWithValue("@ID", deliveryAgent.ID);
        ////        cmd.Parameters.AddWithValue("@Photo", deliveryAgent.Photo);
        ////        cmd.Parameters.AddWithValue("@Name", deliveryAgent.Name);
        ////        cmd.Parameters.AddWithValue("@Address", deliveryAgent.Address);
        ////        cmd.Parameters.AddWithValue("@MobileNo", deliveryAgent.MobileNo);
        ////        cmd.Parameters.AddWithValue("@EmailId", deliveryAgent.EmailId);
        ////        cmd.Parameters.AddWithValue("@Password", deliveryAgent.Password);
        ////        cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgent.JoiningDate);
        ////        cmd.Parameters.AddWithValue("@Proof", deliveryAgent.Proof);

        ////        int rowsAffected = cmd.ExecuteNonQuery();

        ////        if (rowsAffected > 0)
        ////        {
        ////            return Ok("Delivery Agent data inserted");
        ////        }
        ////        else
        ////        {
        ////            return BadRequest("Error inserting Delivery Agent data");
        ////        }
        ////    }
        ////}
        ////*/

        ////[HttpPost]
        ////[Route("createdeliveryagent")]
        ////public IActionResult CreateDeliveryAgent([FromForm] DeliveryAgent deliveryAgentViewModel)
        ////{
        ////    try
        ////    {
        ////        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        ////        {
        ////            con.Open();

        ////            // Read the image file into a byte array
        ////            byte[] imageBytes;
        ////            using (MemoryStream memoryStream = new MemoryStream())
        ////            {
        ////                deliveryAgentViewModel.Photo.CopyTo(memoryStream);
        ////                imageBytes = memoryStream.ToArray();
        ////            }

        ////            byte[] ProofimageBytes;
        ////            using (MemoryStream memoryStream = new MemoryStream())
        ////            {
        ////                deliveryAgentViewModel.Photo.CopyTo(memoryStream);
        ////                ProofimageBytes = memoryStream.ToArray();
        ////            }

        ////            deliveryAgentViewModel.JoiningDate = DateTime.Now;

        ////            // Insert data into the database
        ////            SqlCommand cmd = new SqlCommand("INSERT INTO DeliveryAgent(ID, PHOTO, NAME, ADDRESS, MobileNo, EmailId, PASSWORD, JoiningDate, Proof) VALUES(@ID, @Photo, @Name, @Address, @MobileNo, @EmailId, @Password, @JoiningDate, @Proof)", con);

        //            // Use parameters to avoid SQL injection
        //            cmd.Parameters.AddWithValue("@ID", deliveryAgentViewModel.ID);
        //            cmd.Parameters.AddWithValue("@Photo", imageBytes);
        //            cmd.Parameters.AddWithValue("@Name", deliveryAgentViewModel.Name);
        //            cmd.Parameters.AddWithValue("@Address", deliveryAgentViewModel.Address);
        //            cmd.Parameters.AddWithValue("@MobileNo", deliveryAgentViewModel.MobileNo);
        //            cmd.Parameters.AddWithValue("@EmailId", deliveryAgentViewModel.EmailId);
        //            cmd.Parameters.AddWithValue("@Password", deliveryAgentViewModel.Password);
        //            cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgentViewModel.JoiningDate);
        //            cmd.Parameters.AddWithValue("@Proof", ProofimageBytes);

        //            int rowsAffected = cmd.ExecuteNonQuery();

        //            if (rowsAffected > 0)
        //            {
        //                return Ok("Delivery Agent data inserted");
        //            }
        //            else
        //            {
        //                return BadRequest("Error inserting Delivery Agent data");
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        ///*  Update Agent*/
        //[HttpPut]
        //[Route("updatedeliveryagent/{id}")]
        //public IActionResult UpdateDeliveryAgent(int id, DeliveryAgent deliveryAgent)
        //{
        //    using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //    {
        //        con.Open();
        //        SqlCommand cmd = new SqlCommand("UPDATE DeliveryAgent SET PHOTO = @Photo, NAME = @Name, ADDRESS = @Address, MOBILE_NO = @MobileNo, EMAIL_ID = @EmailId, PASSWORD = @Password, JOINING_DATE = @JoiningDate, Proof = @Proof WHERE ID = @ID", con);

        //        // Use parameters to avoid SQL injection
        //        cmd.Parameters.AddWithValue("@ID", id);
        //        cmd.Parameters.AddWithValue("@Photo", deliveryAgent.Photo);
        //        cmd.Parameters.AddWithValue("@Name", deliveryAgent.Name);
        //        cmd.Parameters.AddWithValue("@Address", deliveryAgent.Address);
        //        cmd.Parameters.AddWithValue("@MobileNo", deliveryAgent.MobileNo);
        //        cmd.Parameters.AddWithValue("@EmailId", deliveryAgent.EmailId);
        //        cmd.Parameters.AddWithValue("@Password", deliveryAgent.Password);
        //        cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgent.JoiningDate);
        //        cmd.Parameters.AddWithValue("@Proof", deliveryAgent.Proof);

        //        int rowsAffected = cmd.ExecuteNonQuery();

        //        if (rowsAffected > 0)
        //        {
        //            return Ok("Delivery Agent data updated");
        //        }
        //        else
        //        {
        //            return NotFound($"Delivery Agent with ID {id} not found");
        //        }
        //    }
        //}

        ///* Delete Agent*/
        //[HttpDelete]
        //[Route("deletedeliveryagent/{id}")]
        //public IActionResult DeleteDeliveryAgent(int id)
        //{
        //    using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //    {
        //        con.Open();
        //        SqlCommand cmd = new SqlCommand("DELETE FROM DeliveryAgent WHERE ID = @ID", con);

        //        // Use parameters to avoid SQL injection
        //        cmd.Parameters.AddWithValue("@ID", id);

        //        int rowsAffected = cmd.ExecuteNonQuery();

        //        if (rowsAffected > 0)
        //        {
        //            return Ok("Delivery Agent data deleted");
        //        }
        //        else
        //        {
        //            return BadRequest("Error deleting Delivery Agent data");
        //        }
        //    }
        //}

        ///* Get Agent By Id */
        //[HttpGet]
        //[Route("getdeliveryagent/{id}")]
        //public IActionResult GetDeliveryAgentById(int id)
        //{
        //    using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //    {
        //        con.Open();
        //        SqlCommand cmd = new SqlCommand("SELECT * FROM DeliveryAgent WHERE ID = @ID", con);

        //        // Use parameters to avoid SQL injection
        //        cmd.Parameters.AddWithValue("@ID", id);

        //        using (SqlDataReader reader = cmd.ExecuteReader())
        //        {
        //            if (reader.Read())
        //            {
        //                DeliveryAgent deliveryAgent = new DeliveryAgent
        //                {
        //                    ID = Convert.ToInt32(reader["ID"]),
        //                    Photo = (byte[])reader["PHOTO"],
        //                    Name = reader["NAME"].ToString(),
        //                    Address = reader["ADDRESS"].ToString(),
        //                    MobileNo = reader["MOBILE_NO"].ToString(),
        //                    EmailId = reader["EMAIL_ID"].ToString(),
        //                    Password = reader["PASSWORD"].ToString(),
        //                    JoiningDate = Convert.ToDateTime(reader["JOINING_DATE"]),
        //                    Proof = (byte[])reader["Proof"]
        //                };

        //                return Ok(deliveryAgent);
        //            }
        //            else
        //            {
        //                return NotFound("Delivery Agent not found");
        //            }
        //        }
        //    }
        //}

        ///* Get All Agent*/

        //[HttpGet]
        //[Route("getalldeliveryagents")]
        //public IActionResult GetAllDeliveryAgents()
        //{
        //    List<DeliveryAgent> deliveryAgents = new List<DeliveryAgent>();

        //    using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //    {
        //        con.Open();
        //        SqlCommand cmd = new SqlCommand("SELECT * FROM DeliveryAgent", con);

        //        using (SqlDataReader reader = cmd.ExecuteReader())
        //        {
        //            while (reader.Read())
        //            {
        //                DeliveryAgent deliveryAgent = new DeliveryAgent
        //                {
        //                    ID = Convert.ToInt32(reader["ID"]),
        //                    Photo = (byte[])reader["PHOTO"],
        //                    Name = reader["NAME"].ToString(),
        //                    Address = reader["ADDRESS"].ToString(),
        //                    MobileNo = reader["MOBILE_NO"].ToString(),
        //                    EmailId = reader["EMAIL_ID"].ToString(),
        //                    Password = reader["PASSWORD"].ToString(),
        //                    JoiningDate = Convert.ToDateTime(reader["JOINING_DATE"]),
        //                    Proof = (byte[])reader["Proof"]
        //                };

        //                deliveryAgents.Add(deliveryAgent);
        //            }
        //        }
        //    }

        //    if (deliveryAgents.Count > 0)
        //    {
        //        return Ok(deliveryAgents);
        //    }
        //    else
        //    {
        //        return NotFound("No Delivery Agents found");
        //    }
        //}


        //private readonly IConfiguration _configuration;

        //public DeliveryAgentController(IConfiguration configuration)
        //{
        //    _configuration = configuration;
        //}

        //[HttpPost]
        //[Route("createdeliveryagent")]
        //public IActionResult CreateDeliveryAgent([FromForm] DeliveryAgent deliveryAgentViewModel)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();

        //            // Read the image file into a byte array
        //            byte[] imageBytes;
        //            using (MemoryStream memoryStream = new MemoryStream())
        //            {
        //                deliveryAgentViewModel.Photo.CopyTo(memoryStream);
        //                imageBytes = memoryStream.ToArray();
        //            }

        //            byte[] proofImageBytes;
        //            using (MemoryStream memoryStream = new MemoryStream())
        //            {
        //                deliveryAgentViewModel.Proof.CopyTo(memoryStream);
        //                proofImageBytes = memoryStream.ToArray();
        //            }

        //            deliveryAgentViewModel.JoiningDate = DateTime.Now;

        //            // Insert data into the database
        //            SqlCommand cmd = new SqlCommand("INSERT INTO DeliveryAgent(ID, PHOTO, NAME, ADDRESS, MobileNo, EmailId, PASSWORD, JoiningDate, Proof) VALUES(@ID, @Photo, @Name, @Address, @MobileNo, @EmailId, @Password, @JoiningDate, @Proof)", con);

        //            // Use parameters to avoid SQL injection
        //            cmd.Parameters.AddWithValue("@ID", deliveryAgentViewModel.ID);
        //            cmd.Parameters.AddWithValue("@Photo", imageBytes);
        //            cmd.Parameters.AddWithValue("@Name", deliveryAgentViewModel.Name);
        //            cmd.Parameters.AddWithValue("@Address", deliveryAgentViewModel.Address);
        //            cmd.Parameters.AddWithValue("@MobileNo", deliveryAgentViewModel.MobileNo);
        //            cmd.Parameters.AddWithValue("@EmailId", deliveryAgentViewModel.EmailId);
        //            cmd.Parameters.AddWithValue("@Password", deliveryAgentViewModel.Password);
        //            cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgentViewModel.JoiningDate);
        //            cmd.Parameters.AddWithValue("@Proof", proofImageBytes);

        //            int rowsAffected = cmd.ExecuteNonQuery();

        //            if (rowsAffected > 0)
        //            {
        //                return Ok("Delivery Agent data inserted");
        //            }
        //            else
        //            {
        //                return BadRequest("Error inserting Delivery Agent data");
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        //[HttpPut]
        //[Route("updatedeliveryagent/{id}")]
        //public IActionResult UpdateDeliveryAgent(int id, [FromForm] DeliveryAgent deliveryAgentViewModel)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();

        //            // Read the image file into a byte array
        //            byte[] imageBytes;
        //            using (MemoryStream memoryStream = new MemoryStream())
        //            {
        //                deliveryAgentViewModel.Photo.CopyTo(memoryStream);
        //                imageBytes = memoryStream.ToArray();
        //            }

        //            byte[] proofImageBytes;
        //            using (MemoryStream memoryStream = new MemoryStream())
        //            {
        //                deliveryAgentViewModel.Proof.CopyTo(memoryStream);
        //                proofImageBytes = memoryStream.ToArray();
        //            }

        //            // Update data in the database
        //            SqlCommand cmd = new SqlCommand("UPDATE DeliveryAgent SET PHOTO = @Photo, NAME = @Name, ADDRESS = @Address, MobileNo = @MobileNo, EmailId = @EmailId, PASSWORD = @Password, JoiningDate = @JoiningDate, Proof = @Proof WHERE ID = @ID", con);

        //            // Use parameters to avoid SQL injection
        //            cmd.Parameters.AddWithValue("@ID", id);
        //            cmd.Parameters.AddWithValue("@Photo", imageBytes);
        //            cmd.Parameters.AddWithValue("@Name", deliveryAgentViewModel.Name);
        //            cmd.Parameters.AddWithValue("@Address", deliveryAgentViewModel.Address);
        //            cmd.Parameters.AddWithValue("@MobileNo", deliveryAgentViewModel.MobileNo);
        //            cmd.Parameters.AddWithValue("@EmailId", deliveryAgentViewModel.EmailId);
        //            cmd.Parameters.AddWithValue("@Password", deliveryAgentViewModel.Password);
        //            cmd.Parameters.AddWithValue("@JoiningDate", deliveryAgentViewModel.JoiningDate);
        //            cmd.Parameters.AddWithValue("@Proof", proofImageBytes);

        //            int rowsAffected = cmd.ExecuteNonQuery();

        //            if (rowsAffected > 0)
        //            {
        //                return Ok($"Delivery Agent with ID {id} updated");
        //            }
        //            else
        //            {
        //                return NotFound($"Delivery Agent with ID {id} not found");
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        //[HttpDelete]
        //[Route("deletedeliveryagent/{id}")]
        //public IActionResult DeleteDeliveryAgent(int id)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();

        //            // Delete data from the database
        //            SqlCommand cmd = new SqlCommand("DELETE FROM DeliveryAgent WHERE ID = @ID", con);

        //            // Use parameters to avoid SQL injection
        //            cmd.Parameters.AddWithValue("@ID", id);

        //            int rowsAffected = cmd.ExecuteNonQuery();

        //            if (rowsAffected > 0)
        //            {
        //                return Ok($"Delivery Agent with ID {id} deleted");
        //            }
        //            else
        //            {
        //                return NotFound($"Delivery Agent with ID {id} not found");
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        //[HttpGet]
        //[Route("getalldeliveryagents")]
        //public IActionResult GetAllDeliveryAgents()
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        //        {
        //            con.Open();

        //            SqlCommand cmd = new SqlCommand("SELECT ID, PHOTO, NAME, ADDRESS, MobileNo, EmailId, JoiningDate, Proof FROM DeliveryAgent", con);

        //            SqlDataReader reader = cmd.ExecuteReader();

        //            List<DeliveryAgent> deliveryAgents = new List<DeliveryAgent>();

        //            while (reader.Read())
        //            {
        //                DeliveryAgent deliveryAgent = new DeliveryAgent();
        //                deliveryAgent.ID = reader.GetInt32("ID");
        //                // Get photos and proofs as byte arrays (no conversion to IFormFile)
        //                deliveryAgent.Photo = Convert.ToBase64String(reader.GetString('PHOTO'));
        //                deliveryAgent.Name = reader.GetString("NAME");
        //                deliveryAgent.Address = reader.GetString("ADDRESS");
        //                deliveryAgent.MobileNo = reader.GetString("MobileNo");
        //                deliveryAgent.EmailId = reader.GetString("EmailId");
        //                deliveryAgent.JoiningDate = reader.GetDateTime("JoiningDate");
        //                deliveryAgent.Proof = reader.GetSqlBytes(7).Value;

        //                deliveryAgents.Add(deliveryAgent);
        //            }

        //            return Ok(deliveryAgents);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}


        ////[HttpGet]
        ////[Route("getalldeliveryagents")]
        ////public IActionResult GetAllDeliveryAgents()
        ////{
        ////    try
        ////    {
        ////        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        ////        {
        ////            con.Open();

        ////            // Retrieve all data from the database
        ////            SqlCommand cmd = new SqlCommand("SELECT * FROM DeliveryAgent", con);

        ////            using (SqlDataReader reader = cmd.ExecuteReader())
        ////            {
        ////                List<DeliveryAgent> deliveryAgents = new List<DeliveryAgent>();

        ////                while (reader.Read())
        ////                {
        ////                    // Map data from the database to the DeliveryAgent model
        ////                    DeliveryAgent deliveryAgent = new DeliveryAgent
        ////                    {
        ////                        ID = Convert.ToInt32(reader["ID"]),
        ////                        Name = reader["NAME"].ToString(),
        ////                        Address = reader["ADDRESS"].ToString(),
        ////                        MobileNo = reader["MobileNo"].ToString(),
        ////                        EmailId = reader["EmailId"].ToString(),
        ////                        Password = reader["PASSWORD"].ToString(),
        ////                        JoiningDate = Convert.ToDateTime(reader["JoiningDate"]),
        ////                        //PhotoBase64 = Convert.ToBase64String((byte[])reader["Photo"]),
        ////                        //ProofBase64 = Convert.ToBase64String((byte[])reader["Proof"])
        ////                    };

        ////                    deliveryAgents.Add(deliveryAgent);
        ////                }

        ////                return Ok(deliveryAgents);
        ////            }
        ////        }
        ////    }
        ////    catch (Exception ex)
        ////    {
        ////        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        ////    }
        ////}

        ////[HttpGet]
        ////[Route("getdeliveryagent/{id}")]
        ////public IActionResult GetDeliveryAgent(int id)
        ////{
        ////    try
        ////    {
        ////        using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        ////        {
        ////            con.Open();

        ////            // Retrieve data for a specific ID from the database
        ////            SqlCommand cmd = new SqlCommand("SELECT * FROM DeliveryAgent WHERE ID = @ID", con);

        ////            // Use parameters to avoid SQL injection
        ////            cmd.Parameters.AddWithValue("@ID", id);

        ////            using (SqlDataReader reader = cmd.ExecuteReader())
        ////            {
        ////                if (reader.Read())
        ////                {
        ////                    // Map data from the database to the DeliveryAgent model
        ////                    DeliveryAgent deliveryAgent = new DeliveryAgent
        ////                    {
        ////                        ID = Convert.ToInt32(reader["ID"]),
        ////                        Name = reader["NAME"].ToString(),
        ////                        Address = reader["ADDRESS"].ToString(),
        ////                        MobileNo = reader["MobileNo"].ToString(),
        ////                        EmailId = reader["EmailId"].ToString(),
        ////                        Password = reader["PASSWORD"].ToString(),
        ////                        JoiningDate = Convert.ToDateTime(reader["JoiningDate"]),
        ////                        //PhotoBase64 = Convert.ToBase64String((byte[])reader["Photo"]),
        ////                        //ProofBase64 = Convert.ToBase64String((byte[])reader["Proof"])
        ////                    };

        ////                    return Ok(deliveryAgent);
        ////                }
        ////                else
        ////                {
        ////                    return NotFound($"Delivery Agent with ID {id} not found");
        ////                }
        ////            }
        ////        }
        ////    }
        ////    catch (Exception ex)
        ////    {
        ////        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        ////    }
        ////}

    }

}
    

