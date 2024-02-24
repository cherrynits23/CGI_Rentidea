using demorazorpay.Models;
using demorazorpay.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Razorpay.Api;

namespace demorazorpay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private string apiKey;
        private string apiSecret;
        private readonly IPaymentService svc;

        public PaymentController(IConfiguration config ,IPaymentService svc)
        {
            apiKey = config["apiKey"];
            apiSecret = config["apiSecret"];
            this.svc = svc;
        }

        [HttpPost("initiate")]
        public IActionResult PaymentIntiated([FromBody] OrderModel order)
        {
            try
            {
                Order o = svc.CreateOrder(apiKey, apiSecret, order); 
                var json = JsonConvert.SerializeObject(o);
                return Ok(json);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost("verification")]
        public IActionResult PaymentCompleted([FromBody] PaymentModel pay)
        {
            try
            {
                svc.VerifyPayment(apiKey, apiSecret, pay);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpGet("GetOrdersByemail/{email}")]
        public IActionResult GetByEmail(string email)
        {
            try
            {
                var res = svc.GetOrdersByEmail(email);
                return Ok(res);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
