using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL.Services.Interface
{
    public interface IStateServices
    {
        Task<string> CreateState(State s);
        Task<string> UpdateState(State s);
        Task<string> DeleteState(int id);
        Task<string> RestoreState(int id);
        Task<List<State>> GetAllStates();
        Task<State> GetStateById(int state_id);
    }
}
