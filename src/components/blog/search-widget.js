import React from "react";
export default function SearchWidget() {
  return (
    <div className="sidebar blog-grid-page">
      <div className="widget search-widget">
        <h5 className="widget-title">Search This Site</h5>
        <form action={`/blog/search`} method="get">
          <input name="q" type="text" placeholder="Search Here..." />
          <button type="submit">
            <i className="lni lni-search-alt"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
