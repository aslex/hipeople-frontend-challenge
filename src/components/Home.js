import React, { useState, useEffect } from "react";
// import axios from 'axios';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [oldPhotos, setOldPhotos] = useState([]);
  const [thumb, setThumb] = useState(true);
  const [large, setLarge] = useState(false);

  useEffect(() => {
    // fetch(`https://api.unsplash.com/photos/random?count=30`, {
    //   method: "GET",
    //   headers: {
    //     "Accept-Version": "v1",
    //     Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
    //   },
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     console.log("api response:", res);
    //     setPhotos(res);
    //   });
  }, [photos]);

  const photoStream = photos.map((image) => {
    if (thumb) {
      return (
        <div className="photo-tile" key={image.id}>
          <img src={image.urls.thumb} alt={`by ${image.user.name}`} />
        </div>
      );
    }
    if (large) {
      return (
        <div className="photo-tile" key={image.id}>
          <img src={image.urls.regular} alt={`by ${image.user.name}`} />
        </div>
      );
    }
  });

  const loadMore = () => {
    setOldPhotos([photos]);
    setPhotos([]);
  };
  const handleSizeToggle = (e) => {
    console.log("target", e.target.id);
    if (e.target.id === "thumb") {
      setThumb(!thumb);
      document.querySelector("#thumb").classList.toggle("active");
      document.querySelector("#large").classList.toggle("active");
    } else if (e.target.id === "large") {
      setLarge(!large);
      document.querySelector("#thumb").classList.toggle("active");
      document.querySelector("#large").classList.toggle("active");
    }
  };

  return (
    <>
      <div className="size">
        <button id="thumb" className="active" onClick={handleSizeToggle}>
          Small
        </button>
        <button id="large" onClick={handleSizeToggle}>
          Large
        </button>
      </div>
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
