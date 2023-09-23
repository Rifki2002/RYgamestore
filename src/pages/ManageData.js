import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const ManageData = () => {
  const {
    data,
    fetchStatus,
    setFetchStatus,
    currentId,
    setCurrentId,
    input,
    setInput,
    functions,
  } = useContext(GlobalContext);
  const {
    functionDelete,
    functionEdit,
    fetchData,
    handleChange,
    functionSubmit,
    functionUpdate,
    handleText,
  } = functions;

  // console.log(data)

  useEffect(() => {
    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus, fetchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (currentId === null) {
      functionSubmit();
    } else {
      functionUpdate();
    }

    setInput({
      category: "",
      description: "",
      image_url: "",
      is_android_app: true,
      is_ios_app: true,
      name: "",
      price: 0,
      rating: 0,
      release_year: 2007,
      size: 0,
    });

    setCurrentId(null);
  };

  const handleDelete = (e) => {
    let idData = parseInt(e.target.value);
    functionDelete(idData);
  };
  const handleEdit = (e) => {
    let idData = parseInt(e.target.value);
    functionEdit(idData);
  };

  return (
    <>
      <div className="container mx-auto mt-10">
        <div class="container mx-auto mb-10">
          <h1 class="text-xl font-bold ">Manage Data</h1>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-purple-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Release Year
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  is_android_app
                </th>
                <th scope="col" className="px-6 py-3">
                  is_ios_app
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data !== null &&
                data.map((res, index) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{res.name}</td>
                      <td className="px-6 py-4">{res.category}</td>
                      <td className="px-6 py-4">
                        {handleText(res.description, 20)}
                      </td>
                      <td className="px-6 py-4">{res.price}</td>
                      <td className="px-6 py-4">{res.rating}</td>
                      <td className="px-6 py-4">{res.release_year}</td>
                      <td className="px-6 py-4">{res.size}</td>
                      <td className="px-6 py-4">{res.is_android_app}</td>
                      <td className="px-6 py-4">{res.is_ios_app}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={handleEdit}
                          value={res.id}
                          className="p-2 text-white bg-yellow-200 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          value={res.id}
                          className="p-2 ml-3 text-white bg-red-500 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div class="container mx-auto mt-20 mb-10">
        <h1 class="text-xl font-bold ">Create Data</h1>
      </div>
      <form onSubmit={handleSubmit} className="container mx-auto mt-10  mb-10">
        <small>Gambar data Game</small>
        <hr className="mb-10" />
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Image URL
          </label>
          <input
            onChange={handleChange}
            value={input.image_url}
            name="image_url"
            type={"text"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <small>Data Game</small>
        <hr className="mb-10" />
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Name
          </label>
          <input
            onChange={handleChange}
            value={input.name}
            name="name"
            type={"text"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Category
          </label>
          <input
            onChange={handleChange}
            value={input.category}
            name="category"
            type={"text"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Description
          </label>
          <input
            onChange={handleChange}
            value={input.description}
            name="description"
            type={"text"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Price
          </label>
          <input
            onChange={handleChange}
            value={input.price}
            name="price"
            type={"number"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Rating
          </label>
          <input
            onChange={handleChange}
            value={input.rating}
            name="rating"
            type={"number"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Release Year
          </label>
          <input
            min={2007}
            max={2022}
            onChange={handleChange}
            value={input.release_year}
            name="release_year"
            type={"number"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Size
          </label>
          <input
            onChange={handleChange}
            value={input.size}
            name="size"
            type={"number"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <small>Jenis Perangkat</small>
        <hr className="mb-10" />
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Android ?
          </label>
          <input
            onChange={handleChange}
            value={input.is_android_app}
            name="is_android_app"
            type={"number"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            IOS ?
          </label>
          <input
            onChange={handleChange}
            value={input.is_ios_app}
            name="is_ios_app"
            type={"number"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <input
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </form>
    </>
  );
};

export default ManageData;
