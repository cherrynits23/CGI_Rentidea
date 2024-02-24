using Authentication_Service.Models;

namespace Authentication_Service.Repository
{
    public interface IUserRepo
    {

       User_Login Login(User_Login user);
    }
}
