using Indigo.Invoicing.API.Viewmodels.Invoices.Requests;
using Indigo.Invoicing.API.Viewmodels.Invoices.Responses;
using Indigo.Invoicing.Domain.Entities;
using Indigo.Invoicing.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Indigo.Invoicing.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountingController : ControllerBase
{
    private readonly ILogger<AccountingController> _logger;
    private readonly IInvoiceRepository _invoiceRepository;
    public AccountingController(ILogger<AccountingController> logger, IInvoiceRepository invoiceRepository)
    {
        _logger = logger;
        _invoiceRepository = invoiceRepository;
    }

    [HttpGet]
    [Route("Invoices")]
    public async Task<ActionResult<GetInvoicesResponse>> Invoices()
    {
        try
        {
            _logger.LogTrace($"[{DateTime.UtcNow}] - [GET] {nameof(AccountingController)}/{nameof(Invoices)}: Execution started...");
            var invoices = await _invoiceRepository.GetInvoices();
            return Ok(invoices);
        }
        catch (Exception ex)
        {
            _logger.LogError($"[{DateTime.UtcNow}] - [GET] {nameof(AccountingController)}/{nameof(Invoices)}: {ex}");
            return BadRequest(ex.Message);
        }
    }
}
