using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
namespace DAL.Services.Interface
{
    public interface IProductServices
    {
        Task<string> CreateProduct(Product s);
        Task<string> UpdateProduct(Product s);
        Task<string> DeleteProduct(int id);
        Task<string> RestoreProduct(int id);
        Task<List<Product>> GetProduct();
        Task<Product> GetProductById(int Product_id);
        Task<Product> GetAllProductById(int Product_id);
    }
}
