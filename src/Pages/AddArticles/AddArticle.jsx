import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import React, { useState } from "react";
import Select from "react-select";
import Loading from "../../Components/Loading";
import useAuth from "../../hooks/useAuth";


const axiosPublic = useAxiosPublic();
// const axiosSecure = useAxiosSecure()

const options = [
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "finance", label: "Finance" },
  { value: "sports", label: "Sports" },
];

const AddArticle = () => {
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const { user } = useAuth()

  const {
    data: publishers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publisher");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const handleTagChange = (selectedOption) => {
    setSelectedTags(selectedOption);
    setValue("tags", selectedOption.map((tag) => tag.value));
  };

  // publisher functions
  const handlePublisherChange = (selectedOption) => {
    setSelectedPublisher(selectedOption);
    setValue("publisher", selectedOption ? selectedOption.label : null);
  };

  const publisherOptions = publishers.map((publisher) => ({
    value: publisher._id,
    label: publisher.name,
  }));

  // form submit
  const onSubmit = async (data) => {
    // image upload
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const articleData = {
      title: data.title,
      tags: data.tags,
      publisher: data.publisher,
      description: data.description,
      image: res.data.data.display_url,
      postedDate: new Date().toISOString(),
      isPremium: false,
      status: 'pending',
      declineReason: null,
      views: 0,
      authorName: user.displayName,
      authorPhoto: user.photoURL,
      authorEmail: user.email,
    };

    const articleRes = await axiosPublic.post("/articles", articleData);

    if (articleRes.data.insertedId) {
      // show success popup
      reset();
      setSelectedTags([]);
      setSelectedPublisher(null);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Article is added to the database.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) return <Loading></Loading>;
  if (error) return <p>Error loading publishers: {error.message}</p>;

  return (
    <div className="w-11/12 mx-auto bg-base-200 rounded-xl shadow-xl my-10">
      <h1 className="text-3xl flex justify-center pt-8">Add Article</h1>
      <form className="pt-1 p-8" onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <div className="form-control w-full my-2 ">
          <label className="label">
            <span className="label-text">Title*</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* tags */}
        <div className="flex gap-6">
          <div className="form-control w-full my-2">
            <label className="label">
              <span className="label-text">Tags*</span>
            </label>
            <div>
              <Select
                {...register("tags", { required: true })}
                options={options}
                isMulti
                value={selectedTags}
                onChange={handleTagChange}
                placeholder="Choose tags..."
              />
              <p>
                Selected Tags: {selectedTags.map((tag) => tag.label).join(", ")}
              </p>
            </div>
          </div>

          {/* publisher */}
          <div className="form-control w-full my-2">
            <label className="label">
              <span className="label-text">Publisher*</span>
            </label>
            <Select
              {...register("publisher", { required: true })}
              options={publisherOptions}
              defaultValue={selectedPublisher}
              onChange={handlePublisherChange}
              placeholder="Choose a publisher..."
            />
            {selectedPublisher && <p>Selected: {selectedPublisher.label}</p>}
          </div>
        </div>

        {/* Article details */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Article Description</span>
          </label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered h-24"
            placeholder="Description"
          ></textarea>
        </div>

        <div className="form-control w-full my-4">
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full max-w-xs"
          />
        </div>

        <button className="btn mt-1 btn-outline  border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">Submit</button>
      </form>
    </div>
  );
};

export default AddArticle;
