import { Button } from "primereact/button";
import { BiLogoDigitalocean } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#75c2d7]">
      <div className="container">
        <div className="py-4 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <BiLogoDigitalocean className="text-3xl text-white" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-96 text-gray-200 text-[14px] py-2 px-4 rounded-lg focus:outline-none font-medium ml-32"
            onClick={() => navigate("/search")}
          />
          <div className="flex items-center cursor-pointer">
            <div onClick={() => navigate("/cart")}>
              <i className="bx bx-cart text-white text-[28px]"></i>
            </div>
            <div
              className="mx-2 text-white font-medium text-[16px] p-2"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
            <Button
              label="Sign Up"
              size="small"
              className="font-medium text-[14px] py-2 px-4 border-white"
              onClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
