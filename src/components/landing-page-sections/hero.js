import React from "react";

/**
 * @Hero component is used to show hero content from the butter cms
 */

export default function Hero({
  headline,
  subheadline,
  image,
  buttonLabel,
  buttonUrl,
  scrollAnchorId,
}) {
  return (
    <section id={scrollAnchorId} className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-10">
            <div className="hero-content">
              <h1>{headline}</h1>
              <p>{subheadline}</p>

              <a href={buttonUrl} className="main-btn btn-hover">
                {buttonLabel}
              </a>
              <a href="https://buttercms.com/join/">Need an account?</a>
            </div>
          </div>
          {image && (
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="hero-image text-center text-lg-end">
                <img src={image} layout="responsive" alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
