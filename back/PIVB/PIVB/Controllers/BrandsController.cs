using Microsoft.AspNetCore.Mvc;

namespace PIVB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrandsController : ControllerBase
    {
        public BrandsController() { }

        [HttpGet]
        public List<Brand> Get()
        {
           var retorno = new List<Brand>();

            var brand1 = new Brand();
            brand1.brand_id = 1;
            brand1.brand_name = "Electra";

            var brand2 = new Brand();
            brand2.brand_id = 2;
            brand2.brand_name = "Haro";

            retorno.Add(brand1);
            retorno.Add(brand2);

            return retorno;

        }
    }
}
