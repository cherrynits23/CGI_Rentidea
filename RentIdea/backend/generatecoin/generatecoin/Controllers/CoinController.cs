using generatecoin.Models;
using generatecoin.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace generatecoin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinController : ControllerBase
    {
        private readonly ICoinService svc;
        public CoinController(ICoinService svc)
        {
            this.svc = svc;
        }

        [HttpPost("CreateCoinOrder")]
        public IActionResult Create(coinorder cobj) // note obj will be passed in te req.body
        {
            try
            {
                svc.AddOrder(cobj);
                return StatusCode(201, "Created");
            }
            catch (Exception e)
            {
                return StatusCode(409, e.Message);  /////worng
            }
           
        }

        [HttpGet("GetAllOrders")]
        public IActionResult GetOrders(string oid)
        {
            return Ok(svc.GetOrder(oid));
        }

        [HttpGet("GetOrderbyUserId")]
        public IActionResult GetOrderbyUserId(string user_id)
        {
            var res = svc.GetOrdersByUserId(user_id);
            return StatusCode(200, res);
        }

        [HttpGet("GetOrderByPaymentId")]
        public IActionResult GetOrdersbyPaymentId(string payid)
        {
            var res = svc.GetOrderbyPaymentid(payid);
            return StatusCode(200, res);
        }


    }
}
