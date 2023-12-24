using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using DAL.Services.Interface;
namespace DAL.Services.Implimentation
{
    public class ProductServices:IProductServices
    {
        readonly SqlConnection con = new SqlConnection("Data Source=AKASH\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True");

        public async Task<string> CreateProduct(Product s)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblProducts", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Insert");
                sqlCommand.Parameters.AddWithValue("@product_id", 0);
                sqlCommand.Parameters.AddWithValue("@product_name", s.Product_name);
                sqlCommand.Parameters.AddWithValue("@state_id", s.state_id);
                sqlCommand.Parameters.AddWithValue("@product_image", s.product_image);
                con.Open();
                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.Read() != null)
                {
                    Response = "Success";
                }
                else
                {
                    Response = "Error Data not Stored";
                }
            }
            catch (Exception ex)
            {
                Response = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return Response;
        }

        public async Task<string> DeleteProduct(int Product_id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblProducts", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Delete");
                sqlCommand.Parameters.AddWithValue("@product_id", Product_id);
                sqlCommand.Parameters.AddWithValue("@product_name", "");
                sqlCommand.Parameters.AddWithValue("@state_id", 0);
                sqlCommand.Parameters.AddWithValue("@product_image", "");
                con.Open();
                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.Read() != null)
                {
                    Response = "Success";
                }
                else
                {
                    Response = "Error Data not Stored";
                }
            }
            catch (Exception ex)
            {
                Response = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return Response;
        }

        public async Task<List<Product>> GetProduct()
        {
            List<Product> result = new List<Product>();

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblProducts", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@product_id", 0);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method

                while (await reader.ReadAsync())
                {
                    Product c = new Product
                    {

                        Product_id = Convert.ToInt32(reader["product_id"]),
                        Product_name = reader["product_name"].ToString(),
                        state_id = Convert.ToInt32(reader["state_id"]),
                        state_name = reader["state_name"].ToString(),
                        product_image = reader["product_image"].ToString()
                    };

                    result.Add(c);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }

            return result;
        }

        public async Task<Product> GetAllProductById(int Product_id)
        {
            Product result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_AlltblProducts", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@product_id", Product_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new Product
                    {
                        Product_id = Convert.ToInt32(reader["product_id"]),
                        Product_name = reader["product_name"].ToString(),
                        state_id = Convert.ToInt32(reader["state_id"]),
                        product_image = reader["product_image"].ToString()
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }

            return result;
        }





        public async Task<Product> GetProductById(int Product_id)
        {
            Product result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblProducts", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
               
                sqlCommand.Parameters.AddWithValue("@product_id", Product_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new Product
                    {
                        Product_id = Convert.ToInt32(reader["product_id"]),
                        Product_name = reader["product_name"].ToString(),
                        state_id = Convert.ToInt32(reader["state_id"]),
                        state_name=reader["state_name"].ToString(),
                        product_image = reader["product_image"].ToString()
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }

            return result;
        }

        public async Task<string> RestoreProduct(int Product_id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblProducts", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Restore");
                sqlCommand.Parameters.AddWithValue("@product_id", Product_id);
                sqlCommand.Parameters.AddWithValue("@product_name", "");
                sqlCommand.Parameters.AddWithValue("@state_id", 0);
                sqlCommand.Parameters.AddWithValue("@product_image", "");
                con.Open();
                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.Read() != null)
                {
                    Response = "Success";
                }
                else
                {
                    Response = "Error Data not Stored";
                }
            }
            catch (Exception ex)
            {
                Response = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return Response;
        }

        public async Task<string> UpdateProduct(Product s)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblProducts", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Update");
                sqlCommand.Parameters.AddWithValue("@product_id", s.Product_id);
                sqlCommand.Parameters.AddWithValue("@product_name", s.Product_name);
                sqlCommand.Parameters.AddWithValue("@state_id", s.state_id);
                sqlCommand.Parameters.AddWithValue("@product_image", s.product_image);
                con.Open();
                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.Read() != null)
                {
                    Response = "Success";
                }
                else
                {
                    Response = "Error Data not Stored";
                }
            }
            catch (Exception ex)
            {
                Response = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return Response;
        }
    }
}
