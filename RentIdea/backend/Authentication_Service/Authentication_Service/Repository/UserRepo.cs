using Authentication_Service.Models;
using Microsoft.EntityFrameworkCore;
using Authentication_Service.Models;
using MongoDB.Driver;

namespace Authentication_Service.Repository
{
    public class UserRepo:IUserRepo
    {
        private readonly Userdbcontext context;
        public UserRepo(Userdbcontext context)
        {
            this.context = context;
        }
        public User_Login Login(User_Login users)
        {
            return context.trainee.Find(t => t.Email == users.Email && t.Password == users.Password).FirstOrDefault();
        }

    }
}
