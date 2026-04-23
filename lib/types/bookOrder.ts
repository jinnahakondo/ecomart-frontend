export type AddressForm = {
    fullName: string;
    phone: string;
    district: string;
    city: string;
    area: string;
    postalCode: string;
};

export type OrderPayload = {
    userId: string;
    productId: string;
    quantity: number;
    price: number;
    totalPrice: number;
    address: AddressForm;
};