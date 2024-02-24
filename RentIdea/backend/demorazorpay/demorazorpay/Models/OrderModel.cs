using MongoDB.Bson.Serialization.Attributes;

namespace demorazorpay.Models
{
    public class OrderModel
    {
        public int Amount { get; set; }
        public string OrderId { get; set; }
        public string UserId { get; set; }
        public string ProductId { get; set; }
        public string PayerName { get; set; }
        public string PayerEmail { get; set; }
        public string PayerPhone { get; set; }
        public DateTime DateTimeofPurchase { get; set; } = DateTime.Now;
        public string razorpay_payment_id { get; set; }
        [BsonId]
        public string razorpay_order_id { get; set; }
        public string razorpay_signature { get; set; }
    }
}
