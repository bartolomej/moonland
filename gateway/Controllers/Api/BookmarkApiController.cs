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
    [Route("api/bookmark")]
    [ApiController]
    //[ApiKeyAuth]
    public class BookmarkApiController : ControllerBase
    {
        private readonly CryptoContext _context;

        public BookmarkApiController(CryptoContext context)
        {
            _context = context;
        }

        // GET: api/BookmarkApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoinBookmark>>> GetBookmarks()
        {
            return await _context.Bookmarks.ToListAsync();
        }

        // GET: api/BookmarkApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CoinBookmark>> GetCoinBookmark(int id)
        {
            var coinBookmark = await _context.Bookmarks.FindAsync(id);

            if (coinBookmark == null)
            {
                return NotFound();
            }

            return coinBookmark;
        }
        
        // GET: All bookmarks for a user
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<CoinBookmark>>> GetUserCoinBookmarks(string id)
        {
            return await _context.Bookmarks.Where(x => x.userId == id).ToListAsync();
        }

        // PUT: api/BookmarkApi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoinBookmark(int id, CoinBookmark coinBookmark)
        {
            if (id != coinBookmark.Id)
            {
                return BadRequest();
            }

            _context.Entry(coinBookmark).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoinBookmarkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookmarkApi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CoinBookmark>> PostCoinBookmark(CoinBookmark coinBookmark)
        {
            _context.Bookmarks.Add(coinBookmark);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoinBookmark", new { id = coinBookmark.Id }, coinBookmark);
        }

        // DELETE: api/BookmarkApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoinBookmark(int id)
        {
            var coinBookmark = await _context.Bookmarks.FindAsync(id);
            if (coinBookmark == null)
            {
                return NotFound();
            }

            _context.Bookmarks.Remove(coinBookmark);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CoinBookmarkExists(int id)
        {
            return _context.Bookmarks.Any(e => e.Id == id);
        }
    }
}
