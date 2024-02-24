namespace products.Exceptions
{
    public class productAlreadyExistsException : Exception
    {
        public productAlreadyExistsException()
        {

        }
        public productAlreadyExistsException(string message) : base(message)
        {

        }
    }
}
