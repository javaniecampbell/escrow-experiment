// Generate an unique invoice number for the invoice pseudo-randomly
export function generateInvoiceNo() {
  const prefix = "INV-";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now();
  const invoiceNo = prefix + randomNumber + "-" + timestamp;
  return invoiceNo;
}
