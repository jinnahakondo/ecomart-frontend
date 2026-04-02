/*
  Review type
*/
export type Review = {
  _id: string;
  rating: number;
  comment: string;
  reviewerName: string;
  avatar?: string;
  date: string;
};

/*
  Product type
*/
export type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  oldPrice: number;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  weight: number;
  availabilityStatus: string;
  thumbnail: string;
  images: string[];
  reviews: Review[];
};
