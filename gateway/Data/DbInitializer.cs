using gateway.Models;
using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace gateway.Data
{
    public static class DbInitializer
    {
        public static void Initialize(CryptoContext context)
        {
            context.Database.EnsureCreated();

            // Look for any Coins.
            if (context.Coins.Any())
            {
                return;   // DB has been seeded
            }

            var Coins = new Coin[]
            {
            new Coin{shortName="Alexander",dateAdded=DateTime.Parse("2005-09-01")},
            new Coin{shortName="Alonso",dateAdded=DateTime.Parse("2002-09-01")},
            new Coin{shortName="Anand",dateAdded=DateTime.Parse("2003-09-01")},
            new Coin{shortName="Barzdukas",dateAdded=DateTime.Parse("2002-09-01")},
            new Coin{shortName="Li",dateAdded=DateTime.Parse("2002-09-01")},
            new Coin{shortName="Justice",dateAdded=DateTime.Parse("2001-09-01")},
            new Coin{shortName="Norman",dateAdded=DateTime.Parse("2003-09-01")},
            new Coin{shortName="Olivetto",dateAdded=DateTime.Parse("2005-09-01")}
            };
            foreach (Coin s in Coins)
            {
                context.Coins.Add(s);
            }
            context.SaveChanges();

            var bookmarks = new CoinBookmark[]
            {
            new CoinBookmark{coinId=1,userId="temp"},
            new CoinBookmark{coinId=2,userId="temp"},
            new CoinBookmark{coinId=3,userId="temp"},
            new CoinBookmark{coinId=3,userId="temp2"},
            new CoinBookmark{coinId=5,userId="temp3"},
            new CoinBookmark{coinId=7,userId="temp3"},
            new CoinBookmark{coinId=7,userId="temp4"}
            };
            foreach (CoinBookmark c in bookmarks)
            {
                context.Bookmarks.Add(c);
            }
            context.SaveChanges();

            var sentiments = new CoinSentiment[]
            {
            new CoinSentiment{coinId=1,sentimentValue=true,dateAdded=DateTime.Parse("2005-09-01"),userId="temp"},
            new CoinSentiment{coinId=3,sentimentValue=true,dateAdded=DateTime.Parse("2005-09-02"),userId="temp"},
            new CoinSentiment{coinId=4,sentimentValue=false,dateAdded=DateTime.Parse("2005-09-05"),userId="temp"},
            new CoinSentiment{coinId=4,sentimentValue=false,dateAdded=DateTime.Parse("2005-09-07"),userId="temp2"},
            new CoinSentiment{coinId=5,sentimentValue=true,dateAdded=DateTime.Parse("2005-09-10"),userId="temp2"},
            };
            foreach (CoinSentiment e in sentiments)
            {
                context.Sentiments.Add(e);
            }
            context.SaveChanges();

            var roles = new IdentityRole[] {
                new IdentityRole{Id="1", Name="Administrator"},
                new IdentityRole{Id="2", Name="Staff"}
            };

            foreach (IdentityRole r in roles)
            {
                context.Roles.Add(r);
            }

            var user = new ApplicationUser
            {
                FirstName = "Admin",
                LastName = "Istrator",
                City = "Ljubljana",
                Email = "admin@kpov.com",
                NormalizedEmail = "XXXX@EXAMPLE.COM",
                UserName = "admin@kpov.com",
                NormalizedUserName = "admin@kpov.com",
                PhoneNumber = "+111111111",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            if (!context.Users.Any(u => u.UserName == user.UserName))
            {
                var password = new PasswordHasher<ApplicationUser>();
                var hashed = password.HashPassword(user,"Geslo123!");
                user.PasswordHash = hashed;
                context.Users.Add(user);
            }

            context.SaveChanges();

            var UserRoles = new IdentityUserRole<string>[]
            {
                new IdentityUserRole<string>{RoleId = roles[0].Id, UserId=user.Id},
                new IdentityUserRole<string>{RoleId = roles[1].Id, UserId=user.Id}
            };

            foreach (IdentityUserRole<string> r in UserRoles)
            {
                context.UserRoles.Add(r);
            }

            context.SaveChanges();
        }
    }
}