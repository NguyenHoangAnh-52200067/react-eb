import instance from "../configuration/axios";

const uploadToS3 = async (file) => {
  console.log("Uploading file to S3:", file);

  const formData = new FormData();
  formData.append("file", file.originFileObj);

  const response = await instance.post("/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  if (response.status === 200) {
    return response.data.publicUrl;
  } else {
    throw new Error("File upload failed");
  }
};

export default uploadToS3;
