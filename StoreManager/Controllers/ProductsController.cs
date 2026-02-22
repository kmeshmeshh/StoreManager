using Microsoft.AspNetCore.Mvc;
using StoreManager.BLL.Dtos;
using StoreManager.BLL.Managers;

namespace StoreManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductManager _prodManager;

        public ProductsController(IProductManager prodManager)
        {
            _prodManager = prodManager;
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            return Ok(_prodManager.GetAll());
        }

        [HttpGet("{id:int}")]
        public ActionResult GetById(int id)
        {
            return Ok(_prodManager.GetById(id));

        }


        [HttpPost]
        public ActionResult Add(ProductAddDto productAddDto)
        {
            _prodManager.Add(productAddDto);
            return NoContent();
        }

        [HttpPut("{Id}")]
        public ActionResult Edit (int Id , ProductUpdateDto productUpdateDto)
        {
            if(Id != productUpdateDto.Id)
            {
                return BadRequest();
            }
            _prodManager.Update(productUpdateDto);
            return NoContent();
        }

        [HttpDelete("{Id}")]
        public ActionResult Delete(int Id)
        {
            _prodManager.Delete(Id);
            return NoContent();
        }
        [HttpGet("by-code/{code}")]
        public ActionResult GetByCode(string code)
        {
            var product = _prodManager.GetByCode(code);

            if (product == null)
            {
                return NotFound(new { Message = $"Product with code {code} not found" });
            }

            return Ok(product);
        }


    }
}
