import React from "react";

export default function PostPreviewCondensed({
  title,
  coverImage,
  coverImageAlt,
  excerpt,
  slug,
}) {
  return (
    <div className="col-lg-4 col-md-8 col-sm-10">
      <div className="single-blog">
        {coverImage && (
          <div className="blog-header">
            <img
              src={coverImage}
              alt={coverImageAlt}
              layout="fill"
              objectFit="cover"
              className="blog-preview-css"
            />
          </div>
        )}
        <div className="blog-body">
          <h5 className="package-name">
            <a href={`/blog/${slug}`}>{title}</a>
          </h5>
          <p>{excerpt}</p>
        </div>
        <div className="blog-footer">
          <a className="main-btn btn-hover" href={`/blog/${slug}`}>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
