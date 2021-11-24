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
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

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