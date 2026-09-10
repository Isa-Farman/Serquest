using Dapper;
using MediatR;
using Serquest.Application.BusinessUnits;
using Serquest.Domain.Entities;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace Serquest.Infrastructure;

public class BusinessUnitQueryHandler :
    IRequestHandler<GetAllBusinessUnitsQuery, IEnumerable<BusinessUnit>>,
    IRequestHandler<GetBusinessUnitByIdQuery, BusinessUnit?>
{
    private readonly DapperDbContext _context;

    public BusinessUnitQueryHandler(DapperDbContext context) => _context = context;

    public async Task<IEnumerable<BusinessUnit>> Handle(GetAllBusinessUnitsQuery request, CancellationToken cancellationToken)
    {
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<BusinessUnit>(
            "sp_SQBusinessUnit_GetAll",
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<BusinessUnit?> Handle(GetBusinessUnitByIdQuery request, CancellationToken cancellationToken)
    {
        using var connection = _context.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<BusinessUnit>(
            "sp_SQBusinessUnit_GetById",
            new { Id = request.Id },
            commandType: CommandType.StoredProcedure
        );
    }
}

public class BusinessUnitCommandHandler :
    IRequestHandler<CreateBusinessUnitCommand, int>,
    IRequestHandler<UpdateBusinessUnitCommand, bool>
{
    private readonly DapperDbContext _context;

    public BusinessUnitCommandHandler(DapperDbContext context) => _context = context;

    public async Task<int> Handle(CreateBusinessUnitCommand request, CancellationToken cancellationToken)
    {
        using var connection = _context.CreateConnection();
        var parameters = new DynamicParameters();
        parameters.Add("@BusinessUnit", request.BusinessUnit);
        parameters.Add("@BusinessUnitName", request.BusinessUnitName);
        parameters.Add("@AddressLine1", request.AddressLine1);
        parameters.Add("@TelephoneNumber", request.TelephoneNumber);
        parameters.Add("@IsActive", request.IsActive);
        parameters.Add("@CreatedBy", string.IsNullOrWhiteSpace(request.CreatedBy) ? "System" : request.CreatedBy);
        parameters.Add("@Logo", request.Logo);
        parameters.Add("@District", request.District);

       
        var newId = await connection.QuerySingleAsync<int>(
            "sp_SQBusinessUnit_Insert",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return newId;
    }

    public async Task<bool> Handle(UpdateBusinessUnitCommand request, CancellationToken cancellationToken)
    {
        using var connection = _context.CreateConnection();
        var parameters = new DynamicParameters();
        parameters.Add("@Id", request.Id);
        parameters.Add("@BusinessUnit", request.BusinessUnit);
        parameters.Add("@BusinessUnitName", request.BusinessUnitName);
        parameters.Add("@AddressLine1", request.AddressLine1);
        parameters.Add("@TelephoneNumber", request.TelephoneNumber);
        parameters.Add("@IsActive", request.IsActive);
        parameters.Add("@Logo", request.Logo);
        parameters.Add("@District", request.District);

        var rowsAffected = await connection.ExecuteAsync(
            "sp_SQBusinessUnit_Update",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return rowsAffected > 0;
    }
}