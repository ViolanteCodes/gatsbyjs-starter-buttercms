import React from "react";
import Hero from "./hero";
import Features from "./features";
import Testimonials from "./testimonials";
import camelcaseKeys from "camelcase-keys";
import MissingSection from "./missing-section";
import TwoColumnWithImage from "./two-column-with-image";
/**
 * @LandingPageSection component is used to show dynamic sequence as given in butterCMS page
 */
export default function LandingPageSection({ type, sectionData }) {
  /**
   * This logic is implemented for dynamic sequence,
   * In parrant component we are looping and passing type and content
   * based on type it will return component object
   */
  const sectionsComponentPaths = () => ({
    hero: <Hero type={type} {...camelcaseKeys(sectionData)} />,
    two_column_with_image: (
      <TwoColumnWithImage type={type} {...camelcaseKeys(sectionData)} />
    ),
    features: <Features type={type} {...camelcaseKeys(sectionData)} />,
    testimonials: <Testimonials type={type} {...camelcaseKeys(sectionData)} />,
  });
  const sectionComponent = sectionsComponentPaths()[type] || MissingSection;
  return sectionComponent;
}
