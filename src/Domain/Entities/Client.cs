namespace Enflorarte.CRM.Domain.Entities;

public class Client : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string PreferredAddress { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public int PreferredCommunicationTypeId { get; set; }
    public CommunicationType? PreferredCommunicationType { get; set; }
}
