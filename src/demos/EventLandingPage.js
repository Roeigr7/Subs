import React from "react";
import Blog from "components/blogs/ThreeColSimpleWithImage.js";
import Features from "components/features/ThreeColCenteredStatsPrimaryBackground";
import Footer from "components/footers/SimpleFiveColumn.js";
import ContactUsForm from "components/forms/SimpleContactUs.js";
import Hero from "components/hero/BackgroundAsImage";
import Testimonial from "components/testimonials/TwoColumnWithImage.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <Blog />
    <Testimonial />
    <ContactUsForm />
    <Footer />
  </AnimationRevealPage>
);
