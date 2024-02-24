using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Registration_Service.Models
{
    public class User
    {
        internal object state;

        [BsonId]

        public string User_id { get; set; }
        public User()
        {
            Random random = new Random();
            int usrid = random.Next();
            User_id = usrid.ToString();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
       // public string Gender { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
       public string Gender { get; set; }
        public string State { get; set; }
       public string District { get; set; }
        public int coin { get; set; }


    }
}
