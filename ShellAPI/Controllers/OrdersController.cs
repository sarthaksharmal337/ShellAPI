using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShellAPI.Data;
using ShellAPI.Data.Entities;

namespace ShellAPI.Controllers
{
    [Route("api/[controller]/[action]/{branchId?}/{items?}")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        [HttpGet]
        public IActionResult single(int branchId)
        {
            AppDbContext context = new AppDbContext();

            if (Request.Headers.ContainsKey("X-Token"))
            {
                var token = Request.Headers.GetCommaSeparatedValues("X-Token").First();

                var user = context.Users.SingleOrDefault(u => u.Token == token);

                if (user != null)
                {
                    try
                    {
                        var order = context.Orders.Single(o => o.Id == branchId);

                        var ids   = order.ItemIds.Split(',');
                        var items = context.Items.Where(o => ids.Contains(o.Id.ToString())).ToList();

                        order.items = items;
                        order.price = items.Sum(i => i.Price);
                        order.branch = context.Branches.Find(order.BranchId);

                        return Ok(order);
                    } catch(Exception ex)
                    {
                        return NotFound();
                    }
                }
            }

            return Unauthorized();
        }

        [HttpGet]
        public IActionResult get()
        {
            AppDbContext context = new AppDbContext();

            if (Request.Headers.ContainsKey("X-Token"))
            {
                var token = Request.Headers.GetCommaSeparatedValues("X-Token").First();

                var user = context.Users.SingleOrDefault(u => u.Token == token);

                if (user != null)
                {
                    var orders = context.Orders.OrderByDescending(o => o.Created).Where(o => o.UserId == user.Id).ToList();

                    foreach(Order order in orders)
                    {
                        var ids = order.ItemIds.Split(',');
                        var items = context.Items.Where(o => ids.Contains(o.Id.ToString())).ToList();

                        order.items  = items;
                        order.price  = items.Sum(i => i.Price);
                        order.branch = context.Branches.Find(order.BranchId);
                    }


                    return Ok(orders);
                }

            };

            return Unauthorized();
        }

        [HttpPost]
        public IActionResult create(int branchId, string items)
        {
            AppDbContext context = new AppDbContext();

            if (Request.Headers.ContainsKey("X-Token"))
            {
                var token = Request.Headers.GetCommaSeparatedValues("X-Token").First();

                var user = context.Users.SingleOrDefault(u => u.Token == token);

                if (user != null)
                {
                    var branch = context.Branches.Find(branchId);

                    if(branch != null)
                    {
                        var split = items.Replace(" ", "").Split(',');
                        var itemRows = context.Items.Where(i => split.Contains(i.Id.ToString())).ToList();

                        if (itemRows.Count == split.Count())
                        {
                            var orderItem = new Order();

                            orderItem.UserId = user.Id;
                            orderItem.BranchId = branchId;
                            orderItem.ItemIds = items;
                            orderItem.Created = DateTime.UtcNow;

                            context.Orders.Add(orderItem);
                            context.SaveChanges();

                            orderItem.items  = itemRows;
                            orderItem.price  = itemRows.Sum(i => i.Price);
                            orderItem.branch = branch;

                            return Ok(orderItem);
                        } else
                        {
                            return BadRequest("Unknown Item.");
                        }
                    } else
                    {
                        return BadRequest("Unknown Branch.");
                    }

                }

                return BadRequest();

            };

            return Unauthorized();
        }
    }
}
