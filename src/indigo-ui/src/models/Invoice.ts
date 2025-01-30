export interface Invoice {
    InvoiceId: number;
    Description: string;
    BankAccount: BankAccount;
    Bank: Bank;
    Vendor: Vendor;
    Status: InvoiceStatus;
    InvoiceNumber: string;
    InvoiceDate: string;
    DueDate: string;
    Amount: number;
    IsDeleted: boolean;
}

export enum InvoiceStatus {
    Pending = 1,
    Paid = 2,
    Overdue = 3,
    Void = 4
}

interface BankAccount {
    BankId: number;
    BankAccountId: number;
    AccountNumber: string;
    AccountName: string;
}

interface Bank {
    BankId: number;
    BankName: string;
}

interface Vendor {
    VendorId: number;
    VendorName: string;
}