using Microsoft.EntityFrameworkCore;

namespace stocklib.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<Ticker> Tickers { get; set; }
    }
}