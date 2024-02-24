using MongoDB.Bson.Serialization.Attributes;

namespace generatecoin.Models
{
    public class coinorder
    {
        public int Amount { get; set; }
        public string OrderId { get; set; }
        public string UserId { get; set; }
       
        public DateTime DateTimeofPurchase { get; set; } = DateTime.Now;

        [BsonId]
        public string PaymentId { get; set; }
       
    }
}
