import Banner from "../../component/banner";
import Footer from "../../component/footer";
import Home from "../../component/home";
import Category from "../../component/kategori";
import Navbar from "../../component/navbar";
import ProductCard from "../../component/product";
import RecommendedBlog from "../../component/recomBlog";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Home />
      <Banner />
      <Category />
      <ProductCard />
      <RecommendedBlog />
      <Footer />
    </>
  );
}
