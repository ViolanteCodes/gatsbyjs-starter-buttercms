import React from "react";

export default function Four04() {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-10">
            <div className="hero-content">
              <h1>No Page Found</h1>

              <a
                target="_blank"
                rel="noreferrer"
                href="/"
                className="main-btn btn-hover"
              >
                Home
              </a>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <img
              width={300}
              height={300}
              src="https://cdn.buttercms.com/9bPtzdJ6QSWkySNjlmyR"
              alt=""
            />
            <div className="hero-image text-center text-lg-end"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
