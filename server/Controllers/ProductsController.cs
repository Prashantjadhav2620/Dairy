using DairyApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace DairyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("createproducts")]
        public IActionResult CreateProduct(Products createproducts)
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO Products(Product_Id,Product_Name, Product_Price, Product_Contity, Product_Description, Product_Type, Product_Image_URL) VALUES(@ProductId ,@ProductName, @ProductPrice, @ProductContity, @ProductDescription, @ProductType, @ProductImageURL)", con);

                // Use parameters to avoid SQL injection
                cmd.Parameters.AddWithValue("@ProductId", createproducts.Product_Id);
                cmd.Parameters.AddWithValue("@ProductName", createproducts.Product_Name);
                cmd.Parameters.AddWithValue("@ProductPrice", createproducts.Product_Price);
                cmd.Parameters.AddWithValue("@ProductContity", createproducts.Product_Contity);
                cmd.Parameters.AddWithValue("@ProductDescription", createproducts.Product_Description);
                cmd.Parameters.AddWithValue("@ProductType", createproducts.Product_Type);
                cmd.Parameters.AddWithValue("@ProductImageURL", createproducts.Product_Image_URL);

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

        [HttpPut]
        [Route("updateproduct/{productId}")]
        public IActionResult UpdateProduct(int productId, Products updatedProduct)
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE Products SET Product_Name = @ProductName, Product_Price = @ProductPrice, Product_Contity = @ProductContity, Product_Description = @ProductDescription, Product_Type = @ProductType, Product_Image_URL = @ProductImageURL WHERE Product_Id = @ProductId", con);

                // Use parameters to avoid SQL injection
                cmd.Parameters.AddWithValue("@ProductId", productId);
                cmd.Parameters.AddWithValue("@ProductName", updatedProduct.Product_Name);
                cmd.Parameters.AddWithValue("@ProductPrice", updatedProduct.Product_Price);
                cmd.Parameters.AddWithValue("@ProductContity", updatedProduct.Product_Contity);
                cmd.Parameters.AddWithValue("@ProductDescription", updatedProduct.Product_Description);
                cmd.Parameters.AddWithValue("@ProductType", updatedProduct.Product_Type);
                cmd.Parameters.AddWithValue("@ProductImageURL", updatedProduct.Product_Image_URL);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    return Ok("Data updated");
                }
                else
                {
                    return NotFound("Product not found");
                }
            }
        }

        [HttpDelete]
        [Route("deleteproduct/{productId}")]
        public IActionResult DeleteProduct(int productId)
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("DELETE FROM Products WHERE Product_Id = @ProductId", con);
                cmd.Parameters.AddWithValue("@ProductId", productId);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    return Ok("Data deleted");
                }
                else
                {
                    return NotFound("Product not found");
                }
            }
        }

        [HttpGet]
        [Route("getproduct/{productId}")]
        public IActionResult GetProductById(int productId)
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM Products WHERE Product_Id = @ProductId", con);
                cmd.Parameters.AddWithValue("@ProductId", productId);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    Products product = new Products
                    {
                        Product_Id = reader.GetInt32(0),
                        Product_Name = reader.GetString(1),
                        Product_Price = reader.GetInt32(2), // Corrected to GetInt32
                        Product_Contity = reader.GetInt32(3),
                        Product_Description = reader.GetString(4),
                        Product_Type = reader.GetString(5),
                        Product_Image_URL = reader.GetString(6)
                    };

                    return Ok(product);
                }
                else
                {
                    return NotFound("Product not found");
                }
            }
        }

        [HttpGet]
        [Route("products")]
        public IActionResult GetAllProducts()
        {
            List<Products> productList = new List<Products>();

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("Dairy")))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM Products", con);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Products product = new Products
                    {
                        Product_Id = reader.GetInt32(0),
                        Product_Name = reader.GetString(1),
                        Product_Price = reader.GetInt32(2),
                        Product_Contity = reader.GetInt32(3),
                        Product_Description = reader.GetString(4),
                        Product_Type = reader.GetString(5),
                        Product_Image_URL = reader.GetString(6)
                    };

                    productList.Add(product);
                }
            }

            if (productList.Count > 0)
            {
                return Ok(productList);
            }
            else
            {
                return NotFound("No products found");
            }
        }
    }
}
