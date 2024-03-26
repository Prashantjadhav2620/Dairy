using DairyApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public NotificationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private int GetIdFromNotification()
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
            {
                connection.Open();

                // Query to get the maximum Id from the Notification table
                string query = "SELECT ISNULL(MAX(Id), 0) FROM Notification WITH (NOLOCK)";

                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    // Execute the query and retrieve the result
                    int id = Convert.ToInt32(cmd.ExecuteScalar());

                    // Return either 1 or id + 1 based on the result
                    return (id == 0) ? 1 : (id + 1);
                }
            }
        }

        [HttpPost]
        public IActionResult CreateNotification([FromBody] NotificationModel notification)
        {
            try
            {
                // int id = GetIdFromNotification();
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    connection.Open();

                    // Create and configure the SqlCommand for the stored procedure
                    using (SqlCommand cmd = new SqlCommand("NotificationMethods", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@type", 1);
                        cmd.Parameters.AddWithValue("@SenderName", notification.SenderName);
                        cmd.Parameters.AddWithValue("@Email", notification.Email);
                        cmd.Parameters.AddWithValue("@Mobile", notification.Mobile);
                        cmd.Parameters.AddWithValue("@Subject", notification.Subject);
                        cmd.Parameters.AddWithValue("@Message", notification.Message); 
                        cmd.Parameters.AddWithValue("@IsActive", true);
                        cmd.ExecuteNonQuery();
                    }

                }
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error creating notification: " + ex.Message);
            }

            return Ok("Notification created successfully");
        }

        [HttpGet]
        public IActionResult GetAllNotifications()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand("GetAllNotifications", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            List<NotificationModel> notifications = new List<NotificationModel>();

                            while (reader.Read())
                            {
                                NotificationModel notification = new NotificationModel
                                {
                                    ID = Convert.ToInt32(reader["ID"]),
                                    SenderName = reader["SenderName"].ToString(),
                                    Email = reader["Email"].ToString(),
                                    Mobile = reader["Mobile"].ToString(),
                                    Subject = reader["Subject"].ToString(),
                                    Message = reader["Message"].ToString(),
                                    IsActive = Convert.ToBoolean(reader["IsActive"])
                                };

                                notifications.Add(notification);
                            }

                            return Ok(notifications);
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error retrieving notifications: " + ex.Message);
            }
        }


        [HttpPut]
        public IActionResult UpdateNotificationIsActive(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    connection.Open();

                    using (SqlCommand cmd = new SqlCommand("UpdateNotificationIsActive", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@ID", SqlDbType.Int).Value = id;
                        cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = false;

                        cmd.ExecuteNonQuery();
                    }
                }

                return Ok("Notification updated successfully");
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error updating notification: " + ex.Message);
            }
        }

    }
}
