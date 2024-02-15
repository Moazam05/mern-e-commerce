import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OverlayLoader from "./components/Spinner/OverlayLoader";
import Header from "./components/Header";
const Home = lazy(() => import("./views/Home"));
const Search = lazy(() => import("./views/Search"));
const Cart = lazy(() => import("./views/Cart"));
const NotFound = lazy(() => import("./views/NotFound"));
const Products = lazy(() => import("./views/Products"));
const SingleProduct = lazy(
  () => import("./views/Products/components/SingleProduct")
);

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<OverlayLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<SingleProduct />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
