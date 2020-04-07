import React, { useState, useEffect } from "react";
// import axios from 'axios';

export default function Home() {
  const [photos, setPhotos] = useState([]);

  const [thumb, setThumb] = useState(true);
  const [large, setLarge] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    console.log("use effect !");
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
        setPhotos([...photos, ...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loadMore]);

  const photoStream = photos.map((image, index) => {
    console.log("mapping!");

    return (
      <div className="photo-tile" key={`${image.id}${index}`}>
        <img
          src={image.urls.thumb}
          alt={image.description || `by ${image.user.name}`}
        />
      </div>
    );
  });

  function handleLoadMore() {
    setLoadMore(!loadMore);
  }

  const handleScrollTop = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="size">
        <button className="active" onClick={handleScrollTop}>
          scroll to top
        </button>
      </div>
      <div className="photo-scroll">{photoStream}</div>
      <button type="button" onClick={handleLoadMore}>
        Load More
      </button>
    </>
  );
}
