using api.Interfaces;
using api.Models;

namespace api.Services 
{
    public class TickerService {
        private readonly IRepository<Ticker> _repo;

        public TickerService(IRepository<Ticker> repository){
            _repo = repository;
        }
    }
}