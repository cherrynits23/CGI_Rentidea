using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace products.Model
{
    public class Product
    {
        [BsonId]
        [BsonRequired]
        public string ProductId { get; set; }
        public Product()
        {
            Random random = new Random();
            int pid = random.Next();
            ProductId = pid.ToString();
        }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(20, ErrorMessage = "Name cannot exceed 20 characters")]
        public string ProductName { get; set; }

        [BsonRequired]

        public double ProductPrice { get; set; }

        [BsonRequired]
        [StringLength(20, ErrorMessage = "Name cannot exceed 20 characters")]
        public string Categeory { get; set; }

        [BsonRequired]
        [StringLength(20, ErrorMessage = "Name cannot exceed 20 characters")]
        public string subCategeory { get; set; }

        [BsonRequired]
        [StringLength(20, ErrorMessage = "Name cannot exceed 20 characters")]
        public string company { get; set; }

        [StringLength(200, ErrorMessage = "Description cannot exceed 200 characters.")]
        public string ProductDescription { get; set; }
        public byte[]? productimage { get; set; }
        public string renterName { get; set; }
    }
}
