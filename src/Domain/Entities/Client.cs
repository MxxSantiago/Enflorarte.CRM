namespace Enflorarte.CRM.Domain.Entities;

public class Client : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public int CommunicationTypeId { get; set; }
    public virtual CommunicationType? CommunicationType { get; set; }
}
