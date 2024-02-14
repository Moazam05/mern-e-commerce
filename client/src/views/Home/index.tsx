const Home = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-96 text-gray-200 text-[14px] py-2 px-4 rounded-lg focus:outline-none font-medium"
          // onClick={() => navigate("/search")}
        />
      </div>
    </div>
  );
};

export default Home;
