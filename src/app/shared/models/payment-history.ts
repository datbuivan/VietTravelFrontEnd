export interface PaymentHistory {
    paymentId: number;
    bookingId: number;
    bookingType: string;
    // totalPrice: number;
    paymentMethod: string;
    amount: number;
    status: string;
    paymentDate: Date;
    // transactionId: string;
    // hotelCheckInDate?: Date;
    // hotelCheckOutDate?: Date;
    // hotelName: string;
    tourName: string;
    tourStartDate: Date;
    imageUrl: string;
}
