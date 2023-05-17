import React from "react";
import Headers from "./Headers";
import Footers from "./Footers";

const Layout = (props) => {
    // console.log(props);
  return (
    <>
      <Headers />
        <div className="content">{props.children}</div>
      <Footers />
    </>
  );
};

export default Layout;
