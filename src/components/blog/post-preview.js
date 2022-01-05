import React from 'react';
import HumanDate from "../human-date"
import AuthorCard from '../author-card';

export default function PostsPreview({
  title,
  coverImage,
  coverImageAlt,
  date,
  author,
  tags,
  excerpt,
  slug
}) {
  return (
    <div className="col-12 col-lg-6">
      <div className="blog-roll-card">
        <div className="blog-roll-card-meta">
          <h2 className="blog-roll-card-header"><a href={`/blog/${slug}`}>{title}</a></h2>
          <ul className="blog-roll-card-meta-info">
            <li>
              <AuthorCard author={author} />
            </li>
            <li>
              <i className="lni lni-calendar"></i> <HumanDate dateString={date} />
            </li>
            <li>
              {tags.map(tag =>
              (<a key={tag.slug} href={`/blog/tag/${tag.slug}`}>
                <i className="lni lni-tag"></i> {tag.name}
                </a>)
              )}
            </li>
          </ul>
        </div>
        {coverImage && (
          <div className="single-post-thumbnail">
            <img
              src={coverImage}
              alt={coverImageAlt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="blog-roll-card-body prose" dangerouslySetInnerHTML={{ __html: excerpt }}>
        </div>
        <div className="blog-roll-card-footer text-center">
          <a href={`/blog/${slug}`} className="main-btn btn-hover">Read More</a>
        </div>
      </div>
    </div>
  )
}