namespace api.Models {
    /// <summary>Allow an entity to work with the reposity.</summary>
    public abstract class RepoEntity {
        public virtual long Id { get; set; }
    }
}