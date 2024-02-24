using Amazon.Runtime.Internal;
using generatecoin.Models;
using MongoDB.Driver;

namespace generatecoin.Repositories
{
    public class CoinRepository : ICoinRepository
    {
        private readonly DataContext context;
        public CoinRepository(DataContext context) 
        {
            this.context = context;
        }

        public void AddOrder(coinorder request)
        {
            context.orders.InsertOne(request);
        }

        public coinorder GetOrder(string orderId)
        {
            return context.orders.Find(o => o.OrderId == orderId).FirstOrDefault();
        }

        public List<coinorder> GetOrdersByUserId(string userId)
        {
            return context.orders.Find(o => o.UserId == userId).ToList();
        }

        public coinorder GetOrderbyPaymentid(string paymentid)
        {
            return context.orders.Find(o => o.PaymentId == paymentid).FirstOrDefault();
        }
    }
}
