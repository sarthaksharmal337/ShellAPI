using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShellAPI.Data.Entities;

namespace ShellAPI.Data
{
    public class AppDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql("Host=localhost;Port=5432;Database=shellapi;Username=postgres;Password=admin1234");
        }

        public DbSet<Branch>? Branches { get; set; }
        public DbSet<Item>? Items { get; set; }
        public DbSet<User>? Users { get; set; }
        public DbSet<Order>? Orders { get; set; }
    }
}
