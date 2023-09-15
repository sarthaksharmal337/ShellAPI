using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShellAPI.Data;

namespace ShellAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            AppDbContext context = new AppDbContext();

            if (Request.Headers.ContainsKey("X-Token"))
            {
                var token = Request.Headers.GetCommaSeparatedValues("X-Token").First();
                Console.WriteLine(token);

                var user = context.Users.Single(u => u.Token == token);

                if (user != null)
                {
                    var items = context.Items.ToList();

                    return Ok(items);
                }

            };

            return Unauthorized();
        }
    }
}
