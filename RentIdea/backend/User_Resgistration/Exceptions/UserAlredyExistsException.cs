namespace Registration_Service.Exceptions
{
    public class UserAlredyExistsException:Exception
    {
        public UserAlredyExistsException() { }
        public UserAlredyExistsException(string message) : base(message) { }
    }
}
