using DairyApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Text.Json;

namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderInfoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrderInfoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //create
        [HttpPost]
        [Route("createorder")]
        public IActionResult CreateOrder([FromBody] OrderInfo orderInfo)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO OrderInfo(Order_Id, User_Id, Email_Id, Date, AddressInfo, OrderDetailsInfo, PaymentMethod) VALUES (@Order_Id, @User_Id, @Email_Id, @Date, @AddressInfo, @OrderDetailsInfo, @PaymentMethod)", con))
                    {
                        // Convert the JSON date to a System.DateTime object
                        DateTime date = JsonSerializer.Deserialize<DateTime>(orderInfo.Date);

                        // Serialize the list of order details and address into JSON
                        string orderDetailsJson = JsonSerializer.Serialize(orderInfo.OrderDetailsInfo);
                        string addressInfoJson = JsonSerializer.Serialize(orderInfo.AddressInfo);

                        cmd.Parameters.AddWithValue("@Order_Id", orderInfo.Order_Id);
                        cmd.Parameters.AddWithValue("@User_Id", orderInfo.User_Id);
                        cmd.Parameters.AddWithValue("@Email_Id", orderInfo.Email_Id);
                        cmd.Parameters.AddWithValue("@Date", date);  
                        cmd.Parameters.AddWithValue("@AddressInfo", addressInfoJson);
                        cmd.Parameters.AddWithValue("@OrderDetailsInfo", orderDetailsJson);
                        cmd.Parameters.AddWithValue("@PaymentMethod", orderInfo.PaymentMethod);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Order created successfully");
                        }
                        else
                        {
                            return BadRequest("Error creating order");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        //get All
        [HttpGet]
        [Route("getallorders")]
        public IActionResult GetAllOrders()
        {
            try
            {
                List<OrderInfo> allOrders = new List<OrderInfo>();

                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT * FROM OrderInfo", con))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                OrderInfo order = new OrderInfo
                                {
                                    Order_Id = reader["Order_Id"].ToString(),
                                    User_Id = reader["User_Id"].ToString(),
                                    Email_Id = reader["Email_Id"].ToString(),
                                    Date = Convert.ToDateTime(reader["Date"]),
                                    // Deserialize the JSON strings back to objects
                                    AddressInfo = JsonSerializer.Deserialize<AddressInfo>(reader["AddressInfo"].ToString()),
                                    OrderDetailsInfo = JsonSerializer.Deserialize<List<OrderDetailInfo>>(reader["OrderDetailsInfo"].ToString()),
                                    PaymentMethod = reader["PaymentMethod"].ToString()
                                };

                                allOrders.Add(order);
                            }
                        }
                    }
                }

                return Ok(allOrders);
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        // get Order ids
        [HttpGet]
        [Route("getOrderIds")]
        public IActionResult getOrderIds()
        {
            try
            {
                List<string> orderIds = new List<string>();

                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Order_Id FROM OrderInfo", con))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                string orderId = reader["Order_Id"].ToString();
                                orderIds.Add(orderId);
                            }
                        }
                    }
                }

                return Ok(orderIds);
            }
            catch (Exception ex)
            {
                // Log the exception details
                return null;
                //return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }



        //Update
        [HttpPut]
        [Route("updateorder/{orderId}")]
        public IActionResult UpdateOrder(string orderId, OrderInfo updatedOrderInfo)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("UPDATE OrderInfo SET User_Id = @User_Id, Email_Id = @Email_Id, Date = @Date, AddressInfo = @AddressInfo, OrderDetailsInfo = @OrderDetailsInfo, PaymentMethod = @PaymentMethod WHERE Order_Id = @Order_Id", con))
                    {
                        cmd.Parameters.AddWithValue("@User_Id", updatedOrderInfo.User_Id);
                        cmd.Parameters.AddWithValue("@Email_Id", updatedOrderInfo.Email_Id);
                        cmd.Parameters.AddWithValue("@Date", updatedOrderInfo.Date);
                        cmd.Parameters.AddWithValue("@AddressInfo", updatedOrderInfo.AddressInfo);
                        cmd.Parameters.AddWithValue("@OrderDetailsInfo", updatedOrderInfo.OrderDetailsInfo);
                        cmd.Parameters.AddWithValue("@PaymentMethod", updatedOrderInfo.PaymentMethod);
                        cmd.Parameters.AddWithValue("@Order_Id", orderId);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok($"Order with ID {orderId} updated successfully");
                        }
                        else
                        {
                            return NotFound($"Order with ID {orderId} not found");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        //Delete
        [HttpDelete]
        [Route("deleteorder/{orderId}")]
        public IActionResult DeleteOrder(string orderId)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("DELETE FROM OrderInfo WHERE Order_Id = @Order_Id", con))
                    {
                        cmd.Parameters.AddWithValue("@Order_Id", orderId);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok($"Order with ID {orderId} deleted successfully");
                        }
                        else
                        {
                            return NotFound($"Order with ID {orderId} not found");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


    }
}
