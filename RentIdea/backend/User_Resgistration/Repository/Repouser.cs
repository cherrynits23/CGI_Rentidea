using MongoDB.Bson;
using MongoDB.Driver;
using Registration_Service.Models;

namespace Registration_Service.Repository
{
    public class Repouser : IRepouser
    {
        private readonly DataContext datacontext;
        public Repouser(DataContext datacontext)
        {
            this.datacontext = datacontext;
        }
       public  void  AddUser(User userobj)
        {
            datacontext.trainee.InsertOne(userobj);
        }

        public void DeleteUser(string email)
        {
            datacontext.trainee.DeleteOne(t => t.Email == email);
        }

        List<User> IRepouser.GetAllUser()
        {
            return datacontext.trainee.Find(t => true).ToList();
        }

       public  User GetUser(string email)
        {
            return datacontext.trainee.Find(t => t.Email == email).FirstOrDefault();
        }
       public void UpdateUser( User users)
        {
            var filter = Builders<User>.Filter.Where(t => t.Email == users.Email);
            var update = Builders<User>.Update.Set(t => t.FirstName, users.FirstName)
                .Set(t => t.LastName, users.LastName)
                .Set(t => t.Mobile, users.Mobile).Set(t => t.Address, users.Address)
                .Set(t => t.Email, users.Email)
                .Set(t => t.Password, users.Password)
                .Set(t => t.Gender, users.Gender)
                .Set(t=>t.State,users.State)

                .Set(t => t.District, users.District);
               
                

            datacontext.trainee.UpdateOne(filter, update);
        }

        void IRepouser.updateCoin(User users)
        {
            var filter = Builders<User>.Filter.Where(t => t.Email == users.Email);
            var update = Builders<User>.Update.Set(t => t.coin, users.coin);

            datacontext.trainee.UpdateOne(filter, update);
        }

    }
}
