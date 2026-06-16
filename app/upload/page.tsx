"use client";

import { useState } from "react";

export default function UploadImage() {
 const [image, setImage] = useState<File | null>(null);
 const [imageUrl, setImageUrl] = useState("");

 async function handleUpload() {
  if (!image) return;

  const reader = new FileReader();

  reader.readAsDataURL(image);

  reader.onloadend = async () => {
   const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     file: reader.result,
    }),
   });

   const data = await res.json();

   setImageUrl(data.imageUrl);
  };
 }

 return (
  <div>
   <input
    type="file"
    onChange={(e) =>
     setImage(e.target.files?.[0] || null)
    }
   />

   <button onClick={handleUpload}>
    Upload
   </button>

   {imageUrl && (
    <img
     src={imageUrl}
     alt="Uploaded"
     width={300}
    />
   )}
  </div>
 );
}