import React, { useState } from "react";
import { Select, Spin } from "antd";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const FoodSelector = ({ foods, onChange }) => {
  const [selectedFood, setSelectedFood] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.class === "non_food") {
        setError("The uploaded image does not contain food.");
      } else {
        setError(null);
        console.log("Predicted class:", res.data);
        onChange(res.data.class);
      }
    } catch (error) {
      console.error("Error uploading image:", error, selectedFile);
      setError("An error occurred while uploading the image.");
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  const handleChange = (value) => {
    onChange(value);
    setSelectedFood(value);
  };

  const filterOption = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const fileTypes = ["image/jpeg", "image/jpg"];
        const fileType = file.type;
        if (fileTypes.includes(fileType)) {
          setSelectedFile(file);
        } else {
          console.log(
            "Invalid file type. Please select a JPG or JPEG file only."
          );
        }
      }
    },
    multiple: false,
  });

  return (
    <div className="foodSelector">
      <Select
        spellCheck="false"
        data-gramm="false"
        showSearch
        className="foodSelectorInput"
        size="large"
        value={selectedFood}
        placeholder="+ Add food"
        optionFilterProp="children"
        onChange={handleChange}
        filterOption={filterOption}
      >
        {foods.sort().map((foodName) => (
          <Select.Option key={foodName} value={foodName}>
            {foodName}
          </Select.Option>
        ))}
      </Select>
      <div {...getRootProps()} className="upload-container">
        <input {...getInputProps()} />
        {selectedFile ? (
          <div
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ) : (
          <p>Drag and drop an image here, or click to select a file</p>
        )}
        {selectedFile && <p>{selectedFile.name}</p>}
      </div>
      {loading ? (
        <Spin style={{ marginTop: "15px" }} size="large" />
      ) : (
        // Upload Image button outside the dropzone
        <button className="reusable-button" onClick={handleUpload}>
          Upload Image
        </button>
      )}
      {error && (
        <p className="error" style={{ marginTop: "15px", color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FoodSelector;
