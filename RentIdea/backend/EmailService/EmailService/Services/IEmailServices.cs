using EmailService.Models;

namespace EmailService.Services
{
    public interface IEmailServices
    {
        void SendEmail(EmailDT emaildt);
        void AddMailData(EmailDT emaildt);
        EmailDT GetEmailAllDetails(string id);
    }
}
