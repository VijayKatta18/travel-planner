using Microsoft.EntityFrameworkCore;
using services.Entities;

namespace services.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        // Each Dbset represents a table in the database
        public DbSet<User> Users => Set<User>();
        public DbSet<Trip> Trips => Set<Trip>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
        }
    }

    //Summary

    // AppDbContext is your database session class in EF Core.
    // DbSet<User> and DbSet<Trip> map C# entity classes to database tables.
    // The constructor takes options like connection string.
    // OnModelCreating customizes schema — here, ensuring Username is unique with a database index.
}
