import { Link } from "react-router-dom";

// images
import logo from "../../assets/images/logo.png";

// constants
import INTERNAL_PATHS from "../../data/constants/internalRoutes";

import styles from "./noData.module.scss";

type Props = {
  message: string;
  linkText?: string;
  link?: string;
};

const NoData: React.FC<Props> = ({
  message,
  linkText = "Volver al inicio",
  link = INTERNAL_PATHS.HOME,
}): JSX.Element => {
  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">{message}</h5>
        <img
          src={logo}
          width="35%"
          alt="No data"
          className="mx-auto d-block pt-2 pb-2"
        />
        <Link
          to={link}
          className={`btn btn-success btn-sm pt-2 pb-2 ${styles.btnnoData}`}
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default NoData;
