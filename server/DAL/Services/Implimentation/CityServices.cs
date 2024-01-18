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
    public class CityServices:ICityServices
    {
        readonly SqlConnection con = new SqlConnection("Data Source=PRASHANT\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True;");        //readonly SqlConnection con = new SqlConnection("Data Source=AKASH\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True");

        public async Task<string> CreateCity(City c)
        {
            string Response=string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblcity", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Insert");
                sqlCommand.Parameters.AddWithValue("@city_id", 0);
                sqlCommand.Parameters.AddWithValue("@city_name", c.City_name);
                sqlCommand.Parameters.AddWithValue("@state_id",c.State_id);
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

        public async Task<string> DeleteCity(int Cityid)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblcity", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Delete");
                sqlCommand.Parameters.AddWithValue("@city_id", Cityid);
                sqlCommand.Parameters.AddWithValue("@city_name", "");
                sqlCommand.Parameters.AddWithValue("@state_id", "");
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

        public async Task<List<City>> GetAll()
        {
            List<City> result = new List<City>();

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblcity", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                
                sqlCommand.Parameters.AddWithValue("@city_id", 0);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method

                while (await reader.ReadAsync())
                {
                    City c = new City
                    {
                        City_id = Convert.ToInt32(reader["city_id"]),
                        State_id = Convert.ToInt32(reader["city_id"]),
                        City_name = reader["city_name"].ToString()
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

        public async Task<City> GetAllCities(int city_id)
        {
            City result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_Alltblcity", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
              
                sqlCommand.Parameters.AddWithValue("@city_id", city_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new City
                    {
                        City_id = Convert.ToInt32(reader["city_id"]),
                        State_id = Convert.ToInt32(reader["city_id"]),
                        City_name = reader["city_name"].ToString()
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

        public async Task<City> GetCitybyid(int Cityid)
        {
            City result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblcity", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
               
                sqlCommand.Parameters.AddWithValue("@city_id", Cityid);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                   result = new City
                    {
                       City_id = Convert.ToInt32(reader["city_id"]),
                       State_id = Convert.ToInt32(reader["city_id"]),
                       City_name = reader["city_name"].ToString()
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

        public async Task<string> RestoreCity(int Cityid)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblcity", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Restore");
                sqlCommand.Parameters.AddWithValue("@city_id", Cityid);
                sqlCommand.Parameters.AddWithValue("@city_name", "");
                sqlCommand.Parameters.AddWithValue("@state_id", "");
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

        public async Task<string> UpdateCity(City c)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblcity", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Update");
                sqlCommand.Parameters.AddWithValue("@city_id", c.City_id);
                sqlCommand.Parameters.AddWithValue("@city_name", c.City_name);
                sqlCommand.Parameters.AddWithValue("@state_id", c.State_id);
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
