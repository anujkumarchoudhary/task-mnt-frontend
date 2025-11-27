import React from "react";
import TopHeader from "@/components/layout/TopHeader";

const Layout = ({ children }) => {
  return (
    <div>
      <section>
        <TopHeader />
      </section>
      <section>{children}</section>
    </div>
  );
};

export default Layout;
