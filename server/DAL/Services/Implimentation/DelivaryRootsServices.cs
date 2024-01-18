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
    public class DelivaryRootsServices:IDelivaryRootsServices
    {
        readonly SqlConnection con = new SqlConnection("Data Source=PRASHANT\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True;");
        // readonly SqlConnection con = new SqlConnection("Data Source=AKASH\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True");

        public async Task<string> CreateDelivaryRoots(DelivaryRoots s)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblDelivaryRoots", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Insert");
                sqlCommand.Parameters.AddWithValue("@dr_id", 0);
                sqlCommand.Parameters.AddWithValue("@droot_name", s.DRoot_name);
                
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

        public async Task<string> DeleteDelivaryRoots(int DelivaryRoots_id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblDelivaryRoots", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Delete");
                sqlCommand.Parameters.AddWithValue("@dr_id", DelivaryRoots_id);
                sqlCommand.Parameters.AddWithValue("@droot_name", "");
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

        public async Task<List<DelivaryRoots>> GetDelivaryRoots()
        {
            List<DelivaryRoots> result = new List<DelivaryRoots>();

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblDelivaryRoots", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@dr_id", 0);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method

                while (await reader.ReadAsync())
                {
                    DelivaryRoots c = new DelivaryRoots
                    {

                        DelivaryRoots_id = Convert.ToInt32(reader["dr_id"]),
                        DRoot_name = reader["droot_name"].ToString(),
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

        public async Task<DelivaryRoots> GetAllDelivaryRootsById(int DelivaryRoots_id)
        {
            DelivaryRoots result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_AlltblDelivaryRoots", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@dr_id", DelivaryRoots_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new DelivaryRoots
                    {
                        DelivaryRoots_id = Convert.ToInt32(reader["dr_id"]),
                        DRoot_name = reader["droot_name"].ToString(),
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





        public async Task<DelivaryRoots> GetDelivaryRootsById(int DelivaryRoots_id)
        {
            DelivaryRoots result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblDelivaryRoots", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@dr_id", DelivaryRoots_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new DelivaryRoots
                    {
                        DelivaryRoots_id = Convert.ToInt32(reader["dr_id"]),
                        DRoot_name = reader["droot_name"].ToString(),
                        
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

        public async Task<string> RestoreDelivaryRoots(int DelivaryRoots_id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblDelivaryRoots", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Restore");
                sqlCommand.Parameters.AddWithValue("@dr_id", DelivaryRoots_id);
                sqlCommand.Parameters.AddWithValue("@droot_name", "");
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

        public async Task<string> UpdateDelivaryRoots(DelivaryRoots s)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblDelivaryRoots", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Update");
                sqlCommand.Parameters.AddWithValue("@dr_id", s.DelivaryRoots_id);
                sqlCommand.Parameters.AddWithValue("@droot_name", s.DRoot_name);
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
