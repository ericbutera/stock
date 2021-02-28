namespace api.Models
{
    public class Ticker : RepoEntity
    {
        public string Name { get; set; }
        public string Symbol {get;set;}
        public bool IsActive { get; set; }
    }
}
