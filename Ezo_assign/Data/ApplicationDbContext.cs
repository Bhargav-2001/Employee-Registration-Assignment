using Ezo_assign.Models;
using Microsoft.EntityFrameworkCore;

namespace Ezo_assign.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .ToTable("Employee_Mst");

            modelBuilder.Entity<Country>()
                .ToTable("Country_Mst");

            modelBuilder.Entity<State>()
                .ToTable("State_Mst");
        }
    }
}