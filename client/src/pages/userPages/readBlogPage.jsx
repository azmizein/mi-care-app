import Footer from "../../component/footer";
import Navbar from "../../component/navbar";
import ReadBlog from "../../component/readBlog";
import RecommendedBlog from "../../component/recomBlog";

export default function ReadBlogPage() {
  return (
    <>
      <Navbar />
      <ReadBlog />
      <RecommendedBlog />
      <Footer />
    </>
  );
}
