import React from "react";

import "./About.css";
import AboutImg from "../../public/images/about.jpg";

export default function () {
  return (
    <div className="about wrap-content">
      <div className="container">
        <h3>ABOUT REI</h3>
        <img src={AboutImg} alt="" />
        <div className="about-article">
          An About Us page helps your company make a good first impression, and
          is critical for building customer trust and loyalty. An About Us page
          should make sure to cover basic information about the store and its
          founders, explain the company's purpose and how it differs from the
          competition, and encourage discussion and interaction. Here are some
          free templates, samples, and example About Us pages to help your
          ecommerce store stand out from the crowd.
        </div>
        <div className="about-article">
          When it comes to personalizing your online store, nothing is more
          effective than an About Us page. This is a quick summary of your
          company's history and purpose, and should provide a clear overview of
          the company's brand story. A great About Us page can help tell your
          brand story, establish customer loyalty, and turn your bland ecommerce
          store into an well-loved brand icon. Most importantly, it will give
          your customers a reason to shop from your brand.
        </div>
        <div className="about-article">
          In this post, we'll give you{" "}
          <strong>
            three different ways to create a professional about us page{" "}
          </strong>
          for your online store, blog, or other website - use our about us page
          generator, use the fill-in-the-blank about us template below, or
          create your own custom page using the about us examples within this
          article.
        </div>
      </div>
    </div>
  );
}
