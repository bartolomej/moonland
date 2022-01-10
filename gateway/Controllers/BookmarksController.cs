using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using gateway.Data;
using gateway.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace gateway.Controllers
{
    [Authorize]
    public class BookmarksController : Controller
    {
        public readonly UserManager<ApplicationUser> _usermanager;
        private readonly CryptoContext _context;
        static readonly HttpClient client = new HttpClient();

        public BookmarksController(CryptoContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _usermanager = userManager;
        }

        // GET: Bookmarks
        public async Task<IActionResult> Index()
        {
            var currentUser = _usermanager.GetUserId(User);
            List<CoinBookmark> bookmarks = await _context.Bookmarks.Where(x => x.userId == currentUser).ToListAsync();
            List<Coin> bookmarkedCoins = new List<Coin>();

            foreach (CoinBookmark bookmark in bookmarks)
            {
                HttpResponseMessage response = await client.GetAsync($"http://83.212.82.177:5001/api/coins/{bookmark.coinId}");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                Coin bookmarkedCoin = Newtonsoft.Json.JsonConvert.DeserializeObject<Coin>(responseBody);

                bookmarkedCoin.bookmarkId = bookmark.Id;
                bookmarkedCoins.Add(bookmarkedCoin);
            }



            return View(bookmarkedCoins.OrderBy(o=>o.name));
        }

        // GET: Bookmarks/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var coinBookmark = await _context.Bookmarks
                .FirstOrDefaultAsync(m => m.Id == id);
            if (coinBookmark == null)
            {
                return NotFound();
            }

            return View(coinBookmark);
        }

        // GET: Bookmarks/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Bookmarks/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,userId,coinId,dateAdded")] CoinBookmark coinBookmark)
        {
            if (ModelState.IsValid)
            {
                _context.Add(coinBookmark);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(coinBookmark);
        }

        // GET: Bookmarks/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var coinBookmark = await _context.Bookmarks.FindAsync(id);
            if (coinBookmark == null)
            {
                return NotFound();
            }
            return View(coinBookmark);
        }

        // POST: Bookmarks/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,userId,coinId,dateAdded")] CoinBookmark coinBookmark)
        {
            if (id != coinBookmark.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(coinBookmark);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CoinBookmarkExists(coinBookmark.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(coinBookmark);
        }

        // GET: Bookmarks/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var coinBookmark = await _context.Bookmarks
                .FirstOrDefaultAsync(m => m.Id == id);
            if (coinBookmark == null)
            {
                return NotFound();
            }

            return View(coinBookmark);
        }

        // POST: Bookmarks/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var coinBookmark = await _context.Bookmarks.FindAsync(id);
            _context.Bookmarks.Remove(coinBookmark);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CoinBookmarkExists(int id)
        {
            return _context.Bookmarks.Any(e => e.Id == id);
        }
    }
}
