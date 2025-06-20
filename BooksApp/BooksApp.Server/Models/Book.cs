﻿namespace BooksApp.Server.Models
{
    public class Book
    {
        public int Index { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }

        public int Likes { get; set; }
        public int ReviewsCount { get; set; }
        public List<Review>? Reviews { get; set; } 
    }

}
