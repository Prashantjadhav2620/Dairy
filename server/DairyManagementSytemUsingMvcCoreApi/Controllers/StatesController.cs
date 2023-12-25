using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.Services.Implimentation;
using DAL.Services.Interface;
using DAL.Models;
namespace DairyManagementSytemUsingMvcCoreApi.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
      private readonly  IStateServices stateServices;
        private readonly IStateLocation stateLocation;
        private readonly ICityServices cityServices;
        private readonly ILocationServices locationServices;
        public StatesController(IStateServices stateServices, IStateLocation stateLocatio, ICityServices cityServices, ILocationServices locationServices)
        {
            this.stateServices = stateServices;
            this.stateLocation = stateLocatio;
            this.cityServices = cityServices;
            this.locationServices = locationServices;
        }

        [HttpGet]
        [Route("getallstate")]
        public async Task<IActionResult> GetAllState()
        {
            List<State> result = await stateServices.GetAllStates();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("getstateById")]
        public async Task<ActionResult> GetStateById(int state_id)
        {
            var result = await stateServices.GetStateById(state_id);

            if (result != null)
            {
                return Ok(result);
                
            }

            return NotFound(); 
        }
        [HttpPost]
        [Route("States")]
        public async Task<string> CreateStates(State s)
        {
            string Response = string.Empty;
            try
            {
                var st = await stateServices.CreateState(s);
                if(st!=null)
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
        [Route("updatestate")]
        public async Task<string> UpdateStates(State s)
        {
            string Response = string.Empty;
            try
            {
                var st = await stateServices.UpdateState(s);
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
        [HttpPost]
        [Route("deletestate")]
        public async Task<string> DeleteStates(int id)
        {

            string Response = string.Empty;
            try
            {
                var st = await stateServices.DeleteState(id);
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
        [HttpPost]
        [Route("Restorestate")]
        public async Task<string> RestoreStates(int id)
        {
            string Response = string.Empty;
            try
            {

                var st = await stateServices.RestoreState(id);
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
        //For State For Location
        [HttpGet]
        [Route("getallstatelocation")]
        public async Task<IActionResult> GetAllStateForLocation()
        {
            List<State> result = await stateLocation.GetAllStatesForLocation();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("getstatelocationById")]
        public async Task<ActionResult> GetStateForLocationById(int state_id)
        {
            var result = await stateLocation.GetStateForLocationById(state_id);

            if (result != null)
            {
                return Ok(result);

            }

            return NotFound();
        }
        [HttpPost]
        [Route("createstateslocation")]
        public async Task<string> CreateStatesForLocation(State s)
        {
            string Response = string.Empty;
            try
            {
                var st = await stateLocation.CreateStateForLocation(s);
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
        [Route("updatestatelocation")]
        public async Task<string> UpdateStatesForLocation(State s)
        {
            
            string Response = string.Empty;
            State s1=await stateLocation.GetStateForLocationById(s.State_id);
            if(s1!=null)
            {

            
            try
            {
                var st = await stateLocation.UpdateStateForLocation(s);
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
            }else
            {
                return "The State Is Not Found";
            }
        }
        [HttpPost]
        [Route("deletestatelocation")]
        public async Task<string> DeleteStatesForLocation(int id)
        {

            string Response = string.Empty;
            State s1 = await stateLocation.GetAllStateForLocationById(id);
            if (s1 != null)
            { 
                try
            {
                var st = await stateLocation.DeleteStateForLocation(id);
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
        [Route("restorestatelocation")]
        public async Task<string> RestoreStatesForLocation(int id)
        {

            string Response = string.Empty;
         
            State s1 = await stateLocation.GetAllStateForLocationById(id);
            if (s1 != null)
            {
            try
            {

                var st = await stateLocation.RestoreStateForLocation(id);   
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

        //For City  
        [HttpGet]
        [Route("getallcity")]
        public async Task<IActionResult> GetAllCity()
        {
            List<City> result = await cityServices.GetAll();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("getcityById")]
        public async Task<ActionResult> GetCityById(int city_id)
        {
            var result = await cityServices.GetCitybyid(city_id);

            if (result != null)
            {
                return Ok(result);

            }

            return NotFound();
        }
        [HttpPost]
        [Route("createcity")]
        public async Task<string> CreateCity(City s)
        {
            string Response = string.Empty;
            try
            {
                var st = await cityServices.CreateCity(s);
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
        [Route("updatecity")]
        public async Task<string> UpdateCity(City s)
        {

            string Response = string.Empty;
            City s1 = await cityServices.GetAllCities(s.City_id);
            if (s1 != null)
            {


                try
                {
                    var st = await cityServices.UpdateCity(s); ;
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
                return "The City Is Not Found";
            }
        }
        [HttpPost]
        [Route("deletecity")]
        public async Task<string> DeleteCity(int id)
        {

            string Response = string.Empty;
            City s1 = await cityServices.GetAllCities(id);
            if (s1 != null)
            {
                try
                {
                    var st = await cityServices.DeleteCity(id);
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
        [Route("restorecity")]
        public async Task<string> RestoreCity(int id)
        {

            string Response = string.Empty;

            City s1 = await cityServices.GetAllCities(id);
            if (s1 != null)
            {
                try
                {

                    var st = await cityServices.RestoreCity(id);
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
        // For Location
        [HttpGet]
        [Route("getalllocation")]
        public async Task<IActionResult> GetAllLocation()
        {
            List<Location> result = await locationServices.GetAllLocation();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("getlocationById")]
        public async Task<ActionResult> GetLocationById(int location_id)
        {
            var result = await locationServices.GetLocationById(location_id) ;

            if (result != null)
            {
                return Ok(result);

            }

            return NotFound();
        }
        [HttpPost]
        [Route("createlocation")]
        public async Task<string> CreateLocation(Location s)
        {
            string Response = string.Empty;
            try
            {
                var st = await locationServices.CreateLocation(s);
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
        [Route("updatelocation")]
        public async Task<string> UpdateLocation(Location s)
        {

            string Response = string.Empty;
            Location s1 = await locationServices.GetAllLocationById(s.Location_id);
            if (s1 != null)
            {


                try
                {
                    var st = await locationServices.UpdateLocation(s); ;
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
                return "The Location Is Not Found";
            }
        }
        [HttpPost]
        [Route("deletelocation")]
        public async Task<string> DeleteLocation(int id)
        {

            string Response = string.Empty;
            Location s1 = await locationServices.GetAllLocationById(id);
            if (s1 != null)
            {
                try
                {
                    var st = await locationServices.DeleteLocation(id);
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
        [Route("restorelocation")]
        public async Task<string> RestoreLocation(int id)
        {

            string Response = string.Empty;

            Location s1 = await locationServices.GetAllLocationById(id);
            if (s1 != null)
            {
                try
                {

                    var st = await locationServices.RestoreLocation(id);
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
