using products.Model;

namespace products.Services
{
    public interface IProductService
    {
        void AddProduct(Product product);
        Product GetProductbyid(string id);
        void DeleteProduct(string id);
        List<Product> GetProducts(string Categeory);
        List<Product> GetProductsbyrenter(string renterName);
        List<Product> GetProduct(string subCategeory);
        List<Product> GetProductcompany(string company);
        List<Product> GetAllProducts();
        void AddImage(string id, IFormFile image);


    }
}
