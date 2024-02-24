namespace Authentication_Service.Token_Generator
{
    public interface ITokenGenerator
    {
        string Generatetoken(string email, string password);
    }
}
