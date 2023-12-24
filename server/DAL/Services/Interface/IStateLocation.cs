using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
namespace DAL.Services.Interface
{
    public interface IStateLocation
    {
        Task<string> CreateStateForLocation(State s);
        Task<string> UpdateStateForLocation(State s);
        Task<string> DeleteStateForLocation(int id);
        Task<string> RestoreStateForLocation(int id);
        Task<List<State>> GetAllStatesForLocation();
        Task<State> GetStateForLocationById(int state_id);
        Task<State> GetAllStateForLocationById(int state_id);
    }
}
