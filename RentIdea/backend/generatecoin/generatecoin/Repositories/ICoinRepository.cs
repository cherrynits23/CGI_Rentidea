using generatecoin.Models;

namespace generatecoin.Repositories
{
    public interface ICoinRepository
    {
        void AddOrder(coinorder request);
        coinorder GetOrder(string orderId);

        coinorder GetOrderbyPaymentid(string paymentid);
        List<coinorder> GetOrdersByUserId(string userId);
    }
}
