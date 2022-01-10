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
    [Route("api/sentiment")]
    [ApiController]
    //[ApiKeyAuth]
    public class SentimentApiController : ControllerBase
    {
        private readonly CryptoContext _context;

        public SentimentApiController(CryptoContext context)
        {
            _context = context;
        }

        // GET: api/SentimentApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoinSentiment>>> GetSentiments()
        {
            return await _context.Sentiments.ToListAsync();
        }

        // GET: api/SentimentApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CoinSentiment>> GetCoinSentiment(int id)
        {
            var coinSentiment = await _context.Sentiments.FindAsync(id);

            if (coinSentiment == null)
            {
                return NotFound();
            }

            return coinSentiment;
        }

        // PUT: api/SentimentApi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoinSentiment(int id, CoinSentiment coinSentiment)
        {
            if (id != coinSentiment.Id)
            {
                return BadRequest();
            }

            _context.Entry(coinSentiment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoinSentimentExists(id))
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

        // POST: api/SentimentApi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CoinSentiment>> PostCoinSentiment(CoinSentiment coinSentiment)
        {
            _context.Sentiments.Add(coinSentiment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoinSentiment", new { id = coinSentiment.Id }, coinSentiment);
        }

        // DELETE: api/SentimentApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoinSentiment(int id)
        {
            var coinSentiment = await _context.Sentiments.FindAsync(id);
            if (coinSentiment == null)
            {
                return NotFound();
            }

            _context.Sentiments.Remove(coinSentiment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CoinSentimentExists(int id)
        {
            return _context.Sentiments.Any(e => e.Id == id);
        }
    }
}
