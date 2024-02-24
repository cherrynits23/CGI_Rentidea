using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Authentication_Service.Models
{
    public class User_Login
    {
        [BsonId]
        public int Id { get; set; }
        public User_Login()
        {
            Random random = new Random();
            Id = random.Next();
        }
        public string Email { get; set; }
        public string Password { get; set; }



    }
}
