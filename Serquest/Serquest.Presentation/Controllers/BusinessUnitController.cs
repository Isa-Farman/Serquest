using MediatR;
using Microsoft.AspNetCore.Mvc;
using Serquest.Application.BusinessUnits;

namespace Serquest.Api.Controllers;

[ApiController]
[Route("api/businessunit")]
public class BusinessUnitController : ControllerBase
{
    private readonly IMediator _mediator;

    public BusinessUnitController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _mediator.Send(new GetAllBusinessUnitsQuery()));

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _mediator.Send(new GetBusinessUnitByIdQuery(id));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBusinessUnitCommand command)
    {
        var newId = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = newId }, new { id = newId });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBusinessUnitCommand command)
    {
        if (id != command.Id) return BadRequest();

        var success = await _mediator.Send(command);
        return success ? NoContent() : NotFound();
    }
}