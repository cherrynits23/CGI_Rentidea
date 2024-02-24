using Confluent.Kafka;
using MongoDB.Driver;

namespace Authentication_Service.Models
{
    public class Userdbcontext
    {
        MongoClient client;
        IMongoDatabase database;
        public Userdbcontext(IConfiguration config)
        {
            client = new MongoClient(config.GetConnectionString("MyMongodbCon"));
            database = client.GetDatabase(config.GetSection("DatabaseName").Value);
        }
        public IMongoCollection<User_Login> trainee => database.GetCollection<User_Login>("authdb");

    }
}
