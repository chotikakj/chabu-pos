export const hostname = import.meta.env.VITE_ENDPOINT_API;

export const CREATE_BILL_TRANSACTION = `${hostname}/api/billing/create-transaction`; // POST

export const REPORT_HOME = `${hostname}/api/report/get-home-report` // POST