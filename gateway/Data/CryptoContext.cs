using gateway.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace gateway.Data
{
    public class CryptoContext : IdentityDbContext<ApplicationUser>
    {
        public CryptoContext(DbContextOptions<CryptoContext> options) : base(options)
        {
        }

        public DbSet<Coin> Coins { get; set; }
        public DbSet<CoinSentiment> Sentiments { get; set; }
        public DbSet<CoinBookmark> Bookmarks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Coin>().ToTable("Coin");
            modelBuilder.Entity<CoinBookmark>().ToTable("CoinSentiments");
            modelBuilder.Entity<CoinBookmark>().ToTable("CoinBookmark");
        }
    }
}