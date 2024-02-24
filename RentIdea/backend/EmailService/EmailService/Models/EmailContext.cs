using MongoDB.Driver;

namespace EmailService.Models
{
    public class EmailContext 
    {
        MongoClient client;
        IMongoDatabase database;
        public EmailContext(IConfiguration config)
        {
            client = new MongoClient(config.GetConnectionString("MyMongodbCon"));
            database = client.GetDatabase(config.GetSection("DatabaseName").Value);
        }
        public IMongoCollection<EmailDT> emailDT => database.GetCollection<EmailDT>("emailDT");
    }
}
