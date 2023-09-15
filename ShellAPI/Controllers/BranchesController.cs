using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShellAPI.Data;
using ShellAPI.Data.Entities;

namespace ShellAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
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
                    var branches = context.Branches.Where(b => b.Name.ToLower().Contains(user.Country.ToLower())).ToList();

                    return Ok(branches);
                }

            };

            return Unauthorized();
        }
    }
}
