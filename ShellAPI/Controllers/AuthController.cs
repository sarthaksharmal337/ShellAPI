using System.Security.Authentication;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShellAPI.Data;
using ShellAPI.Data.Entities;

namespace ShellAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        public IActionResult login([FromForm] string username, [FromForm] string password)
        {
            AppDbContext context = new AppDbContext();

            if (Request.Headers.ContainsKey("X-Token"))
            {
                var token = Request.Headers.GetCommaSeparatedValues("X-Token").First();

                var alreadyLoggedIn = context.Users.SingleOrDefault(u => u.Token == token);

                if (alreadyLoggedIn != null)
                {
                    return Unauthorized();
                }
            }

            try
            {
                var user = context.Users.Single(u => u.Username == username.ToLower().Trim() && u.Password == password);

                var allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var random = new Random();
                var resultToken = new string(
                   Enumerable.Repeat(allChar, 38)
                   .Select(token => token[random.Next(token.Length)]).ToArray());

                string authToken = resultToken.ToString();

                user.Token = authToken;
                context.SaveChanges();

                var result = new Dictionary<string, string>();

                result["username"] = user.Username;
                result["token"]    = authToken;
                result["country"]  = user.Country;

                return Ok(result);
            } catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult signup([FromForm] string username, [FromForm] string password, [FromForm] string country)
        {
            AppDbContext context = new AppDbContext();

            if (Request.Headers.ContainsKey("X-Token"))
            {
                var token = Request.Headers.GetCommaSeparatedValues("X-Token").First();

                var alreadyLoggedIn = context.Users.SingleOrDefault(u => u.Token == token);

                if (alreadyLoggedIn != null)
                {
                    return Unauthorized();
                }
            }

            if(password.Length < 8)
            {
                return BadRequest("Password must be at-least 8 characters.");
            }

            List<string> countries = new List<string>
            {
                "India",
                "Pakistan",
                "Netherlands",
                "USA",
                "UK"
            };

            if (!countries.Contains(country))
            {
                return BadRequest("Unknown Country.");
            }

            try
            {
                var user = context.Users.Single(u => u.Username == username.ToLower().Trim());

                return BadRequest("User already exists.");
            }
            catch (Exception ex)
            {
                var newUser = new User();

                var allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var random = new Random();
                var resultToken = new string(
                   Enumerable.Repeat(allChar, 38)
                   .Select(token => token[random.Next(token.Length)]).ToArray());

                string authToken = resultToken.ToString();

                newUser.Username = username.ToLower().Trim();
                newUser.Password = password;
                newUser.Token    = authToken;
                newUser.Country  = country;

                context.Add(newUser);
                context.SaveChanges();

                var result = new Dictionary<string, string>();

                result["username"] = newUser.Username;
                result["token"]    = authToken;
                result["country"]  = country;

                return Ok(result);


            }
        }

    }
}
