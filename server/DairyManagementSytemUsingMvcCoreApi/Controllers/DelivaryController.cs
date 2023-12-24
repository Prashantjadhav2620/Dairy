using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.Services.Interface;
using DAL.Services.Implimentation;
using DAL.Models;
namespace DairyManagementSytemUsingMvcCoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DelivaryController : ControllerBase
    {
        private readonly IDelivaryRootsServices delivaryRootsServices;
        private readonly IDelivaryBoysServices delivaryBoysServices;
        public DelivaryController(IDelivaryRootsServices delivaryRootsServices, IDelivaryBoysServices delivaryBoysServices)
        {
            this.delivaryRootsServices = delivaryRootsServices;
            this.delivaryBoysServices = delivaryBoysServices;
        }

        //DelivaryRoot Api
        [HttpGet]
        [Route("getalldroot")]
        public async Task<IActionResult> GetAllDelivaryRoots()
        {
            List<DelivaryRoots> result = await delivaryRootsServices.GetDelivaryRoots();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("getdrootById")]
        public async Task<ActionResult> GetDelivaryRootsById(int droot_id)
        {
            var result = await delivaryRootsServices.GetDelivaryRootsById(droot_id);

            if (result != null)
            {
                return Ok(result);

            }

            return NotFound();
        }
        [HttpPost]
        [Route("createdroot")]
        public async Task<string> CreateDelivaryRoots(DelivaryRoots s)
        {
            string Response = string.Empty;
            try
            {
                var st = await delivaryRootsServices.CreateDelivaryRoots(s);
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
        [Route("updatedroot")]
        public async Task<string> UpdateDelivaryRoots(DelivaryRoots s)
        {

            string Response = string.Empty;
            DelivaryRoots s1 = await delivaryRootsServices.GetAllDelivaryRootsById(s.DelivaryRoots_id);
            if (s1 != null)
            {


                try
                {
                    var st = await delivaryRootsServices.UpdateDelivaryRoots(s); ;
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
        [Route("deletedroot")]
        public async Task<string> DeleteDelivaryRoots(int id)
        {

            string Response = string.Empty;
            DelivaryRoots s1 = await delivaryRootsServices.GetAllDelivaryRootsById(id); ;
            if (s1 != null)
            {
                try
                {
                    var st = await delivaryRootsServices.DeleteDelivaryRoots(id);
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
        [Route("restoredroot")]
        public async Task<string> RestoreDelivaryRoots(int id)
        {

            string Response = string.Empty;

            DelivaryRoots s1 = await delivaryRootsServices.GetAllDelivaryRootsById(id); ;
            if (s1 != null)
            {
                try
                {

                    var st = await delivaryRootsServices.RestoreDelivaryRoots(id);
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

        //Api For Delivary Boy
        [HttpGet]
        [Route("getalldboys")]
        public async Task<IActionResult> GetAllDelivaryBoy()
        {
            List<DelivaryBoys> result = await delivaryBoysServices.GetDelivaryBoys();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("getdboysById")]
        public async Task<ActionResult> GetDelivaryBoyById(int db_id)
        {
            var result = await delivaryBoysServices.GetDelivaryBoysById(db_id);

            if (result != null)
            {
                return Ok(result);

            }

            return NotFound();
        }
        [HttpPost]
        [Route("createdboys")]
        public async Task<string> CreateDelivaryBoy(DelivaryBoys s)
        {
            string Response = string.Empty;
            try
            {
                var st = await delivaryBoysServices.CreateDelivaryBoys(s);
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
        [Route("updatedboys")]
        public async Task<string> UpdateDelivaryBoy(DelivaryBoys s)
        {

            string Response = string.Empty;
            DelivaryBoys s1 = await delivaryBoysServices.GetAllDelivaryBoysById(s.db_id);
            if (s1 != null)
            {


                try
                {
                    var st = await delivaryBoysServices.UpdateDelivaryBoys(s); ;
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
        [Route("deletedboys")]
        public async Task<string> DeleteDelivaryBoy(int id)
        {

            string Response = string.Empty;
            DelivaryBoys s1 = await delivaryBoysServices.GetAllDelivaryBoysById(id); ;
            if (s1 != null)
            {
                try
                {
                    var st = await delivaryBoysServices.DeleteDelivaryBoys(id);
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
        [Route("restoredboys")]
        public  async Task<string> RestoreDelivaryBoy(int id)
        {

            string Response = string.Empty;

            DelivaryBoys s1 = await delivaryBoysServices.GetAllDelivaryBoysById(id) ; 
            if (s1 != null)
            {
                try
                {

                    var st = await delivaryBoysServices.RestoreDelivaryBoys(id);
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
