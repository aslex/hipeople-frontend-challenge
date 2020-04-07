import React, { useState, useEffect } from "react";

export default function Home() {
  const [photos, setPhotos] = useState([]);
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
    return (
      <div className="photo-tile" key={`${image.id}${index}`}>
        <a href={image.urls.raw} target="_blank">
          <img
            src={image.urls.thumb}
            alt={image.description || `by ${image.user.name}`}
          />
        </a>
      </div>
    );
  });

  function handleLoadMore() {
    setLoadMore(!loadMore);
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="sticky">
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
