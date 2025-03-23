using Indigo.Invoicing.Domain.Interfaces;
using Indigo.Invoicing.Domain.Models;
using Indigo.Invoicing.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Indigo.Invoicing.Infrastructure.Repositories
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly InvoicingDbContext _context;
        public InvoiceRepository(InvoicingDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Invoice>> GetInvoices()
        {
            var invoices = await _context.Invoices.ToListAsync();
            return invoices.Select(x => new Invoice()
            {
                InvoiceId = x.InvoiceId,
                InvoiceNumber = x.InvoiceNumber,
                Description = x.Description,
                InvoiceDate = x.InvoiceDate,
                DueDate = x.DueDate,
                Amount = x.Amount,
                IsDeleted = x.IsDeleted,
                Status = (Domain.Entities.Status)x.StatusId,
                Bank = new Bank 
                {
                    BankId = x.Bank.BankId,
                    BankName = x.Bank.BankName
                },
                BankAccount = new BankAccount
                {
                    BankAccountId = x.BankAccount.BankAccountId,
                    AccountNumber = x.BankAccount.AccountNumber,
                    AccountName = x.BankAccount.AccountName
                }
            });
        }
    }
}
