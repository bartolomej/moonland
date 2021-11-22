using System;
using System.Collections.Generic;

namespace gateway.Models
{
    public class Coin
    {
        public int Id { get; set; }
        public string shortName { get; set; }
        public DateTime dateAdded { get; set; }

        public ICollection<CoinSentiment> Sentiments { get; set; }
    }
}