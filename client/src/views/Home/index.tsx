import { BannerImage } from "../../assets";

const Home = () => {
  return (
    <div className="container my-12">
      <img
        src={BannerImage}
        alt="Banner"
        className="w-full bg-no-repeat bg-current bg-cover"
      />
    </div>
  );
};

export default Home;
