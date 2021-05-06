// Todo: convert string types to primitive type
export interface NameCheapResponse {
  ApiResponse;
}

export interface ApiResponse {
  Status: string;
  xmlns: 'http://api.namecheap.com/xml.response';
  Errors;
  Warnings;
  RequestedCommand: string;
  CommandResponse;
  Server: string;
  GMTTimeDifference: string;
  ExecutionTime: number;
}

export interface Errors {
  $t: string;
  Number: number;
}
export interface Warnings {
  // Todo: I have no idea about this response
}
export interface DomainCheckResult {
  Available: boolean;
  Description: string;
  Domain: string;
  EapFee: number;
  ErrorNo: number;
  IcannFee: number;
  IsPremiumName: boolean;
  PremiumRegistrationPrice: number;
  PremiumRenewalPrice: number;
  PremiumRestorePrice: number;
  PremiumTransferPrice: number;
}
export interface CommandResponse {
  Type: string;
  DomainCheckResult: DomainCheckResult[];
}

export enum ProductTypes {
  DOMAIN = 'DOMAIN',
  SSLCERTIFICATE = 'SSLCERTIFICATE',
  WHOISGUARD = 'WHOISGUARD',
}

export enum ProductCategories {
  DOMAINS = 'DOMAINS',
  COMODO = 'COMODO',
  WHOISGUARD = 'WHOISGUARD',
}

export enum ActionNames {
  REGISTER = 'REGISTER',
  RENEW = 'RENEW',
  REACTIVATE = 'REACTIVATE',
  TRANSFER = 'TRANSFER',
  PURCHASE = 'PURCHASE',
}

export default { ProductTypes, ProductCategories, ActionNames };
