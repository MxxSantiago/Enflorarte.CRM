using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Common.Interfaces.DAOs;

public interface IArrangementDAO : IBaseDAO<Arrangement>
{
    Task AddAsync(Arrangement entity);
}
