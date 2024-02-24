using demorazorpay.Models;
using Razorpay.Api;

namespace demorazorpay.Services
{
    public interface IPaymentService
    {
        public Order CreateOrder(string apiKey, string apiSecret, OrderModel o);
        void VerifyPayment(string apiKey, string apiSecret, PaymentModel p);
        List<OrderModel> GetOrdersByEmail(string email);

    }
}
