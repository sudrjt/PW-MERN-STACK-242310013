"use client";
import React, { useState } from "react";
import {
  TextInput,
  TextAreaInput,
  InputCheckbox,
  InputImage,
} from "@/components/ui/forms";
import { Button } from "../../../ui/button";

export default function BookForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    bookTitle: initialData?.title || "",
    authorName: initialData?.author || "",
    isFree: initialData?.is_free || false,
    sinopsis: initialData?.sinopsis || "",
    story: initialData?.story || "",
    coverImage: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
        imagePreview: file ? URL.createObjectURL(file) : null,
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-muted mb-4">Fill in the details for the book.</p>
      <div className="row">
        <div className="col-md-5">
          <TextInput
            title="Book Title"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <TextInput
            title="Author Name"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2 d-flex align-items-center mt-4">
          <InputCheckbox
            title="Type Book"
            name="isFree"
            value="Is Free"
            checked={formData.isFree}
            onChange={handleChange}
            is_switch={true}
            required={false}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TextAreaInput
            title="Sinopsis"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            rows={3}
            required
          />
          <TextAreaInput
            title="Story"
            name="story"
            value={formData.story}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <div className="col-md-6">
          <InputImage
            title="Cover Image"
            name="coverImage"
            onChange={handleChange}
            imagePreview={formData.imagePreview}
            required={false}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center gap-3 mt-4 mb-2">
        <Button
          variant="light"
          type="button"
          onClick={onCancel}
          className="px-4 py-2"
        >
          <span className="fw-bold text-dark">Cancel</span>
        </Button>
        <Button variant="primary" type="submit" className="px-4 py-2">
          <span className="fw-bold">Submit Book</span>
        </Button>
      </div>
    </form>
  );
}
