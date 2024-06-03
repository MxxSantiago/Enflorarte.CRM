using Enflorarte.CRM.Domain.Enums;

namespace Enflorarte.CRM.Domain.Entities

{
    public class Order : BaseEntity
    {
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public OrderStatus? OrderStatus { get; set; }
        public PaymentStatus? PaymentStatus { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ReferenceImage { get; set; }
        public string? RecipientName { get; set; }
        public string? RecipientCellphoneNumber { get; set; }
        public decimal? OrderPrice { get; set; }
        public virtual ICollection<Responsible> Responsible { get; set; } = new List<Responsible>();
        public virtual ICollection<DeliveryType> DeliveryType { get; set; } = new List<DeliveryType>();
        public virtual ICollection<Arrangement> Arrangement { get; set; } = new List<Arrangement>();
        public virtual ICollection<CommunicationType> CommunicationType { get; set; } = new List<CommunicationType>();
        public virtual ICollection<Branch> Branch { get; set; } = new List<Branch>();
        public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
