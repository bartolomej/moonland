using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using gateway.Data;
using gateway.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace gateway.Controllers
{
    public class CoinsController : Controller
    {
        public readonly UserManager<ApplicationUser> _usermanager;
        private readonly CryptoContext _context;
        static readonly HttpClient client = new HttpClient();

        public CoinsController(CryptoContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _usermanager = userManager;
        }

        // GET: Coins
        public async Task<IActionResult> Index()
        {
            HttpResponseMessage response = await client.GetAsync("http://83.212.82.177:5001/api/coins");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            List<Coin> coins = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Coin>>(responseBody);

            return View(coins);
        }

        
        // POST: Coins/CreateBookmark
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateBookmark(string id)
        {
            if (ModelState.IsValid)
            {
                var currentUser = _usermanager.GetUserId(User);
                CoinBookmark bookmark = new CoinBookmark{coinId=id,userId=currentUser,dateAdded=DateTime.Now};
                _context.Bookmarks.Add(bookmark);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
