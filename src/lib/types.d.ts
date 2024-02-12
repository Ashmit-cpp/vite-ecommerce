export type Review = {
  id: number;
  text: string;
  rating: number;
};

// type CommonFields = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   stock: number;
// };

// type Admin = {
//   role: "admin";
//   createdBy: string;
//   reviews: Review[];
// };

// type Seller = {
//   role: "seller";
// };

// export type Product = CommonFields & (Seller | Admin);

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdBy?: string;
  reviews?: Review[];
};
