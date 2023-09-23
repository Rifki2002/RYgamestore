import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import axios from "axios";

function formatRupiah(angka) {
  if (angka !== undefined && angka !== null) {
    var number_string = angka.toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi),
      separator;

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah === "0" ? "Free" : "Rp. " + rupiah + ",-";
  } else {
    return "Free";
  }
}

function megaBytesToSize(megaBytes, decimals = 2) {
  if (megaBytes === 0) return "0 megaBytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(megaBytes) / Math.log(k));

  return parseFloat((megaBytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const Home = () => {
  const { fetchStatus, functions, state, data } =
    useContext(GlobalContext);
  const { fetchData, handleText } = functions;
  const { setData, setFetchStatus } = state;

  const [search, setSearch] = useState("");

  console.log(data);

  useEffect(() => {
    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus, fetchData]);


  // search 
  const [searchTerm, setSearchTerm] = useState("");
  const handleChangeSearch = (event) => setSearchTerm(event.target.value);

  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase()); // Filter by name
  });

  // const handleSearch = (event) => {
  //   event.preventDefault();

  //   let fetchData = async () => {
  //     try {
  //       let result = await axios.get(
  //         `https://backendexample.sanbercloud.com/api/mobile-apps`
  //       );
  //       let responseData = result.data.data;

  //       let searchData = responseData.filter((res) => {
  //         return res.title.toLowerCase().includes(search.toLowerCase());
  //       });

  //       setData(searchData); // Assuming 'setData' is available in your context
  //       setSearch(""); // Reset the search input
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // };

  return (
    <>
      <section class="bg-gray-200 p-5">
        <div class="container mx-auto mt-10">
          <h1 class="text-xl font-bold ">Find your data that you need!</h1>
        </div>
        <Link
              to={"/dashboard"}
              className="ml-36 mt-10 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white hover:text-black rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-black dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Dashboard
            </Link>
            <form onSubmit={(event) => event.preventDefault()} className="w-80 ml-36 mt-10">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                    Search
                  </label>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      value={searchTerm} // Use searchTerm for the value
                      onChange={handleChangeSearch}
                      id="default-search"
                      className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Job here..."
                      required
                    />
                    <button
                      type="submit"
                      onClick={() => {
                        // Set data to the filteredData when the button is clicked
                        setData(filteredData);
                      }}
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Search
                    </button>
                  </div>
                </form>
        <div class="container mx-auto flex-wrap flex gap-10 items-center justify-start">
          {data !== null &&
            data.map((res) => {
              return (
                <div
                  key={res.id}
                  class="mt-10 flex max-w-xl h-72 bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={`${res.image_url}`}
                    class="w-1/3 bg-cover bg-landscape"
                    alt="ini gambar"
                  />
                  <div class="w-2/3 p-4">
                    <h1 class="text-gray-900 font-bold text-2xl">{res.name}</h1>
                    <small>{res.release_year}</small>
                    <p class="mt-2 text-gray-600 text-sm">
                      {handleText(res.description, 200)}
                    </p>
                    <div class=" item-center mt-2 text-gray-500">
                      <span>{res.category + " "}</span>
                      <span>{megaBytesToSize(res.size)}</span>
                      <span>
                        ,{res.is_android_app === 0 ? "" : "Andorid"}
                        {res.is_android_app === 1 && res.is_ios_app === 1
                          ? " & "
                          : ""}
                        {res.is_ios_app === 0 ? "" : "IOS"}
                      </span>
                    </div>
                    <div class="flex item-center justify-between mt-3">
                      <h1 class="text-gray-700 font-bold text-xl">
                        {formatRupiah(res.price)}
                      </h1>
                      <button class="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                        {res.rating} Ratings
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Home;
