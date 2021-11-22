using System;
using System.Collections.Generic;

namespace gateway.Models
{
    public class CoinBookmark
    {
        public int Id { get; set; }
        public string  userId  { get; set; }
        public int coinId { get; set; }
        public DateTime dateAdded { get; set; }
    }
}