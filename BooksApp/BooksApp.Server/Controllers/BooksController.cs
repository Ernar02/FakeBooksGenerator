using BooksApp.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BooksApp.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookGeneratorService _generator;

        public BooksController(BookGeneratorService generator)
        {
            _generator = generator;
        }


        [HttpGet("GetBooks")]
        public IActionResult GetBooks(
         [FromQuery] string seed,
         [FromQuery] int page,
         [FromQuery] string locale,
         [FromQuery] double likes,
         [FromQuery] double reviews)
        {
            var books = _generator.GenerateBooks(seed, page, locale, likes, reviews);
            return Ok(books);
        }

    }
}
