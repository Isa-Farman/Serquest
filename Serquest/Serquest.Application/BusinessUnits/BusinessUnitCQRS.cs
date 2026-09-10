using MediatR;
using Serquest.Domain.Entities;

namespace Serquest.Application.BusinessUnits;

// ===== Queries =====
public record GetAllBusinessUnitsQuery() : IRequest<IEnumerable<BusinessUnit>>;
public record GetBusinessUnitByIdQuery(int Id) : IRequest<BusinessUnit?>;

// ===== Commands =====
public record CreateBusinessUnitCommand(
    string BusinessUnit,
    string BusinessUnitName,
    string AddressLine1,
    string TelephoneNumber,
    bool IsActive,
    string? CreatedBy,
    string? Logo,
    string? District
) : IRequest<int>;

public record UpdateBusinessUnitCommand(
    int Id,
    string BusinessUnit,
    string BusinessUnitName,
    string AddressLine1,
    string TelephoneNumber,
    bool IsActive,
    string? Logo,
    string? District
) : IRequest<bool>;