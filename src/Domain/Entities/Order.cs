using Enflorarte.CRM.Domain.Enums;

namespace Enflorarte.CRM.Domain.Entities

{
    public class Order : BaseEntity
    {
        public DateTime DeliveryDate { get; set; }
        public DateTime DeliveryFrom { get; set; }
        public DateTime DeliveryUntil { get; set; }
        public virtual ICollection<Responsible> Responsible { get; set; } = new List<Responsible>();
        public DateTime OrderDate { get; set; }
        public virtual ICollection<DeliveryType> DeliveryType { get; set; } = new List<DeliveryType>();
        public PaymentStatus? PaymentStatus { get; set; }
        public OrderStatus? OrderStatus { get; set; }
        public string? Address { get; set; }
        public bool CommandGenerated { get; set; }
        public string? Description { get; set; }
        public string? ReferenceImage { get; set; }
        public string? ResultImage { get; set; }
        public virtual ICollection<Arrangement> Arrangement { get; set; } = new List<Arrangement>();
        public virtual ICollection<CommunicationType> CommunicationType { get; set; } = new List<CommunicationType>();
        public decimal? OrderPrice { get; set; }
        public decimal? RealizationPrice { get; set; }
        public decimal? ShippingPrice { get; set; }
        public decimal? MoneyPaid { get; set; }
        public bool IsPaid { get; set; }
        public bool WasDelivered { get; set; }
        public virtual ICollection<Branch> Branch { get; set; } = new List<Branch>();
        public string? RecipientName { get; set; }
        public string? RecipientCellphoneNumber { get; set; }
        public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
