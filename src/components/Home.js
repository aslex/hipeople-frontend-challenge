import React, { useState, useEffect } from "react";

export default function Home() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("");
  }, [photos]);

  return <div></div>;
}
