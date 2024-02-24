using MongoDB.Bson;
using Registration_Service.Models;

namespace Registration_Service.Repository
{
    public interface IRepouser
    {
        void AddUser(User users);
        User GetUser(string email);
        void DeleteUser(string email);

        List<User> GetAllUser();
        void UpdateUser( User users);
        void updateCoin(User users);
    }
}
