using Indigo.Invoicing.Domain.Models;

namespace Indigo.Invoicing.Domain.Interfaces
{
    public interface IInvoiceRepository
    {
        public Task<IEnumerable<Invoice>> GetInvoices();
    }
}
