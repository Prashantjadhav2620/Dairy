using DairyApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class pjController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public pjController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("postpj")]
        public IActionResult PostPj(PJPHOTO pj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("INSERT INTO PJ( Id,Photo) VALUES(@Id, @Photo)", con);
                    {
                        cmd.Parameters.AddWithValue("@Id", pj.Id);
                        cmd.Parameters.AddWithValue("@Photo", pj.Photo);

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
                Console.WriteLine($"Exception: {ex}");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("getpj")]
        public IActionResult GetPj()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("SELECT Id, Photo FROM PJ", con);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<PJPHOTO> pjList = new List<PJPHOTO>();

                    while (reader.Read())
                    {
                        PJPHOTO pj = new PJPHOTO
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Photo = reader["Photo"].ToString()
                        };

                        pjList.Add(pj);
                    }

                    return Ok(pjList);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex}");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}
