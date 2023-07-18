import { ReactNode, FC } from "react";

//images components
import RightSidebar from "./rightSidebar.layout";
import LeftSidebar from "./leftSidebar.layout";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import INTERNAL_ROUTES from "../data/constants/internalRoutes";

interface Props {
  children?: ReactNode;
}

const Skeleton = ({ children }: Props): JSX.Element => {
  return (
    <div className="theme-blush">
      <div className="overlay"></div>
      <LeftSidebar />
      {/* <RightSidebar /> */}

      
      <section className="content">
        <div className="body_scroll">{children}</div>
      </section>
    </div>
  );
};

export default Skeleton;
