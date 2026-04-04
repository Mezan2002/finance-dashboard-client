const downloadFile = (content, fileName, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCSV = (transactions) => {
  if (!transactions || transactions.length === 0) return;

  const headers = ["ID", "Merchant", "Date", "Amount", "Category", "Type"];
  const rows = transactions.map((tx) => [
    tx.id,
    tx.merchant,
    tx.date,
    tx.amount,
    tx.category,
    tx.type,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((val) => `"${val}"`).join(",")),
  ].join("\n");

  downloadFile(
    csvContent,
    `transactions_export_${new Date().toISOString().split("T")[0]}.csv`,
    "text/csv;charset=utf-8;",
  );
};

export const exportToJSON = (transactions) => {
  if (!transactions || transactions.length === 0) return;

  const jsonContent = JSON.stringify(transactions, null, 2);

  downloadFile(
    jsonContent,
    `transactions_export_${new Date().toISOString().split("T")[0]}.json`,
    "application/json;charset=utf-8;",
  );
};
