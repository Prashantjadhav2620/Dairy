using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
namespace DAL.Services.Interface
{
    public interface IDelivaryBoysServices
    {
        Task<string> CreateDelivaryBoys(DelivaryBoys s);
        Task<string> UpdateDelivaryBoys(DelivaryBoys s);
        Task<string> DeleteDelivaryBoys(int id);
        Task<string> RestoreDelivaryBoys(int id);
        Task<List<DelivaryBoys>> GetDelivaryBoys();
        Task<DelivaryBoys> GetDelivaryBoysById(int DelivaryBoys_id);
        Task<DelivaryBoys> GetAllDelivaryBoysById(int DelivaryBoys_id);
    }
}
