using EmailService.Models;
using EmailService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmailService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailServices svc;
        public EmailController(IEmailServices svc)
        {
            this.svc = svc;
            
        }
        [HttpPost]
        public IActionResult SendEmail(EmailDT emaildt)
        {
            try
            {
                svc.SendEmail(emaildt);
                svc.AddMailData(emaildt);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet]
        public IActionResult GetEmailDetails(string paymentId)
        {
            try
            {
                return Ok(svc.GetEmailAllDetails(paymentId));
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

    }
}
