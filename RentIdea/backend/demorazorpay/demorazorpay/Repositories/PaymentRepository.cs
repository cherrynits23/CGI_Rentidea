using Amazon.Runtime.Internal;
using demorazorpay.Models;
using MongoDB.Driver;

namespace demorazorpay.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly DataContext context;
        public PaymentRepository(DataContext context)
        {
            this.context = context;
        }
        public void AddOrder(OrderModel request)
        {
            context.orders.InsertOne(request);
        }

        public void AddPayment(PaymentModel pay)
        {
            context.payments.InsertOne(pay);
        }

        public OrderModel GetOrder(string orderId)
        {
            return context.orders.Find(o=>o.razorpay_order_id == orderId).FirstOrDefault();
        }

        public List<OrderModel> GetOrdersByUserId(string userId)
        {
            return context.orders.Find(o=>o.UserId == userId).ToList();
        }

        public PaymentModel GetPaymentByOrderId(string orderId)
        {
            return context.payments.Find(p => p.razorpay_order_id == orderId).FirstOrDefault();
        }

        public PaymentModel GetPaymentByPaymentId(string paymentId)
        {
            return context.payments.Find(p => p.razorpay_payment_id == paymentId).FirstOrDefault();
        }

        public PaymentModel GetPaymentBySignature(string signature)
        {
            return context.payments.Find(p => p.razorpay_signature == signature).FirstOrDefault();
        }

        public void UpdateOrder(OrderModel odr ,PaymentModel pay) 
        {
            //var filter = Builders<OrderModel>.Filter.Where(o => o.OrderId == pay.RazorPayOrderId);
            //var update = Builders<OrderModel>.Update
            //    .Set(o => o.RazorPayOrderId, pay.RazorPayOrderId)
            //    .Set(o => o.RazorPayPaymentId, pay.RazorPayPaymentId)
            //    .Set(o => o.RazorPaySignature, pay.RazorPaySignature);
            //context.orders.UpdateOne(filter, update);
            
                var filter = Builders<OrderModel>.Filter.Eq(od => od.razorpay_order_id, odr.razorpay_order_id);
                var update = Builders<OrderModel>.Update
                    .Set(od => od.razorpay_payment_id, pay.razorpay_payment_id)
                    .Set(od => od.razorpay_signature, pay.razorpay_signature);

                var updateResult = context.orders.UpdateOne(filter, update);
            

        }

        public List<OrderModel> GetOrdersByEmail(string email)
        {
            return context.orders.Find(o => o.PayerEmail == email).ToList();
        }
    }
}
