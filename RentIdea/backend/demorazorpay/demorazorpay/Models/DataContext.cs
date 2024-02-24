using MongoDB.Driver;

namespace demorazorpay.Models
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
        public IMongoCollection<OrderModel> orders => database.GetCollection<OrderModel>("orders");
        public IMongoCollection<PaymentModel> payments => database.GetCollection<PaymentModel>("payments");
    }
}
