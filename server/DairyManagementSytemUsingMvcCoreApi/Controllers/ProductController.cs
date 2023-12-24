using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.Services.Interface;
using DAL.Services.Implimentation;
using DAL.Models;
namespace DairyManagementSytemUsingMvcCoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductServices productServices;

        public ProductController(IProductServices productServices)
        {
            this.productServices = productServices;
        }

        //Product Api
        [HttpGet]
        [Route("getallproduct")]
        public async Task<IActionResult> GetAllProduct()
        {
            List<Product> result = await productServices.GetProduct();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("getproductById")]
        public async Task<ActionResult> GetProductById(int product_id)
        {
            var result = await productServices.GetProductById(product_id) ;

            if (result != null)
            {
                return Ok(result);

            }

            return NotFound();
        }
        [HttpPost]
        [Route("createproduct")]
        public async Task<string> CreateProduct(Product s)
        {
            string Response = string.Empty;
            try
            {
                var st = await productServices.CreateProduct(s);
                if (st != null)
                {
                    Response = st;
                }
            }
            catch (Exception ex)
            {
                Response = ex.Message;
            }

            return Response;

        }
        [HttpPut]
        [Route("updateproduct")]
        public async Task<string> UpdateProduct(Product s)
        {

            string Response = string.Empty;
            Product s1 = await productServices.GetAllProductById(s.Product_id);
            if (s1 != null)
            {


                try
                {
                    var st = await productServices.UpdateProduct(s); ;
                    if (st != null)
                    {
                        Response = st;
                    }
                }
                catch (Exception ex)
                {
                    Response = ex.Message;
                }

                return Response;
            }
            else
            {
                return "The Product Is Not Found";
            }
        }
        [HttpPost]
        [Route("deleteproduct")]
        public async Task<string> DeleteProduct(int id)
        {

            string Response = string.Empty;
            Product s1 = await productServices.GetAllProductById(id); ;
            if (s1 != null)
            {
                try
                {
                    var st = await productServices.DeleteProduct(id);
                    if (st != null)
                    {
                        Response = st;
                    }
                }
                catch (Exception ex)
                {
                    Response = ex.Message;
                }

                return Response;
            }
            else
            {
                return "Please Enter valid Details";
            }
        }
        [HttpPost]
        [Route("restoreproduct")]
        public async Task<string> RestoreProduct(int id)
        {

            string Response = string.Empty;

            Product s1 = await productServices.GetAllProductById(id); ;
            if (s1 != null)
            {
                try
                {

                    var st = await productServices.RestoreProduct(id);
                    if (st != null)
                    {
                        Response = st;
                    }
                }
                catch (Exception ex)
                {
                    Response = ex.Message;
                }

                return Response;
            }
            else
            {
                return "Please Enter valid Details";
            }
        }
    }
}
