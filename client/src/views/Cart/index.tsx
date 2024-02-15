import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { Knorr } from "../../assets";

const dummyCarts = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    quantity: 1,
    image: Knorr,
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState<boolean | undefined>(false);
  const [checkedItems, setCheckedItems] = useState<boolean | undefined>(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container">
      {dummyCarts.length === 0 ? (
        <div className="flex items-center justify-center my-40">
          <div className="flex items-center justify-center flex-col">
            <div className="text-gray">There are no items in this cart</div>
            <div className="my-5">
              <Button
                label="Continue Shopping"
                className="bg-transparent text-cyan rounded-none border-cyan focus:shadow-none hover:bg-cyan-50 hover:text-cyan font-medium"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="my-6">
          <div className="flex gap-3">
            <div className="w-2/3">
              <div className="bg-white p-3 rounded-none">
                <div className="flex items-center justify-between text-[14px]">
                  <div className="text-gray-200 flex items-center gap-2">
                    <div className="checkbox-custom">
                      <Checkbox
                        onChange={(e) => setAllChecked(e.checked)}
                        checked={allChecked || false}
                      ></Checkbox>
                    </div>
                    Select All
                  </div>
                  <div className="text-gray-200 flex items-center gap-1 cursor-pointer">
                    <RiDeleteBin6Line className="text-[16px]" />
                    <div>DELETE</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 my-3">
                <div className="flex items-center gap-2">
                  <div className="checkbox-custom">
                    <Checkbox
                      onChange={(e) => setCheckedItems(e.checked)}
                      checked={checkedItems || false}
                    ></Checkbox>
                  </div>
                  <div className="w-28">
                    <img src={Knorr} alt="item" />
                  </div>
                  <div className="text-[14px] font-medium min-w-80">
                    Surf Excel
                  </div>
                  <div className="mr-20">
                    <div className="text-[16px] font-medium text-orange">
                      Rs. 100
                    </div>
                    <div className="text-gray-100 text-[18px] cursor-pointer">
                      <RiDeleteBin6Line />
                    </div>
                  </div>
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
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="bg-white p-3 rounded-none">
                <div className="flex justify-between flex-col">
                  <div className="text-lg font-medium">Order Summary</div>
                  <div className="my-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200 text-[14px]">
                        Subtotal (3 items)
                      </span>
                      <span className=" font-medium">Rs. 100</span>
                    </div>
                  </div>

                  <div className="my-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200 text-[14px]">
                        Shipping Fee
                      </span>
                      <span className=" font-medium">Rs. 100</span>
                    </div>
                  </div>

                  <div className="my-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200 text-[14px]">
                        Shipping Fee Discount
                      </span>
                      <span className=" font-medium">-Rs. 100</span>
                    </div>
                  </div>

                  <Divider className="my-0" />

                  <div className="my-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px]">Total</span>
                      <span className="font-medium text-orange">Rs. 500</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 mb-1">
                  <Button
                    label="Proceed to Checkout"
                    className="bg-orange text-white font-medium w-full border-none rounded-none focus:shadow-none"
                    // onClick={() => navigate("/checkout")}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
