using MongoDB.Driver;
using System.Linq;
using products.Model;

namespace products.Repository
{
    public class ProductRepository : IProductRepository
    {

        private readonly DataContext context;
        public ProductRepository(DataContext context)
        {
            this.context = context;
        }
        public void AddProduct(Product product)
        {
            context.products.InsertOne(product);
        }

        public void DeleteProduct(string id)
        {
            context.products.DeleteOne(t => t.ProductId == id);
        }

        public List<Product> GetProductsbyrenter(string renterName)
        {
            return context.products.Find(t => t.renterName.Equals(renterName)).ToList();
        }

        public Product GetProductbyid(string id)
        {
            return context.products.Find(t => t.ProductId == id).FirstOrDefault();
        }

        public List<Product> GetProduct(string subCategeory)
        {
            return context.products.Find(t => t.subCategeory == subCategeory).ToList();
        }

        public List<Product> GetProductcompany(string company)
        {
            return context.products.Find(t => t.company == company).ToList();
        }

        public List<Product> GetProducts(string Categeory)
        {
            return context.products.Find(t => t.Categeory == Categeory).ToList();
        }
        public List<Product> GetAllProducts()
        {
            return context.products.Find(t => true).ToList();
        }

        public void AddImage(string id, byte[] image)
        {
            var filter = Builders<Product>.Filter.Eq(o => o.ProductId, id);
            var update = Builders<Product>.Update.Set(o => o.productimage, image);
            context.products.UpdateOne(filter, update);
            //Product product = GetProductbyid(id);
            //product.productimage = image;
        }


    }
}
