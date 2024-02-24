using generatecoin.Models;
using generatecoin.Repositories;

namespace generatecoin.Services
{
    public class CoinService : ICoinService
    {
        private readonly ICoinRepository repo;

        public CoinService(ICoinRepository repo)
        {
            this.repo = repo;
        }
        public void AddOrder(coinorder request)
        {
            repo.AddOrder(request);
        }

        public coinorder GetOrder(string orderId)
        {
            return repo.GetOrder(orderId);
        }

        public List<coinorder> GetOrdersByUserId(string userId)
        {
            return repo.GetOrdersByUserId(userId);
        }

        public coinorder GetOrderbyPaymentid(string paymentid)
        {
            return repo.GetOrderbyPaymentid(paymentid);
        }

    }
}
