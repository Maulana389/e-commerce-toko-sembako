const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3 md:p-1 lg:p-1">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-2 md:py-3 px-3 md:px-4 border rounded-lg w-full"
          placeholder="Masukkan kategori"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-3">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
