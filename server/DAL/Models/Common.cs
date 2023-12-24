using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Common
    {
    }

    public class State
    {
        public int State_id { get; set; }   
        public string StateName { get; set; }

    }
    public class City
    {
        public int City_id { get; set; }    
        public string City_name { get; set; }
        public int State_id { get; set; }
    }
    public class Location
    {
        public int Location_id { get; set; }
        public string Location_name { get; set; }
        public int City_id { get; set; }

    }

    public class Product
    {
        public int Product_id { get; set; }
        public string Product_name { get; set; }
        public int state_id { get; set; }
        public string state_name { get; set; }
        public string product_image { get; set; }

    }
    public class DelivaryRoots
    {
        public int DelivaryRoots_id { get; set; }

        public string DRoot_name { get; set; }
    }

    public class DelivaryBoys
    {
        public int db_id { get; set; }
        public string db_name { get; set; }
        public string db_address { get; set; }
        public string db_mob { get; set; }
        public string db_photo { get; set; }
    }
}
