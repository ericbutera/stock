using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using api.Models;
using api.Interfaces;

namespace api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TickersController : ControllerBase
    {
        private readonly IRepository<Ticker> _repo;

        public TickersController(IRepository<Ticker> repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Fetch all tickers
        ///  GET /
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Task<IEnumerable<Ticker>> GetTickers()
        {
            return _repo.Get();
        }

        /// <summary>
        /// Fetch a specific ticker
        /// GET /ticker/5
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticker>> GetTicker(long id)
        {
            var ticker = await _repo.Get(id);
            if (ticker != null)
                return ticker;

            return NotFound();
        }

        /// <summary>
        /// Create a ticker
        /// POST /ticker
        /// </summary>
        /// <param name="ticker"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Ticker>> PostTicker(Ticker ticker)
        {
            await _repo.Add(ticker);
            return CreatedAtAction(nameof(GetTicker), new { id = ticker.Id }, ticker);
        }

        /// <summary>
        /// Update a ticker
        /// PUT /ticker/1
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ticker"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicker(long id, Ticker ticker)
        {
            if (id != ticker.Id)
                return BadRequest();

            if (!await _repo.Exists(id))
                return NotFound();

            await _repo.Update(ticker);

            return NoContent();
        }
    }
}