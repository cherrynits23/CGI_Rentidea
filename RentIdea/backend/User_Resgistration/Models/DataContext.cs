using MongoDB.Driver;

namespace Registration_Service.Models
{
    public class DataContext
    {

        MongoClient client;
        IMongoDatabase database;
        public DataContext(IConfiguration config)
        {
            client = new MongoClient(config.GetConnectionString("MyMongodbCon"));
            database = client.GetDatabase(config.GetSection("DatabaseName").Value);
        }
        public IMongoCollection<User> trainee => database.GetCollection<User>("regdb");

      //  public object Details { get; internal set; }
    }
}
