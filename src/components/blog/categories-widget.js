import React from "react";
/* eslint-disable */
export default function CategoriesWidget({ categories }) {
  return (
    <div className="widget categories-widget">
      <h5 className="widget-title">Categories</h5>
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category.slug}>
            <a href={`/blog/category/${category.slug}`}>
              <a>{category.name}</a>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
