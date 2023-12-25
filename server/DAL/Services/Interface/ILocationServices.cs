using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
namespace DAL.Services.Interface
{
    public interface ILocationServices
    {
        Task<string> CreateLocation(Location s);
        Task<string> UpdateLocation(Location s);
        Task<string> DeleteLocation(int id);
        Task<string> RestoreLocation(int id);
        Task<List<Location>> GetAllLocation();
        Task<Location> GetLocationById(int Location_id);
        Task<Location> GetAllLocationById(int Location_id);
    }
}
