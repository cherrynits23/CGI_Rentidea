using Microsoft.AspNetCore.Mvc;
using Registration_Service.Exceptions;
using Registration_Service.Models;
using Registration_Service.ServiceRepo;
using Newtonsoft.Json;
using Confluent.Kafka;

namespace Registration_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration config;
        private readonly IServiceRepo svc;
        public UserController(IServiceRepo svc,IConfiguration config)
        {
            this.svc = svc;
            this.config = config;
        }
        [HttpPost]
        public async Task<IActionResult> create(User users)
        {
            
            
               svc.AddUser(users);
               
            string msg = JsonConvert.SerializeObject(users);
            ProducerConfig pconfig = new ProducerConfig
            {
                BootstrapServers = config["Kafka:Server"]
            };

            using (var producer = new ProducerBuilder<Null, string>(pconfig).Build())
            {
                var result = await producer.ProduceAsync("userdetails", new Message<Null, string>
                {
                    Value = msg
                });
            }
            return await Task.FromResult(Ok(new
            {
                Status = 200,
                message = "User Added!"
            }));



        }

        [HttpGet]
        public IActionResult list()
        {
            return Ok(svc.GetAllUser());
        }
        [HttpGet("email")]
        public IActionResult get(string email)
        {
            try
            {
                return Ok(svc.GetUser(email));
            }
            catch (UserDoesnotExistsException e)
            {
                return NotFound(e.Message);
            }
        }
        [HttpDelete]
        public IActionResult delete(string email)
        {
            try
            {
                svc.DeleteUser(email);
                return Ok("User deleted");
            }
            catch (UserDoesnotExistsException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut]
        public IActionResult update( User userobj)
        {
            try
            {
                svc.UpdateUser( userobj);
                return Ok("sucessfully updated");
            }
            catch (UserDoesnotExistsException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("updateC")]
        public IActionResult updateCoin(User userobj)
        {
            try
            {
                svc.coinUpdate(userobj);
                return Ok("sucessfully updated");
            }
            catch (UserDoesnotExistsException e)
            {
                return NotFound(e.Message);
            }
        }

    }
}
