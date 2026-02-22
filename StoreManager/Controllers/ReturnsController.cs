using Microsoft.AspNetCore.Mvc;
using StoreManager.BLL.Dtos;
using StoreManager.BLL.Managers;
using StoreManager.DAL.Repository;

namespace StoreManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReturnsController : ControllerBase
    {
        private readonly IReturnManager _returnManager;
        private readonly IReturnRepository _returnRepo;

        public ReturnsController(IReturnManager returnManager, IReturnRepository returnRepo)
        {
            _returnManager = returnManager;
            _returnRepo = returnRepo;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReturn([FromBody] CreateReturnDto returnDto)
        {
            try
            {
                var result = await _returnManager.ProcessReturnAsync(returnDto);

                if (result)
                {
                    return Ok(new { Message = "تم حفظ المرتجع وتحديث المخزون بنجاح" });
                }
                return BadRequest("حدث خطأ أثناء حفظ المرتجع");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReturns()
        {
            var returns = await _returnRepo.GetAllReturnsAsync();
            return Ok(returns);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReturnById(int id)
        {
            var returnInvoice = await _returnRepo.GetReturnByIdAsync(id);

            if (returnInvoice == null)
                return NotFound("هذا المرتجع غير موجود");

            return Ok(returnInvoice);
        }

        [HttpGet("order/{originalInvoiceId}")]
        public async Task<IActionResult> GetReturnsByOrder(int originalInvoiceId)
        {
            var returns = await _returnRepo.GetReturnsByOriginalInvoiceIdAsync(originalInvoiceId);
            return Ok(returns);
        }
    }
}