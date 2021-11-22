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
    [Authorize]
    public class SentimentsController : Controller
    {
        public readonly UserManager<ApplicationUser> _usermanager;
        private readonly CryptoContext _context;

        public SentimentsController(CryptoContext context,  UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _usermanager = userManager;
        }

        // GET: Sentiments
        public async Task<IActionResult> Index()
        {
            return View(await _context.Sentiments.ToListAsync());
        }

        // GET: Sentiments/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var coinSentiment = await _context.Sentiments
                .FirstOrDefaultAsync(m => m.Id == id);
            if (coinSentiment == null)
            {
                return NotFound();
            }

            return View(coinSentiment);
        }

        // GET: Sentiments/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Sentiments/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,userId,coinId,sentimentValue,dateAdded")] CoinSentiment coinSentiment)
        {
            if (ModelState.IsValid)
            {
                _context.Add(coinSentiment);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(coinSentiment);
        }

        // GET: Sentiments/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var coinSentiment = await _context.Sentiments.FindAsync(id);
            if (coinSentiment == null)
            {
                return NotFound();
            }
            return View(coinSentiment);
        }

        // POST: Sentiments/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,userId,coinId,sentimentValue,dateAdded")] CoinSentiment coinSentiment)
        {
            if (id != coinSentiment.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(coinSentiment);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CoinSentimentExists(coinSentiment.Id))
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
            return View(coinSentiment);
        }

        // GET: Sentiments/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var coinSentiment = await _context.Sentiments
                .FirstOrDefaultAsync(m => m.Id == id);
            if (coinSentiment == null)
            {
                return NotFound();
            }

            return View(coinSentiment);
        }

        // POST: Sentiments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var coinSentiment = await _context.Sentiments.FindAsync(id);
            _context.Sentiments.Remove(coinSentiment);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CoinSentimentExists(int id)
        {
            return _context.Sentiments.Any(e => e.Id == id);
        }
    }
}
