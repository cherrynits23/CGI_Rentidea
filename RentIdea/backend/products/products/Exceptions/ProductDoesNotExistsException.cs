namespace products.Exceptions
{
    public class ProductDoesNotExistsException : Exception
    {
        public ProductDoesNotExistsException()
        {

        }
        public ProductDoesNotExistsException(string message) : base(message)
        {

        }
    }
}
