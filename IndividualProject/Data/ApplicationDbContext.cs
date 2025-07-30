using IndividualProject.Models;
using Microsoft.EntityFrameworkCore;

namespace IndividualProject.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options) : base(options) { }

        public DbSet<Seller> Sellers { get; set; }
        public DbSet<Item> Items { get; set; }
    }
}
