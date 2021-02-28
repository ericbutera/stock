using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    // TODO https://docs.microsoft.com/en-us/ef/ef6/fundamentals/configuring/code-based
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options)
        {
        }

        public DbSet<Ticker> Tickers { get; set; }

    }
}