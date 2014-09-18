using SlowAndDangerous.Data;
using SlowAndDangerous.Models;
using SlowAndDangerous.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SlowAndDangerous.WebAPI.Controllers
{
    public class CarsController : ApiController
    {
        private ISlowAndDangerousData data;

        public CarsController()
            : this(new SlowAndDangerousData())
        {

        }

        public CarsController(ISlowAndDangerousData data)
        {
            this.data = data;
        }

        [HttpGet]
        public IHttpActionResult All()
        {
            var cars = this.data
                .Cars
                .All()
                .Select(CarModel.FromCar);

            return Ok(cars);
        }

        [HttpPost]
        public IHttpActionResult Create(CarModel car)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCar = new Car
            {
                Model = car.Model,
                Manufacturer = car.Manufacturer, 
            };

            this.data.Cars.Add(newCar);
            this.data.SaveChanges();

            car.Id = newCar.Id;
            return Ok(car);
        }
    }
}