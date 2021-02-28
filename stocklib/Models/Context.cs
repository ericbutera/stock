using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace stocklib.Models
{
    public class StocklibContext : DbContext
    {
        public StocklibContext() { }
        public StocklibContext(DbContextOptions<StocklibContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // TODO figure out pathing.. this should be configurable in one spot.
            // Also, migrations ran from command line won't work unless this project is .netcore and this is configured.
            // Maybe Configuration?
            // 
            // https://docs.microsoft.com/en-us/ef/ef6/fundamentals/configuring/code-based
            options.UseSqlite("Data Source=../stock.db");
        }

        public DbSet<Ticker> Tickers { get; set; }

    }
}