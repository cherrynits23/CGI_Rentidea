using MongoDB.Bson;
using Registration_Service.Exceptions;
using Registration_Service.Models;
using Registration_Service.Repository;

namespace Registration_Service.ServiceRepo
{
    public class ServiceRepo:IServiceRepo
    {
        private readonly IRepouser repo;
        public ServiceRepo(IRepouser repo)
        {
            this.repo = repo;
        }

        public void AddUser(User users)
        {
            var res = repo.GetUser(users.Email);
            if (res != null)
            {
                throw new UserAlredyExistsException($"Trainee with id {users.Email} already exists");
            }
            else
            {
                repo.AddUser(users);
            }
        }

        public void DeleteUser(string email)
        {
            var res = repo.GetUser(email);
            if (res != null)
            {
                repo.DeleteUser(email);
            }
            else
            {
                throw new UserDoesnotExistsException($"Trainee with id {email} does not exists");

            }
        }

        public List<User> GetAllUser()
        {
            return repo.GetAllUser();
        }

        public User GetUser(string email)
        {
            var res = repo.GetUser(email);
            if (res != null)
            {
                return repo.GetUser(email);
            }
            else
            {
                throw new UserDoesnotExistsException($"Trainee with id {email} does not exists");

            }
        }

       public void UpdateUser( User users)
        {
            var res = repo.GetUser(users.Email);
            if (res != null)
            {
                repo.UpdateUser(users);
            }
            else
            {
                throw new UserDoesnotExistsException($"Trainee with id {users.Email} does not exists");

            }
        }

        public void coinUpdate(User users)
        {
            var res = repo.GetUser(users.Email);
            if (res != null)
            {
                repo.updateCoin(users);
            }
            else
            {
                throw new UserDoesnotExistsException($"Trainee with id {users.Email} does not exists");

            }
        }
    }
}
