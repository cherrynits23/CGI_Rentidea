using MongoDB.Driver;

namespace generatecoin.Models
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
        public IMongoCollection<coinorder> orders => database.GetCollection<coinorder>("orders");
    }
}
