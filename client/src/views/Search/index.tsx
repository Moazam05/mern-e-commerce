import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { thousandSeparatorNumber } from "../../utils";

interface Sort {
  name: string;
  code: string;
}

interface Category {
  name: string;
  code: string;
}

const sortOptions: Sort[] = [
  { name: "High to Low", code: "high" },
  { name: "Low to High", code: "low" },
];

const categoryOptions = [
  { name: "All", code: "all" },
  { name: "Mobiles", code: "mobiles" },
  { name: "Laptops", code: "laptops" },
  { name: "Tablets", code: "tablets" },
  { name: "Accessories", code: "accessories" },
];

const Search = () => {
  const [selectedSort, setSelectedSort] = useState<Sort | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(5000);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <div className="container">
      <div className="my-6 bg-white p-3 flex gap-5">
        <div className="w-[25%]">
          <div>
            <div className="text-gray text-xl font-medium">Filters</div>
            <div className="my-3">
              <label htmlFor="sort" className="text-gray-200">
                Sort
              </label>
              <Dropdown
                value={selectedSort}
                onChange={(e: DropdownChangeEvent) => setSelectedSort(e.value)}
                options={sortOptions}
                optionLabel="name"
                placeholder="Sort By Price"
                className="w-full md:w-14rem mt-2"
              />
            </div>
            <div className="my-3">
              <div className="flex justify-between">
                <label htmlFor="price" className="text-gray-200">
                  Price <br />
                  <span className="text-[12px]">Max Range Rs.(50,000)</span>
                </label>

                <div>Rs.{thousandSeparatorNumber(sliderValue)}</div>
              </div>
              <Slider
                value={sliderValue}
                onChange={(e: SliderChangeEvent) =>
                  setSliderValue(e.value as number)
                }
                className="w-full mt-5"
                max={50000}
              />
            </div>
            <div className="my-3">
              <label htmlFor="category" className="text-gray-200">
                Category
              </label>
              <Dropdown
                value={selectedCategory}
                onChange={(e: DropdownChangeEvent) =>
                  setSelectedCategory(e.value)
                }
                options={categoryOptions}
                optionLabel="name"
                placeholder="Select Category"
                className="w-full md:w-14rem mt-2"
              />
            </div>
          </div>
        </div>
        <div className="w-[75%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          accusantium cupiditate unde totam aliquid officiis hic dolorum quaerat
          recusandae rerum nam, suscipit quis iure labore! Repellendus nemo
          dolor quo ullam?
        </div>
      </div>
    </div>
  );
};

export default Search;
