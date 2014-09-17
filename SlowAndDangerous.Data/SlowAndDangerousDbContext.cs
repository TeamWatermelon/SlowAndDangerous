namespace SlowAndDangerous.Data
{
    using System.Data.Entity;

    using Microsoft.AspNet.Identity.EntityFramework;

    using SlowAndDangerous.Models;
    using SlowAndDangerous.Data.Migrations;

    public class SlowAndDangerousDbContext : IdentityDbContext<User>
    {
        public SlowAndDangerousDbContext()
            : base("SlowAndDangerousConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<SlowAndDangerousDbContext, Configuration>());
        }

        public IDbSet<Car> Cars { get; set; }

        public static SlowAndDangerousDbContext Create()
        {
            return new SlowAndDangerousDbContext();
        }
    }
}