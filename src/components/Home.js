import React, { useState, useEffect } from "react";
// import axios from 'axios';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [oldPhotos, setOldPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/random?count=30`, {
      method: "GET",
      headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("api response:", res);
        setPhotos(res);
      });
  }, []);

  const photoStream = photos.map((image) => {
    return (
      <div className="photo-tile" key={image.id}>
        <img src={image.urls.thumb} alt={`by ${image.user.name}`} />
      </div>
    );
  });

  const loadMore = () => {
    setOldPhotos([...photos]);
    setPhotos([]);
  };

  return (
    <>
      <div className="photo-scroll">
        {oldPhotos.length > 0 ? oldPhotos : <></>}
        {photoStream}
      </div>
      <button type="button" onClick={loadMore}>
        Load More
      </button>
    </>
  );
}
