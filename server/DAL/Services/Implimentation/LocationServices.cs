using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Services.Interface;
using DAL.Models;
using System.Data.SqlClient;

namespace DAL.Services.Implimentation
{
    public class LocationServices:ILocationServices
    {
        readonly SqlConnection con = new SqlConnection("Data Source=AKASH\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True");

        public async Task<string> CreateLocation(Location s)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tbllocation", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Insert");
                sqlCommand.Parameters.AddWithValue("@location_id", 0);
                sqlCommand.Parameters.AddWithValue("@location_name", s.Location_name);
                sqlCommand.Parameters.AddWithValue("@city_id", s.City_id);
                
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

        public async Task<string> DeleteLocation(int Location_id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tbllocation", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Delete");
                sqlCommand.Parameters.AddWithValue("@location_id", Location_id);
                sqlCommand.Parameters.AddWithValue("@location_name","");
                sqlCommand.Parameters.AddWithValue("@city_id", 0);
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

        public async Task<List<Location>> GetAllLocation()
        {
            List<Location> result = new List<Location>();

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tbllocation", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
              
                sqlCommand.Parameters.AddWithValue("@location_id", 0);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method

                while (await reader.ReadAsync())
                {
                    Location c = new Location
                    {
                        
                        Location_id = Convert.ToInt32(reader["location_id"]),
                        Location_name = reader["location_name"].ToString(),
                        City_id = Convert.ToInt32(reader["city_id"])
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

        public async Task<Location> GetAllLocationById(int Location_id)
        {
            Location result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_Alltbllocation", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                
                sqlCommand.Parameters.AddWithValue("@location_id", Location_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new Location
                    {
                        Location_id = Convert.ToInt32(reader["location_id"]),
                        Location_name = reader["location_name"].ToString(),
                        City_id = Convert.ToInt32(reader["city_id"])
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

        

        

        public async Task<Location> GetLocationById(int Location_id)
        {
            Location result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tbllocation", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@location_id", Location_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new Location
                    {
                        Location_id = Convert.ToInt32(reader["location_id"]),
                        Location_name = reader["location_name"].ToString(),
                        City_id = Convert.ToInt32(reader["city_id"])
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

        public async Task<string> RestoreLocation(int Location_id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tbllocation", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Restore");
                sqlCommand.Parameters.AddWithValue("@location_id", Location_id);
                sqlCommand.Parameters.AddWithValue("@location_name", "");
                sqlCommand.Parameters.AddWithValue("@city_id", 0);
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

        public async Task<string> UpdateLocation(Location s)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tbllocation", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Update");
                sqlCommand.Parameters.AddWithValue("@location_id",s.Location_id);
                sqlCommand.Parameters.AddWithValue("@location_name", s.Location_name);
                sqlCommand.Parameters.AddWithValue("@city_id", s.City_id);
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
