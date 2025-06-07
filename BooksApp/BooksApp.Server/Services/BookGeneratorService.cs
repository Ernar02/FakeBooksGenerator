using System.Reflection.Emit;
using Bogus;
using BooksApp.Server.Models;

namespace BooksApp.Server.Services
{
    public class BookGeneratorService
    {
        public List<Book> GenerateBooks(string userSeed, int page, string locale, double avgLikes, double avgReviews)
        {
            var combinedSeed = $"{userSeed}_{page}".GetHashCode();

            Randomizer.Seed = new Random(combinedSeed);

            var faker = new Faker(locale);

            int booksToGenerate = page == 1 ? 20 : 10;
            int startIndex = page == 1 ? 1 : (20 + (page - 2) * 10 + 1);

            var bookFaker = new Faker<Book>(locale)
                .RuleFor(b => b.Index, f => 0)
                .RuleFor(b => b.ISBN, f => GenerateISBN(f))
                .RuleFor(b => b.Title, f => GenerateLocalizedText(f, locale, "title"))
                .RuleFor(b => b.Author, f => f.Name.FullName())
                .RuleFor(b => b.Publisher, f => f.Company.CompanyName());

            var books = new List<Book>();

            for (int i = 0; i < booksToGenerate; i++)
            {
                var book = bookFaker.Generate();
                book.Index = startIndex + i;

                book.Likes = GetRandomCount(avgLikes, faker);
                book.ReviewsCount = GetRandomCount(avgReviews, faker);

                if (book.ReviewsCount > 0)
                {
                    var reviewFaker = new Faker<Review>(locale)
                        .RuleFor(r => r.Author, f => f.Name.FirstName())
                        .RuleFor(r => r.Text, f => GenerateLocalizedText(f, locale, "review"));

                    book.Reviews = reviewFaker.Generate(book.ReviewsCount);
                }
                else
                {
                    book.Reviews = new List<Review>();
                }

                books.Add(book);
            }

            return books;
        }

        private int GetRandomCount(double avg, Faker faker)
        {
            int whole = (int)Math.Floor(avg);   
            double fraction = avg - whole;
            return whole + (faker.Random.Double() < fraction ? 1 : 0);
        }

        private string GenerateISBN(Faker faker)
        {
            var digits = faker.Random.Digits(12);
            var isbn = $"978-{digits[0]}-{digits[1]}{digits[2]}-{string.Join("", digits.Skip(3).Take(6))}-{digits[9]}{digits[10]}{digits[11]}";
            return isbn;
        }

        private string GenerateLocalizedText(Faker faker, string locale, string type)
        {
            locale = locale.ToLower();

            return type switch
            {
                "title" => locale switch
                {
                    var l when l.StartsWith("en") => faker.WaffleTitle(),
                    var l when l.StartsWith("de") => faker.Lorem.Sentence(faker.Random.Int(2, 4)).TrimEnd('.'),
                    var l when l.StartsWith("ja") => faker.Lorem.Sentence(faker.Random.Int(3, 6)).TrimEnd('.'),
                    _ => faker.Lorem.Sentence(faker.Random.Int(2, 5)).TrimEnd('.')
                },

                "review" => locale switch
                {
                    var l when l.StartsWith("en") => faker.WaffleText(paragraphs: 1, includeHeading: false).Split('\n')[0],
                    var l when l.StartsWith("de") => faker.Lorem.Sentence(faker.Random.Int(1, 3)),
                    var l when l.StartsWith("ja") => faker.Lorem.Sentence(faker.Random.Int(2, 4)),
                    _ => faker.Lorem.Sentence(faker.Random.Int(2, 3))
                },

                _ => string.Empty
            };
        }

    }
}