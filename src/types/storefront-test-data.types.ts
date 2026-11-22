export interface StorefrontTestData {
  computerCategory: string;
  desktopCategory: string;
  booksCategory: string;
  productAvailability: string;
  productListingPrice: string;
  productDescription: string;
  noResultsQueryPrefix: string;
  noResultsMessage: string;
  minimumSearchLengthMessage: string;
  wishlistProductName: string;
  wishlistProductPath: string;
  wishlistAddedMessage: string;
  wishlistEmptyMessage: string;
  emptyCompareListMessage: string;
}

export function isStorefrontTestData(value: unknown): value is StorefrontTestData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.computerCategory === 'string'
    && typeof candidate.desktopCategory === 'string'
    && typeof candidate.booksCategory === 'string'
    && typeof candidate.productAvailability === 'string'
    && typeof candidate.productListingPrice === 'string'
    && typeof candidate.productDescription === 'string'
    && typeof candidate.noResultsQueryPrefix === 'string'
    && typeof candidate.noResultsMessage === 'string'
    && typeof candidate.minimumSearchLengthMessage === 'string'
    && typeof candidate.wishlistProductName === 'string'
    && typeof candidate.wishlistProductPath === 'string'
    && typeof candidate.wishlistAddedMessage === 'string'
    && typeof candidate.wishlistEmptyMessage === 'string'
    && typeof candidate.emptyCompareListMessage === 'string';
}
