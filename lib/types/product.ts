/*
  Review type
*/
export type Review = {
  _id: string;
  productId: string
  userId: string
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
  _id: string
  title: string
  description: string
  category: string
  oldPrice: number
  price: number
  discountPercentage: number
  rating: number
  stock: number
  availabilityStatus: string
  brand: string
  weight: number
  thumbnail: string
  images: string[]
  tags: string[]
  warrantyInformation: string
  returnPolicy: string
  createdAt: string

}
