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
            client.DefaultRequestHeaders.Add("ApiKey", "Shitcoins");
        }

        // GET: Coins
        public async Task<IActionResult> Index()
        {
            String userID = _usermanager.GetUserId(User);
            HttpResponseMessage response = await client.GetAsync("http://83.212.82.177:5001/api/coins");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            List<Coin> tempCoins = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Coin>>(responseBody);
            if (userID == null){
                return View(tempCoins);
            }

            List<Coin> coins = new List<Coin>();
            
            var currentUser = _usermanager.GetUserId(User);
            List<CoinBookmark> bookmarks = await _context.Bookmarks.Where(x => x.userId == currentUser).ToListAsync();

            foreach(Coin coin in tempCoins){
                foreach(CoinBookmark bookmrk in bookmarks){
                    if (bookmrk.coinId == coin.id){
                        coin.bookmarkId = bookmrk.Id;
                        coin.isBookmarked = true;
                        break;
                    }
                }
                coins.Add(coin);
            }

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

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteBookmark(int id)
        {
            var coinBookmark = await _context.Bookmarks.FindAsync(id);
            _context.Bookmarks.Remove(coinBookmark);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));


        }
        
        public async Task<IActionResult> Graph(string symbol)
        {
            Console.WriteLine($"http://83.212.82.177:5001/api/social/stats?coin={symbol}&period=MINUTE");
            HttpResponseMessage response = await client.GetAsync($"http://83.212.82.177:5001/api/social/stats?coin={symbol}&period=MINUTE");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            List<CoinStats> coinStats = Newtonsoft.Json.JsonConvert.DeserializeObject<List<CoinStats>>(responseBody);

            return View(coinStats);
        }
    }
}