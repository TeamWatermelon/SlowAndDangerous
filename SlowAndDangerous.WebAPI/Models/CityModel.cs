using SlowAndDangerous.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace SlowAndDangerous.WebAPI.Models
{
    public class CityModel
    {
        public static Expression<Func<City, CityModel>> FromCity
        {
            get
            {
                return a => new CityModel
                {
                    Id = a.Id,
                    Name = a.Name
                };
            }
        }

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}