import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const axiosPublic = useAxiosPublic()

const AddPublisher = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  // form submit
  const onSubmit = async (data) => {
    // image upload
    const imageFile = { image: data.logo[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const publisherData = {
      name: data.name,
      logo: res.data.data.display_url,
    };

    const publisherRes = await axiosPublic.post("/publisher", publisherData);

    if (publisherRes.data.insertedId) {
      // show success popup
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `publisher is added to the database.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <Helmet>
        <title>News Hub | AddPublisher</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">Add Publisher</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Publisher Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Publisher Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter publisher name"
            required
          />
        </div>

        {/* Publisher Logo */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Publisher Logo</label>
          <input
            type="file"
            {...register("logo", { required: true })}
            accept="image/*"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          Add Publisher
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;