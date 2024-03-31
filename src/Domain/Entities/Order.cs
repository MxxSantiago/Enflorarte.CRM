namespace Enflorarte.CRM.Domain.Entities;
// TODO: Add Arrangement and Tag entities
public class Order : BaseEntity
{
    public DateTime DeliveryDate { get; set; }
    public DateTime DeliveryFrom { get; set; }
    public DateTime DeliveryTo { get; set; }
    public int ResponsibleId { get; set; }
    public Responsible Responsible { get; set; } = null!;
    public DateTime OrderDate { get; set; }
    public string DeliveryType { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public bool OrderGenerated { get; set; }
    public string Description { get; set; } = string.Empty;
    public string ReferenceImage { get; set; } = string.Empty;
    public string ResultImage { get; set; } = string.Empty;
    public int CommunicationTypeId { get; set; }
    public CommunicationType CommunicationType { get; set; } = null!;
    public decimal OrderPrice { get; set; }
    public decimal CompletionPrice { get; set; }
    public decimal ShippingPrice { get; set; }
    public decimal MoneyPaid { get; set; }
    public bool IsPaid { get; set; }
    public bool WasDelivered { get; set; }
    public int BranchId { get; set; }
    public Branch Branch { get; set; } = null!;
    public string RecipientName { get; set; } = string.Empty;
    public string RecipientCellPhoneNumber { get; set; } = string.Empty;
}
