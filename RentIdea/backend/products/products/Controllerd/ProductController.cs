using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using products.Exceptions;
using products.Model;
using products.Services;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using System.Text.Json;

namespace products.Controllerd
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService svc;
        public ProductController(IProductService svc)
        {
            this.svc = svc;
        }


        //[HttpPost("AddProduct")]
        //public IActionResult create(Product productobj)
        //{
        //    try
        //    {
        //        svc.AddProduct(productobj);
        //        return StatusCode(201, "product Added");
        //    }
        //    catch (productAlreadyExistsException e)
        //    {
        //        return Conflict(e.Message);
        //    }
        //    catch (Exception e)
        //    {
        //        return StatusCode(500, e.Message);
        //    }
        //}


        // if the image is adding along withdata
        //[HttpPost("AddProduct")]
        //public IActionResult Create(Product pr, IFormFile image)
        //{
        //    try
        //    {
        //        Product product = JsonSerializer.Deserialize<Product>(pr);
        //        if (image != null)
        //        {
        //            using (MemoryStream ms = new MemoryStream())
        //            {

        //                image.CopyTo(ms);
        //                product.productimage = ms.ToArray();
        //            }
        //        }
        //        svc.AddProduct(product);
        //        return StatusCode(200, "Product Added Successfully");
        //    }
        //    catch (productAlreadyExistsException)
        //    {
        //        throw new productAlreadyExistsException("product Already Exist");
        //    }
        //}

        [HttpPost]
        public IActionResult Create([FromForm] FileModel fileobj)
        {
            try
            {
                Product prodobj = new Product();
                prodobj.renterName = fileobj.renterName;
                prodobj.ProductName = fileobj.ProductName;
                prodobj.ProductDescription = fileobj.ProductDescription;
                prodobj.ProductPrice = fileobj.ProductPrice;
                prodobj.Categeory = fileobj.Categeory;
                prodobj.subCategeory = fileobj.subCategeory;
                prodobj.company = fileobj.company;
                prodobj.ProductId = fileobj.ProductId;

                using (MemoryStream ms = new MemoryStream())
                {
                    fileobj.productimage.CopyTo(ms);
                    prodobj.productimage = ms.ToArray();
                }
                svc.AddProduct(prodobj);
                return Created("", prodobj);

            }
            catch (productAlreadyExistsException)
            {
                throw new productAlreadyExistsException("product Already Exist");
            }

        }
        [HttpGet("subCategeory")]
        public IActionResult list(string subCategeory)
        {
            try {
                svc.GetProduct(subCategeory);
                return Ok(svc.GetProduct(subCategeory));
            }
            catch (NoProductsExistsException e)
            {
                return Conflict(e.Message);
            }
        }

        [HttpGet("renterName")]
        public IActionResult list4(string renterName)
        {

            return Ok(svc.GetProductsbyrenter(renterName));

        }


        [HttpGet("categeory")]
        public IActionResult list1(string Categeory)
        {
            try
            {

                svc.GetProduct(Categeory);
                return Ok(svc.GetProducts(Categeory));
            }
            catch (NoProductsExistsException e)
            {
                return Conflict(e.Message);
            }
        }


        [HttpGet("Productcompany")]
        public IActionResult list3(string company)
        {
            try
            {
                svc.GetProduct(company);
                return Ok(svc.GetProductcompany(company));
            }
            catch (nocompanyproductsexception e)
            {
                return Conflict(e.Message);
            }

        }


        [HttpGet("{id}")]
        public IActionResult get(string id)
        {
            try
            {
                return Ok(svc.GetProductbyid(id));
            }
            catch (ProductDoesNotExistsException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("GetAllProducts")]
        public IActionResult get()
        {
            return Ok(svc.GetAllProducts());
        }
        [HttpPut]
        [Route("update/image")]
        public IActionResult Addproductimage([FromForm] FileModel file)
        {
            try
            {

                //using (MemoryStream ms = new MemoryStream())
                //{
                //    file.FormFile.CopyTo(ms);

                //    svc.AddImage(file.ProductId, ms.ToArray());
                //}
                //return Ok(" image updated sucessfully");
                svc.AddImage(file.ProductId, file.productimage);
                return Ok("Image updated sucessfully");
            }
            catch (ProductDoesNotExistsException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("DeleteProduct")]
        public IActionResult delete(string id)
        {
            try
            {
                svc.DeleteProduct(id);
                return Ok("Product deleted");
            }
            catch (ProductDoesNotExistsException e)
            {
                return NotFound(e.Message);
            }
        }

    }
}
