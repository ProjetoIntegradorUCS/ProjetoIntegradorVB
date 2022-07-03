using Microsoft.AspNetCore.Mvc;
using ProjetoIntegradorVB.Models;

namespace ProjetoIntegradorVB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrandController : ControllerBase
    {
        [HttpGet(Name = "GetBrands")]
        public List<Brand> Get()
        {
            var retorno = new List<Brand>();
            return retorno;
        }
    }
}
