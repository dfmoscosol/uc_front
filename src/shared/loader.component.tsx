// images
import loader from "../assets/images/loader2.gif";

const Loader = (): JSX.Element => {
  return (
    <div className="page-loader-wrapper">
      <div className="loader">
          <img
            className=""
            src={loader}
            width="300"
            height="300"
            alt="Cargando Contenido"
          />
        </div>
    </div>
  );
};

export default Loader;
