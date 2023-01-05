import { Route, Routes } from "react-router-dom";
import { AddProduct } from "../pages/AddProduct";

import { Cart } from "../pages/Cart";
import { ListProducts } from "../pages/ListProducts";






export const Rutes = () => {
  return (
    <Routes>
      <Route path="*" element={<ListProducts/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/" element={<ListProducts/>} />
    </Routes>
  );
}