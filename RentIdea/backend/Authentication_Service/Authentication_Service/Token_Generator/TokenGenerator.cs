using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication_Service.Token_Generator
{
    public class TokenGenerator : ITokenGenerator
    {
        public string Generatetoken(string email, string password)
        {
            var claims = new[] { new Claim(ClaimTypes.Email, email), new Claim(ClaimTypes.NameIdentifier,password)};

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This_is_my_secret_key"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
    issuer: "authapi",
    audience: "Custapi",
    claims: claims,
    signingCredentials: credentials,
    expires: DateTime.Now.AddMinutes(20)

    );

            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            };

            return JsonConvert.SerializeObject(response);
        }
    }
}
