using Microsoft.AspNetCore.Mvc;
using StoreManager.BLL.Managers;

namespace StoreManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerManager _customerManager;
        public CustomersController(ICustomerManager customerManager)
        {
            _customerManager = customerManager;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var customers = _customerManager.GetAll();
            return Ok(customers);
        }
    }
}