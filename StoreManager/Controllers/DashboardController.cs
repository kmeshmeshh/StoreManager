using Microsoft.AspNetCore.Mvc;
using StoreManager.BLL.Managers;

namespace StoreManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardManager _dashboardManager;

        public DashboardController(IDashboardManager dashboardManager)
        {
            _dashboardManager = dashboardManager;
        }

        [HttpGet]
        public IActionResult GetStats([FromQuery] DateTime date)
        {
            var stats = _dashboardManager.GetStats(date);
            return Ok(stats);
        }
    }
}