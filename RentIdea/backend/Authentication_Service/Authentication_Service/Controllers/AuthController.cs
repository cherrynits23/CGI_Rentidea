using Authentication_Service.Models;
using Authentication_Service.Repository;
using Authentication_Service.Token_Generator;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authentication_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepo repo;
        private readonly ITokenGenerator tg;
        public AuthController(IUserRepo repo, ITokenGenerator tg)
        {
            this.repo = repo;
            this.tg = tg;
        }
        string token;
        [HttpPost]
        [Route("Login")]
        public IActionResult Login(User_Login user)
        {

            var res = repo.Login(user);
            if (res != null)
            {

                //tg.Generatetoken(user.Email, user.Password);
                var token = tg.Generatetoken(user.Email, user.Password);
                return Ok(new {token});
                
            }
            else
            {
                return StatusCode(401, "Invalid Credentials");
            }

        }

        
    }
}
