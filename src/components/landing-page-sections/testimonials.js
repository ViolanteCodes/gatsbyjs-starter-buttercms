import React, { useEffect } from "react";
import Testimonial from "./testimonial";
/**
 * @Testimonials component is used to show slider based on butterCMS content
 */
export default function Testimonials({
  headline,
  testimonial: testimonials,
  scrollAnchorId,
}) {
  useEffect(() => {
    const getTns = async () => {
      if (typeof window !== "undefined") {
        const dynamicModule = await import("tiny-slider");
        let slider = dynamicModule?.tns({
          container: ".testimonial-active",
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayButtonOutput: false,
          mouseDrag: true,
          gutter: 0,
          nav: false,
          navPosition: "bottom",
          controls: true,
          controlsText: [
            '<i class="lni lni-chevron-left"></i>',
            '<i class="lni lni-chevron-right"></i>',
          ],
          items: 1,
        });
        return slider;
      }
    };
    getTns();
  });

  return (
    <section id={scrollAnchorId} className="testimonial-section mt-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div className="testimonial-active-wrapper">
              <div className="section-title text-center">
                <h2 className="mb-20">{headline}</h2>
              </div>

              <div className="testimonial-active">
                {typeof window !== "undefined" &&
                  testimonials.map((testimonial, index) => (
                    <Testimonial
                      key={index}
                      quote={testimonial.quote}
                      name={testimonial.name}
                      title={testimonial.title}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
