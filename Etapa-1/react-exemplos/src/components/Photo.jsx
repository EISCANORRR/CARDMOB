import React from "react";

const Photo = ( {photo}) => {
  return (
    <>
      <img src={photo.thumbnailUrl} alt={photo.title}></img>
      <h2>ID #{photo.id} {photo.title}</h2>
    </>
  )
}

export default Photo;