using EmailService.Models;
using MailKit.Security;
using MimeKit;
using MailKit.Net.Smtp;
using MimeKit.Text;
using MongoDB.Driver;

namespace EmailService.Services
{
    public class EmailServices : IEmailServices
    {

        private readonly IConfiguration config;
        private readonly EmailContext context;

        public EmailServices(IConfiguration config, EmailContext context)
        {
            this.config = config;
            this.context = context;
        }

        public void AddMailData(EmailDT emaildt)
        {
            context.emailDT.InsertOne(emaildt);
        }


        public EmailDT GetEmailAllDetails(string id)
        {
            return context.emailDT.Find(t => t.paymentId == id).FirstOrDefault();
        }

        public void SendEmail(EmailDT emaildt)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(emaildt.To));
            email.Subject = emaildt.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = emaildt.Body };

            using var smtp = new SmtpClient();
            smtp.Connect(config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(config.GetSection("EmailUsername").Value, config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }

        
    }
}
