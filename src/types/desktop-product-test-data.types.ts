export interface DesktopProductTestData {
  productId: string;
  productPath: string;
  productName: string;
  processor: { value: string; cartText: string };
  ram: { value: string; cartText: string };
  hdd: { value: string; cartText: string };
  operatingSystem: { value: string; cartText: string };
  software: { value: string; cartText: string };
  additionalSoftware: { cartText: string };
  quantityToAdd: string;
  quantityAfterUpdate: string;
  unitPrice: string;
  lineTotalAfterAdd: string;
  subtotalAfterUpdate: string;
}

export function isDesktopProductTestData(value: unknown): value is DesktopProductTestData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.productId === 'string'
    && typeof candidate.productPath === 'string'
    && typeof candidate.productName === 'string'
    && isOption(candidate.processor)
    && isOption(candidate.ram)
    && isOption(candidate.hdd)
    && isOption(candidate.operatingSystem)
    && isOption(candidate.software)
    && isCartText(candidate.additionalSoftware)
    && typeof candidate.quantityToAdd === 'string'
    && typeof candidate.quantityAfterUpdate === 'string'
    && typeof candidate.unitPrice === 'string'
    && typeof candidate.lineTotalAfterAdd === 'string'
    && typeof candidate.subtotalAfterUpdate === 'string';
}

function isOption(value: unknown): value is { value: string; cartText: string } {
  return isCartText(value)
    && typeof (value as Record<string, unknown>).value === 'string';
}

function isCartText(value: unknown): value is { cartText: string } {
  return typeof value === 'object'
    && value !== null
    && typeof (value as Record<string, unknown>).cartText === 'string';
}