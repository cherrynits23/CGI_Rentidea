using demorazorpay.Models;

namespace demorazorpay.Repositories
{
    public interface IPaymentRepository
    {
        void AddOrder(OrderModel request);
        OrderModel GetOrder(string orderId);
        List<OrderModel> GetOrdersByUserId(string userId);
        void AddPayment(PaymentModel pay);
        PaymentModel GetPaymentByPaymentId(string paymentId);
        PaymentModel GetPaymentByOrderId(string orderId);
        PaymentModel GetPaymentBySignature(string signature);
        void UpdateOrder(OrderModel odr, PaymentModel pay);
        List<OrderModel> GetOrdersByEmail(string email);
    }
}
