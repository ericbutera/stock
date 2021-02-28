namespace stocklib.Models
{
    public class Ticker
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Symbol {get;set;}
        public bool IsActive { get; set; }
    }
}
