using Confluent.Kafka;
using Authentication_Service.Models;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.Scaffolding;
using Authentication_Service.Models;
using Microsoft.EntityFrameworkCore;
using DnsClient;

namespace Authentication_Service
{
    public class KafkaConsumer :IHostedService
    {

        private readonly IConsumer<Ignore, string> consumer;
        private Task ConsumerTask;
        private CancellationTokenSource canceltoken;
        private readonly Userdbcontext context;
        public KafkaConsumer(Userdbcontext context)
        {

            this.context = context;

            ConsumerConfig cconfig = new ConsumerConfig
            {
                BootstrapServers = "localhost:9092",
                GroupId = "test_group",
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            consumer = new ConsumerBuilder<Ignore, string>(cconfig).Build();
            consumer.Subscribe("userdetails");
            canceltoken = new CancellationTokenSource();
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            ConsumerTask = Task.Factory.StartNew(() => StartConsuming(), TaskCreationOptions.LongRunning);
            return Task.CompletedTask;
        }


        public async Task StopAsync(CancellationToken cancellationToken)
        {
            canceltoken.Cancel();
            if (ConsumerTask != null)
            {
                await Task.WhenAny(ConsumerTask, Task.Delay(TimeSpan.FromSeconds(5)));
            }

            consumer.Close();
            consumer.Dispose();
        }
        private void StartConsuming()
        {
            while (!canceltoken.Token.IsCancellationRequested)
            {
                try
                {
                    var consumeresult = consumer.Consume(canceltoken.Token);
                    var userData = JsonConvert.DeserializeObject<User_Login>(consumeresult.Message.Value);
                    consumer.Commit(consumeresult);
                    context.trainee.InsertOne(userData);

                }
                catch (ConsumeException ex)
                {

                }

            }
        }

        public void Dispose()
        {
            StopAsync(CancellationToken.None).Wait();
        }
    }
}
