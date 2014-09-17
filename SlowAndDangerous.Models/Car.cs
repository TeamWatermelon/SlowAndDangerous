﻿namespace SlowAndDangerous.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Car
    {
        private ICollection<Appointment> appointments;

        public Car()
        {
            this.appointments = new HashSet<Appointment>();
        }

        public int Id { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Model { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}