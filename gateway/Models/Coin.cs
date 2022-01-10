using System;
using System.Collections.Generic;

namespace gateway.Models
{
    public class Coin
    {
        public string cmcId { get; set; }
        public string createdAt { get; set; }
        public string explorerUrl { get; set; }
        public string id { get; set; }
        public string logo { get; set; }
        public string name { get; set; }
        public string symbol { get; set; }
        public string updatedAt { get; set; }
        public string websiteUrl { get; set; }
        public int bookmarkId { get; set; }
        public Boolean isBookmarked { get; set; }
    }
}