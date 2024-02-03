using System.ComponentModel.DataAnnotations.Schema;

namespace DairyApp.Models
{
    //public class OrderInfo
    //{
    //        public string Order_Id { get; set; }
    //        public string User_Id { get; set; }
    //        public string Email_Id { get; set; }
    //        public DateTime Date { get; set; }

    //        [Column(TypeName = "nvarchar(max)")]
    //        public string AddressInfo { get; set; }

    //        [Column(TypeName = "nvarchar(max)")]
    //        public string OrderDetailsInfo { get; set; }

    //        public string PaymentMethod { get; set; }


    //}


    public class OrderInfo
    {
        public string Order_Id { get; set; }
        public string User_Id { get; set; }
        public string Email_Id { get; set; }
        public DateTime Date { get; set; }
        public AddressInfo AddressInfo { get; set; }
        public List<OrderDetailInfo> OrderDetailsInfo { get; set; }
        public string PaymentMethod { get; set; }
    }

    public class AddressInfo
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string pincode { get; set; }
        public string MobileNo { get; set; }
    }

    public class OrderDetailInfo
    {
        public int product_Id { get; set; }
        public string product_Name { get; set; }
        public decimal product_Price { get; set; }
        public int product_Contity { get; set; } //change it 
        public string product_Description { get; set; }
        public string product_Type { get; set; }
        public string product_Image_URL{ get; set; }
        public int quantity { get; set; }
    }
}
