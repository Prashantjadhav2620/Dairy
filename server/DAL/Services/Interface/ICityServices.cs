using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
namespace DAL.Services.Interface
{
    public interface ICityServices
    {
        Task<string> CreateCity(City c);
        Task<string> UpdateCity(City c);
        Task<string> DeleteCity(int Cityid);
        Task<string> RestoreCity(int Cityid);   
        Task<City> GetCitybyid(int Cityid);
        Task<List<City>> GetAll();
        Task<City> GetAllCities(int city_id);
    }
}
