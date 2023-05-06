export interface BookCheckoutRequest {
    bookId: number;
    timePeriod: {
        startDate: Date;
        endDate: Date | null;
    }
}
