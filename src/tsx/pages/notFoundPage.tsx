import TopBar from "../components/TopBar";
import React from "react";
import LOCALS from "../locals";

const NotFoundPage = () => {
  return (
    <TopBar>
      <h2>
        <div>{LOCALS.pageNotFound}</div>
      </h2>
    </TopBar>
  );
}

export default NotFoundPage;
