using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
namespace DAL.Services.Interface
{
    public interface IDelivaryRootsServices
    {
        Task<string> CreateDelivaryRoots(DelivaryRoots s);
        Task<string> UpdateDelivaryRoots(DelivaryRoots s);
        Task<string> DeleteDelivaryRoots(int id);
        Task<string> RestoreDelivaryRoots(int id);
        Task<List<DelivaryRoots>> GetDelivaryRoots();
        Task<DelivaryRoots> GetDelivaryRootsById(int DelivaryRoots_id);
        Task<DelivaryRoots> GetAllDelivaryRootsById(int DelivaryRoots_id);
    }
}
