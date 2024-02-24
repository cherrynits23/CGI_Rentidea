namespace products.Model
{
    public class FileModel
    {
        public string ProductId { get; set; }
        public FileModel()
        {
            Random random = new Random();
            int pid = random.Next();
            ProductId = pid.ToString();
        }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double ProductPrice { get; set; }
        public string Categeory { get; set; }

        public string subCategeory { get; set; }
        public string company { get; set; }
        public IFormFile productimage { get; set; }
        public string renterName { get; set; }
        //public IFormFile FormFile { get; set; }
    }
}
