import axios from "axios";
import { Invoice, InvoiceStatus } from "../models/Invoice";

const endpoint = "invoices";

export const InvoiceFactory = {
    getInvoicesByStatus: async (status: InvoiceStatus, take: number, skip: number) => {
        // const response = await axios.get<Invoice[]>(`https://dummyjson.com/${endpoint}?status=${InvoiceStatus[status]}&limit=${take}&skip=${skip}`);
        return fakeInvoices;
    },
};

export const fakeInvoices: Invoice[] = [
    {
        InvoiceId: 1,
        Description: "Web development services",
        BankAccount: {
            BankId: 1,
            BankAccountId: 1,
            AccountNumber: "123456789",
            AccountName: "John Doe"
        },
        Bank: {
            BankId: 1,
            BankName: "Bank of America"
        },
        Vendor: {
            VendorId: 1,
            VendorName: "Tech Solutions"
        },
        Status: InvoiceStatus.Pending,
        InvoiceNumber: "INV-001",
        InvoiceDate: "2023-01-01",
        DueDate: "2023-01-15",
        Amount: 1500.00,
        IsDeleted: false
    },
    {
        InvoiceId: 2,
        Description: "Graphic design services",
        BankAccount: {
            BankId: 2,
            BankAccountId: 2,
            AccountNumber: "987654321",
            AccountName: "Jane Smith"
        },
        Bank: {
            BankId: 2,
            BankName: "Chase Bank"
        },
        Vendor: {
            VendorId: 2,
            VendorName: "Design Studio"
        },
        Status: InvoiceStatus.Paid,
        InvoiceNumber: "INV-002",
        InvoiceDate: "2023-02-01",
        DueDate: "2023-02-15",
        Amount: 800.00,
        IsDeleted: false
    },
    {
        InvoiceId: 3,
        Description: "SEO services",
        BankAccount: {
            BankId: 3,
            BankAccountId: 3,
            AccountNumber: "456123789",
            AccountName: "Alice Johnson"
        },
        Bank: {
            BankId: 3,
            BankName: "Wells Fargo"
        },
        Vendor: {
            VendorId: 3,
            VendorName: "SEO Experts"
        },
        Status: InvoiceStatus.Overdue,
        InvoiceNumber: "INV-003",
        InvoiceDate: "2023-03-01",
        DueDate: "2023-03-15",
        Amount: 1200.00,
        IsDeleted: false
    },
    {
        InvoiceId: 4,
        Description: "Consulting services",
        BankAccount: {
            BankId: 4,
            BankAccountId: 4,
            AccountNumber: "321654987",
            AccountName: "Bob Brown"
        },
        Bank: {
            BankId: 4,
            BankName: "Citibank"
        },
        Vendor: {
            VendorId: 4,
            VendorName: "Consulting Co."
        },
        Status: InvoiceStatus.Void,
        InvoiceNumber: "INV-004",
        InvoiceDate: "2023-04-01",
        DueDate: "2023-04-15",
        Amount: 500.00,
        IsDeleted: false
    }
];
