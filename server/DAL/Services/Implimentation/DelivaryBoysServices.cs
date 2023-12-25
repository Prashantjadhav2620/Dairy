using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Services.Interface;
using DAL.Models;
using System.Data.SqlClient;
using DAL.Services.Interface;
namespace DAL.Services.Implimentation
{
    public class DelivaryBoysServices:IDelivaryBoysServices
    {
        readonly SqlConnection con = new SqlConnection("Data Source=AKASH\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True");

        public async Task<string> CreateDelivaryBoys(DelivaryBoys s)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblDelivaryBoys", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Insert");
                sqlCommand.Parameters.AddWithValue("@db_id", 0);
                sqlCommand.Parameters.AddWithValue("@db_name", s.db_name);
                sqlCommand.Parameters.AddWithValue("@db_address", s.db_address);
                sqlCommand.Parameters.AddWithValue("@db_mob", s.db_mob);
                sqlCommand.Parameters.AddWithValue("@db_photo", s.db_photo);

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

        public async Task<string> DeleteDelivaryBoys(int DelivaryBoys_id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblDelivaryBoys", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Delete");
                sqlCommand.Parameters.AddWithValue("@db_id", DelivaryBoys_id);
                sqlCommand.Parameters.AddWithValue("@db_name", "");
                sqlCommand.Parameters.AddWithValue("@db_address", "");
                sqlCommand.Parameters.AddWithValue("@db_mob", "");
                sqlCommand.Parameters.AddWithValue("@db_photo", "");
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

        public async Task<List<DelivaryBoys>> GetDelivaryBoys()
        {
            List<DelivaryBoys> result = new List<DelivaryBoys>();

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblDelivaryBoys", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@db_id", 0);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); 

                while (await reader.ReadAsync())
                {
                    DelivaryBoys c = new DelivaryBoys
                    {

                        db_id = Convert.ToInt32(reader["db_id"]),
                        db_name = reader["db_name"].ToString(),
                        db_address = reader["db_address"].ToString(),
                        db_mob = reader["db_mob"].ToString(),
                        db_photo = reader["db_photo"].ToString()
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

        public async Task<DelivaryBoys> GetAllDelivaryBoysById(int DelivaryBoys_id)
        {
            DelivaryBoys result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_AlltblDelivaryBoys", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@db_id", DelivaryBoys_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new DelivaryBoys
                    {
                        db_id = Convert.ToInt32(reader["db_id"]),
                        db_name = reader["db_name"].ToString(),
                        db_address = reader["db_address"].ToString(),
                        db_mob = reader["db_mob"].ToString(),
                        db_photo = reader["db_photo"].ToString()
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





        public async Task<DelivaryBoys> GetDelivaryBoysById(int DelivaryBoys_id)
        {
            DelivaryBoys result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblDelivaryBoys", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@db_id", DelivaryBoys_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new DelivaryBoys
                    {
                        db_id = Convert.ToInt32(reader["db_id"]),
                        db_name = reader["db_name"].ToString(),
                        db_address= reader["db_address"].ToString(),
                        db_mob= reader["db_mob"].ToString(),
                        db_photo= reader["db_photo"].ToString()

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

        public async Task<string> RestoreDelivaryBoys(int DelivaryBoys_id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblDelivaryBoys", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Restore");
                sqlCommand.Parameters.AddWithValue("@db_id", DelivaryBoys_id);
                sqlCommand.Parameters.AddWithValue("@db_name", "");
                sqlCommand.Parameters.AddWithValue("@db_address", "");
                sqlCommand.Parameters.AddWithValue("@db_mob", "");
                sqlCommand.Parameters.AddWithValue("@db_photo", "");
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

        public async Task<string> UpdateDelivaryBoys(DelivaryBoys s)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblDelivaryBoys", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Update");
                sqlCommand.Parameters.AddWithValue("@db_id", s.db_id);
                sqlCommand.Parameters.AddWithValue("@db_name", s.db_name);
                sqlCommand.Parameters.AddWithValue("@db_address", s.db_address);
                sqlCommand.Parameters.AddWithValue("@db_mob", s.db_mob);
                sqlCommand.Parameters.AddWithValue("@db_photo", s.db_photo);
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
