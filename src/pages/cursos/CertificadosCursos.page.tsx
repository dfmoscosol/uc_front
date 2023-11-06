// components
import Header from "../../shared/header.component";
import { ChangeEvent, useEffect, useState } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch } from "../../hooks/reduxHooks";

const CertificadosCursosPage = (): JSX.Element => {
  // local variables
  const data = [
    "Curso Pedagogico para gestionar el aprendizaje con herramientas digitales y muchas cosas cheveres mas",
    "Aprendiendo a aprender Poderosas herramientas mentales con las que podrás dominar temas difíciles Learning How to Learn",
    "Aprendiendo a aprender Poderosas herramientas mentales con las que podrás dominar temas difíciles Learning How to Learn",
    "Modelo Multi Estratégico para la Enseñanza Efectiva en Línea"
  ]
  // constants
  const {
    certificados_cursos: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, [dispatch]);

  const [selectedfile, setSelectedFile] = useState<File>();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [search, setSearch] = useState("");

  const InputChange = (e) => {
    // --For Single File Input
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setSelectedFile(file);
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const getDate = (timestamp) => {

    const fecha = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const fechaFormateada = fecha.toLocaleString('en-IN', options);
    return fechaFormateada

  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const onClickItem = (item: string) => {
    setSearch("")
    setSelectedCourse(item)
  }

  const filtered = data.filter(item => item.toLowerCase().indexOf(search.toLowerCase()) > -1 || !search);


  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
      </div>
      {false ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3" }} >
            <div>

              <div className="wrapper">
                <p>
                  Curso Seleccionado: <b>{selectedCourse ? selectedCourse : "Ninguno"}</b>
                </p>
                <div className="search">
                  <input
                    type="search"
                    value={search}
                    placeholder="Busca un curso..."
                    onChange={onSearch}
                  />
                  <i className="zmdi zmdi-search"></i>
                </div>
                {search.length > 2 && (
                  <ul>
                    {filtered.map((item) => (
                      <li key={item} onClick={() => onClickItem(item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="kb-file-upload pt-3">
              <div className="file-upload-box">
                <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} />
                <span>Arrastra y suelta o<span className="file-link">elije el archivo</span></span>
              </div>
            </div>
            <div className="kb-attach-box mb-3">
              {selectedfile &&
                <div className="file-atc-box">

                  <div className="file-image"><i className="zmdi zmdi-file"></i></div>

                  <div className="file-detail">
                    <h6>{selectedfile.name}</h6>
                    <p><span>Size : {filesizes(selectedfile.size)}</span><br></br>
                      <span className="ml-2">Modified Time : {getDate(selectedfile.lastModified)}</span></p>
                  </div>
                </div>
              }
            </div>
            <div className="text-center pb-3">
              <button type="submit" className="boton-modal form-submit" onClick={() => console.log("selected:", selectedfile)}>Enviar Certificado</button>
            </div>
          </div>
        </>
      )
      }


    </>
  );
};

export default CertificadosCursosPage;
