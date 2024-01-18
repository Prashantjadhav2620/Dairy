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
    public class StateServices:IStateServices
    {
        readonly SqlConnection con = new SqlConnection("Data Source=PRASHANT\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True;TrustServerCertificate=True");
        //readonly  SqlConnection con=new SqlConnection("Data Source=AKASH\\SQLEXPRESS;Initial Catalog=DairyFarm;Integrated Security=True");

        public async Task<string> CreateState(State s)
        {
            string Response=string.Empty;
            try
            {
                SqlCommand sqlCommand=new SqlCommand("sp_tblstate",con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Insert");
                sqlCommand.Parameters.AddWithValue("@state_id", 0);
                sqlCommand.Parameters.AddWithValue("@state_name",s.StateName);
                con.Open();
                SqlDataReader reader=sqlCommand.ExecuteReader();
                if(reader.Read()!=null)
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
                Response=ex.Message;
            }
            finally
            {
                con.Close();
            }
            return Response ;
        }

        public async Task<string> DeleteState(int id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblstate", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Delete");
                sqlCommand.Parameters.AddWithValue("@state_id", id);
                sqlCommand.Parameters.AddWithValue("@state_name", "");
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

        public async Task<List<State>> GetAllStates()
        {
            List<State> result = new List<State>();

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblState", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@state_id", 0);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method

                while (await reader.ReadAsync())
                {
                    State state = new State
                    {
                        State_id = Convert.ToInt32(reader["state_id"]),
                        StateName = reader["state_name"].ToString()
                    };

                    result.Add(state);
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
        public async Task<State> GetStateById(int state_id)
        {
            State result = null;

            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_fetch_tblState", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@state_id", state_id);
                con.Open();
                SqlDataReader reader = await sqlCommand.ExecuteReaderAsync(); // Use async method
                if (await reader.ReadAsync())
                {
                    result = new State
                    {
                        State_id = Convert.ToInt32(reader["state_id"]),
                        StateName = reader["state_name"].ToString()
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

            return result; // Return the result if found, otherwise it will be null
        }
        //public async Task<State> GetStateById(int state_id)
        //{
        //    State result = null;

        //    try
        //    {
        //        SqlCommand sqlCommand=new SqlCommand("sp_fetch_tblState", con);
        //        sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        //        sqlCommand.Parameters.AddWithValue("@state_id",state_id);
        //        con.Open();
        //        SqlDataReader reader=sqlCommand.ExecuteReader();
        //        if (await reader.ReadAsync())
        //        {
        //            result = new State
        //            {
        //                State_id = Convert.ToInt32(reader["state_id"]),
        //                StateName = reader["state_name"].ToString()
        //            };
        //        }
        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        con.Close();
        //    }
        //    return null;
        //}

        public async Task<string> RestoreState(int id)
        {
            string Response = string.Empty;
            try
            {
                SqlCommand sqlCommand = new SqlCommand("sp_tblstate", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Restore");
                sqlCommand.Parameters.AddWithValue("@state_id", id);
                sqlCommand.Parameters.AddWithValue("@state_name", "");
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

        public async Task<string> UpdateState(State s)
        {
            string Response = string.Empty;
            try
            { 
                SqlCommand sqlCommand = new SqlCommand("sp_tblstate", con);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@type", "Update");
                sqlCommand.Parameters.AddWithValue("@state_id", s.State_id);
                sqlCommand.Parameters.AddWithValue("@state_name", s.StateName);
                con.Open();
                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.Read() != null)
                {
                    Response = " Update Success";
                }
                else
                {
                    Response = "Error Data not Updated";
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
