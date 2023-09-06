import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={456}
    viewBox="0 0 280 456"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="605" y="237" rx="0" ry="0" width="1" height="0" />
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="278" rx="3" ry="3" width="280" height="26" />
    <rect x="0" y="316" rx="6" ry="6" width="280" height="82" />
    <rect x="0" y="415" rx="3" ry="3" width="85" height="30" />
    <rect x="151" y="406" rx="19" ry="19" width="128" height="43" />
  </ContentLoader>
);

export default Skeleton;
