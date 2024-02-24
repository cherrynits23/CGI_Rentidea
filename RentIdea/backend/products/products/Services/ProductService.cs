using products.Model;
using products.Repository;
using products.Exceptions;
using System.Data;

namespace products.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository repo;

        public ProductService(IProductRepository repo)
        {
            this.repo = repo;
        }
        public void AddProduct(Product product)
        {
            //var res = repo.GetProductbyid(product.ProductId);
            //if (res != null)
            //{
            //    throw new productAlreadyExistsException($"product with id {product.ProductId} already exists");
            //}
            //else
            //{
                repo.AddProduct(product);
            //}
        }

        public void DeleteProduct(string id)
        {
            // throw new NotImplementedException();
            var res = repo.GetProductbyid(id);
            if (res != null)
            {
                repo.DeleteProduct(id);
            }
            else
            {
                throw new ProductDoesNotExistsException($"product with id {id} does not exists");

            }
        }

        public Product GetProductbyid(string id)
        {
            var res = repo.GetProductbyid(id);
            if (res != null)
            {
                return repo.GetProductbyid(id);
            }
            else
            {
                throw new ProductDoesNotExistsException($"product with id {id} does not exists");

            }
        }
        public void AddImage(string id , IFormFile image)
        {
            //Product product = GetProductbyid(id);

            if (image == null)
            {
                //repo.AddImage(id, image);
                throw new ArgumentNullException("image is not uploaded");
            }


            //
            byte[] imageByte;
            using (var stream = new MemoryStream())
            {
                image.CopyTo(stream);
                imageByte = stream.ToArray();
            }
            repo.AddImage(id, imageByte);
            //else
            //{
            //    throw new ProductDoesNotExistsException($"product with id {id} doesnot exist");
            //}
        }

        public List<Product> GetProduct(string subCategeory)
        {
            return repo.GetProduct(subCategeory);
        }

        public List<Product> GetProductcompany(string company)
        {
            return repo.GetProductcompany(company);
        }

        public List<Product> GetAllProducts()
        {
            return repo.GetAllProducts();
        }
        public List<Product> GetProducts(string Categeory)
        {
            return repo.GetProductcompany(Categeory);
        }
        public List<Product> GetProductsbyrenter(string renterName)
        {
            var res = repo.GetProductsbyrenter(renterName);
            if (res != null)
            {
                return repo.GetProductsbyrenter(renterName);
            }
            else
            {
                throw new ProductDoesNotExistsException($"Product with id {renterName} does not exist");
            }
        }
    }
}
