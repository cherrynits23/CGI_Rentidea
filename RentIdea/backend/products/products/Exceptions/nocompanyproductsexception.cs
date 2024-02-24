namespace products.Exceptions
{
    public class nocompanyproductsexception : Exception
    {
        public nocompanyproductsexception() { }
        public nocompanyproductsexception(string message): base (message) { }
    }
}
