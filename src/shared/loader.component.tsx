// images
import loader from "../assets/images/loader2.gif";

const Loader = (): JSX.Element => {
  return (
    <div className="page-loader-wrapper">
      <div className="loader">
        <div className="m-t-30">
          <img
            className=""
            src={loader}
            width="200"
            height="200"
            alt="Cargando Contenido"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
