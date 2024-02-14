import { Divider } from "primereact/divider";
import { BannerImage, Knorr, Shampoo, Surf } from "../../assets";

const saleProducts = [
  {
    id: 1,
    name: "Knorr Noodles",
    image: Knorr,
    price: 100,
  },
  {
    id: 2,
    name: "Surf Excel",
    image: Surf,
    price: 200,
  },
  {
    id: 3,
    name: "Lifebuoy Shampoo",
    image: Shampoo,
    price: 300,
  },
];

const Home = () => {
  return (
    <div className="container">
      <div className="my-6">
        <img
          src={BannerImage}
          alt="Banner"
          className="w-full bg-no-repeat bg-current bg-cover"
        />
      </div>
      <div className="text-xl text-gray-200">Flash Sale</div>
      <div className="bg-white p-3 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-cyan font-medium">On Sale Now</div>
          <div className="text-cyan font-medium border py-1 px-2 cursor-pointer">
            Show More
          </div>
        </div>
        <div>
          <Divider className="my-3" />

          <div className="flex flex-wrap">
            {saleProducts.map((product) => {
              return (
                <div
                  className="w-44 hover:shadow-sidebar p-2"
                  key={product?.id}
                >
                  <img src={product?.image} alt="brand" />
                  <div className="text-[14px]">{product?.name}</div>
                  <div className="text-cyan">Rs.{product?.price}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="my-6">
        <div className="text-xl text-gray">Categories</div>
        <div className="bg-white p-3 mt-1">
          <div className="flex flex-wrap">
            {saleProducts.map((product) => {
              return (
                <div
                  className="w-32 hover:shadow-sidebar p-2"
                  key={product?.id}
                >
                  <img src={product?.image} alt="brand" />
                  <div className="text-[12px]">{product?.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="my-6">
        <div className="text-xl text-gray">Just For You</div>
      </div>
    </div>
  );
};

export default Home;
