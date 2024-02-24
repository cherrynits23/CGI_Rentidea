using Amazon.Runtime.Internal.Transform;
using demorazorpay.Models;
using demorazorpay.Repositories;
using Razorpay.Api;

namespace demorazorpay.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository repo;
        public PaymentService(IPaymentRepository repo)
        {
            this.repo = repo;
        }
        public Order CreateOrder(string apiKey, string apiSecret, OrderModel o)
        {
            RazorpayClient client = new RazorpayClient(apiKey, apiSecret);

            Dictionary<string, object> options = new Dictionary<string, object>();
            options.Add("amount", o.Amount); // amount in the smallest currency unit
            options.Add("receipt", o.OrderId);
            options.Add("currency", "INR");
            Order order = client.Order.Create(options);

            if(order!= null)
            {
                o.razorpay_order_id = order.Attributes.id;
                repo.AddOrder(o);
                return order;
            }
            else
            {
                throw new Exception("Bad Gateway");
            }
        }

        public void VerifyPayment(string apiKey, string apiSecret, PaymentModel p)
        {
            //RazorpayClient client = new RazorpayClient(apiKey, apiSecret);
            //Dictionary<string, string> attributes = new Dictionary<string, string>();

            //attributes.Add("razorpaypayementid", p.RazorPayPaymentId);
            //attributes.Add("razorpayorderid", p.RazorPayOrderId);
            //attributes.Add("razorpaysignature", p.RazorPaySignature);

            //Utils.verifyPaymentSignature(attributes);
            //OrderModel o = repo.GetOrder(p.RazorPayOrderId);
            //repo.UpdateOrder(o, p);
            RazorpayClient client = new RazorpayClient(apiKey, apiSecret);
            Dictionary<string, string> attributes = new Dictionary<string, string>();

            attributes.Add("razorpay_payment_id", p.razorpay_payment_id);
            attributes.Add("razorpay_order_id", p.razorpay_order_id);
            attributes.Add("razorpay_signature", p.razorpay_signature);

            Utils.verifyPaymentSignature(attributes);
            OrderModel o = repo.GetOrder(p.razorpay_order_id);
            repo.UpdateOrder(o, p);

        }
        public List<OrderModel> GetOrdersByEmail(string email)
        {

            var res = repo.GetOrdersByEmail(email);
            if (res != null)
            {
                return repo.GetOrdersByEmail(email);
            }
            else
            {
                throw new NotImplementedException($"{email} does not exist");
            }
        }

    }
}
