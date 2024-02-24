namespace products.Exceptions
{
    public class NoProductsExistsException : Exception
    {
        public NoProductsExistsException() 
        { 
        }
        public NoProductsExistsException(string message) : base(message) { }
    }
}
