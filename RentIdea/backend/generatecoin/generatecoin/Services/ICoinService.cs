using generatecoin.Models;

namespace generatecoin.Services
{
    public interface ICoinService
    {
        void AddOrder(coinorder request);
        coinorder GetOrder(string orderId);
        List<coinorder> GetOrdersByUserId(string userId);
        coinorder GetOrderbyPaymentid(string paymentid);

    }
}
