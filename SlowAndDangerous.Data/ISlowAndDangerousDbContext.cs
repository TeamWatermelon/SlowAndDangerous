namespace SlowAndDangerous.Data
{
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;

    using SlowAndDangerous.Models;

    public interface ISlowAndDangerousDbContext
    {
        IDbSet<Car> Cars { get; set; }

        IDbSet<City> Cities { get; set; }

        IDbSet<Exam> Exams { get; set; }

        IDbSet<User> Users { get; set; }

        void SaveChanges();

        IDbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
    }
}