import { Divider } from "primereact/divider";
import { Surf } from "../../../assets";
import { useState } from "react";
import { Button } from "primereact/button";
import { BsCash } from "react-icons/bs";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container my-6">
      <div className="bg-white p-3">
        <div className="flex gap-5">
          <div className="w-2/3">
            <div className="flex gap-5">
              <div className="w-1/3">
                <img src={Surf} alt="product" className="w-full" />
              </div>
              <div className="w-2/3">
                <div className="text-xl font-medium text-gray">Surf Excel</div>
                <div className="text-[12px] text-gray-400">
                  Brand: <span className="text-cyan">Surf</span>
                </div>
                <Divider className="my-2" />
                <div className="text-cyan">Rs. 200</div>
                <div className="flex items-center gap-5">
                  <div className="my-5 text-gray-200">Quantity</div>

                  <div className="flex items-center gap-5">
                    <Button
                      className={`flex items-center justify-center border-none text-gray p-2 rounded-none focus:shadow-none ${
                        quantity === 1
                          ? "bg-[#f4f5f7] cursor-not-allowed"
                          : "bg-gray-500 cursor-pointer"
                      } `}
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                    >
                      <i className="bx bx-minus"></i>
                    </Button>

                    <div className="w-2 text-gray">{quantity}</div>
                    <Button
                      className="flex items-center justify-center border-none cursor-pointer text-gray bg-gray-500 p-2 focus:shadow-none rounded-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="bx bx-plus"></i>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-5 my-5">
                  <Button
                    label="Buy Now"
                    className="w-full bg-cyan text-white rounded-none focus:shadow-none"
                    size="small"
                  />
                  <Button
                    label="Add to Cart"
                    className="w-full bg-orange text-white rounded-none border-none
                    focus:shadow-none                    "
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="bg-[#fafafa] p-3">
              <div className="flex items-center gap-2 mb-3 text-gray">
                <BsCash />
                <span className="text-[14px] font-medium">
                  {" "}
                  Cash on Delivery
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3 text-gray">
                <i className="bx bx-calendar-check"></i>
                <span className="text-[14px] font-medium">
                  14 days free & easy return
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray">
                <i className="bx bx-shield-x"></i>
                <span className="text-[14px] font-medium">
                  Warranty not available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
