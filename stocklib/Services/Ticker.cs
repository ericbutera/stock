using stocklib.Interfaces;
using stocklib.Models;

namespace stocklib.Services
{
    public class TickerService
    {
        private readonly IRepository<Ticker> _repo;

        public TickerService(IRepository<Ticker> repository)
        {
            _repo = repository;
        }
    }
}