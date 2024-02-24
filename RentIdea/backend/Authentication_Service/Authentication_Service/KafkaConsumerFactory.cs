using Authentication_Service.Models;

namespace Authentication_Service
{
    public class KafkaConsumerFactory
    {

        private readonly IServiceProvider _serviceProvider;

        public KafkaConsumerFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public KafkaConsumer Create()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<Userdbcontext>();
                return new KafkaConsumer(dbContext);
            }
        }
    }
}
