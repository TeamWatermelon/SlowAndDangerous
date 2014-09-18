﻿using SlowAndDangerous.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace SlowAndDangerous.WebAPI.Models
{
    public class AppointmentModel
    {
        public static Expression<Func<Appointment, AppointmentModel>> FromAppointment
        {
            get
            {
                return a => new AppointmentModel
                {
                    Id = a.Id,
                    Status = a.Status,
                    Date = a.Date,
                    City = a.City.Name,
                    Instructor = a.Instructor.UserName, 
                    Student = a.Student.UserName
                };
            }
        }
        public int Id { get; set; }

        [Required]
        public Status Status { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string City { get; set; }

        public string Instructor { get; set; }

        public string Student { get; set; }
    }
}