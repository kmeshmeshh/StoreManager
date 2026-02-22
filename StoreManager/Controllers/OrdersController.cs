using Microsoft.AspNetCore.Mvc;
using StoreManager.BLL.Dtos;
using StoreManager.BLL.Managers;

namespace StoreManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderManager _orderManager;

        public OrdersController(IOrderManager orderManager)
        {
            _orderManager = orderManager;
        }

        [HttpGet]
        public ActionResult<IEnumerable<OrderReadDto>> GetAll()
        {
            return Ok(_orderManager.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<OrderReadDto> GetById(int id)
        {
            var order = _orderManager.GetById(id);

            if (order == null)
            {
                return NotFound(new { Message = "Order not found" });
            }

            return Ok(order);
        }

        [HttpPost]
        public ActionResult CreateOrder(OrderAddDto orderDto)
        {
            try
            {
                if (orderDto.Items == null || orderDto.Items.Count == 0)
                {
                    return BadRequest("Order must contain items.");
                }

                _orderManager.CreateOrder(orderDto);

                return Ok(new { Message = "Order created successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }
    }
}