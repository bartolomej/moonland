using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gateway.Data;
using gateway.Models;
using gateway.Filters;

namespace gateway.Controllers_Api
{
    [Route("api/user")]
    [ApiController]
    [ApiKeyAuth]
    public class UserApiController : ControllerBase
    {
        private readonly CryptoContext _context;

        public UserApiController(CryptoContext context)
        {
            _context = context;
        }


        // GET: api/user/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TempUser>> GetUser(string id)
        {
            var user =  await _context.User.FindAsync(id);
            TempUser tempUser = new TempUser();
            tempUser.Id = user.Id;
            tempUser.firstName = user.FirstName;
            tempUser.lastName = user.LastName;
            tempUser.city = user.City;
            tempUser.userName = user.UserName;
            tempUser.normalizedUserName = user.NormalizedUserName;
            tempUser.email = user.Email;
            tempUser.emailConfirmed = user.EmailConfirmed;
            tempUser.phoneNumber = user.PhoneNumber;
            tempUser.phoneNumberConfirmed = user.PhoneNumberConfirmed;
            tempUser.twoFactorEnabled = user.TwoFactorEnabled;
            tempUser.lockoutEnd = user.LockoutEnd;
            tempUser.lockoutEnabled = user.LockoutEnabled;
            tempUser.accessFailedCount = user.AccessFailedCount;

            return tempUser;

        }
    }
}

public class TempUser {
    public string Id { get; set; }
    public string  firstName  { get; set; }
    public string lastName { get; set; }
    public string city { get; set; }
    public string  userName  { get; set; }
    public string normalizedUserName { get; set; }
    public string  email  { get; set; }
    public string normalizedEmail { get; set; }
    public bool  emailConfirmed  { get; set; }
    public string phoneNumber { get; set; }
    public bool phoneNumberConfirmed { get; set; }
    public bool  twoFactorEnabled  { get; set; }
    public DateTimeOffset? lockoutEnd { get; set; }
    public bool lockoutEnabled { get; set; }
    public int  accessFailedCount  { get; set; }
}