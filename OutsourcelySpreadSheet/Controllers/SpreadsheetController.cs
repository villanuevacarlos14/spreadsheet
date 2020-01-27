using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OutsourcelySpreadSheet.Model;

namespace OutsourcelySpreadSheet.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SpreadsheetController : ControllerBase
    {
        [HttpPost]
        public IActionResult Evaluate(RequestModel data)
        {
            try 
            {
                
                double result = Convert.ToDouble(new DataTable().Compute(data.value, null));
                return Ok(result);
            }
            catch 
            {
                return BadRequest();
            }
           
        }
    }
}