import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="SearchInput bg-[#F5F8FF] text-[#8F90A6] flex items-center gap-5 text-[16px] w-120 rounded-lg relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-3 pl-15 focus:outline-none placeholder:text-[#8F90A6]"
      />
      <span className="absolute left-4">
        <IoSearch size={25} />
      </span>
    </div>
  );
};

export default SearchInput;
