// components
import Header from "../../shared/header.component";
import { ChangeEvent, useEffect, useState, useRef } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { CursosTitulosGetAllReset, getCursosTitulos } from "../../redux/cursos/getTitulosCursos.slice";
import { postPdf, postPdfReset } from "../../redux/cursos/postPdfs.slice";
import { CursosTitulos } from "../../redux/utils/cursosState.model";
import { Toast } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";


const CertificadosCursosPage = (): JSX.Element => {
  // local variables
  const [selectedfile, setSelectedFile] = useState<File | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CursosTitulos | null>(null);
  const [errorSelectCurso, setErrorSelectCurso] = useState(false);
  const [errorSelectFile, setErrorSelectFile] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const toastRefSuccess = useRef<HTMLDivElement>(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { cursos_titulos: data } = useAppSelector((state) => state.titulos_cursos)
  const { exito, isLoading } = useAppSelector((state) => state.send_pdf)

  // constants
  const {
    certificados_cursos: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(CursosTitulosGetAllReset())
    dispatch(getCursosTitulos())
    dispatch(postPdfReset())
  }, [dispatch]);

  useEffect(() => {
    if (exito == true) {
      dispatch(CursosTitulosGetAllReset())
      dispatch(getCursosTitulos())
      dispatch(postPdfReset())
      setShowSuccessAlert(true)
      setSelectedFile(null)
      setSelectedCourse(null)
    } else if (exito == 'Server error') {
      setShowErrorAlert(true)
    }
  }, [dispatch, exito]);


  const handleCloseSuccess = () => {
    setShowSuccessAlert(false)
  };

  const handleCloseError = () => {
    setShowErrorAlert(false)
  };

  const InputChange = (e) => {
    // --For Single File Input
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      if (file.type == 'application/pdf') {
        setSelectedFile(file);
        setErrorSelectFile(false)
      }else{
        setSelectedFile(null)
        setErrorSelectFile(true)
      }
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

  const onClickItem = (item: CursosTitulos) => {
    setSearch("")
    setSelectedCourse(item)
    setErrorSelectCurso(false)
  }

  const filtered = data?.filter(item => item.titulo.toLowerCase().indexOf(search.toLowerCase()) > -1 || !search);

  const handleSubmit = () => {
    if (selectedfile && selectedCourse) {
      const data = {
        file: selectedfile,
        id_curso: selectedCourse.id_curso
      };
      dispatch(postPdf(data))

    } else {
      if (!selectedfile) {
        setErrorSelectFile(true)
      }
      if (!selectedCourse) {
        setErrorSelectCurso(true)
      }
    }

  }
  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
      </div>
      {data && data.length === 0 ? (
        <>
          <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
            <div className="col-6">
              <Loader></Loader>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3" }} >

            <div className="wrapper">
              <p>
                Curso Seleccionado: <b>{selectedCourse ? selectedCourse.titulo : "Ninguno"}</b>
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
              {errorSelectCurso! ? (<><label className="error">{`Debe elegir el curso tomado`}</label></>) : (<></>)}
              {search.length > 2 && (
                <ul>
                  {filtered?.map((item) => (
                    <li key={item.id_curso} onClick={() => onClickItem(item)}>
                      {item.titulo}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="kb-file-upload pt-3">
              <div className="file-upload-box">
                <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} />
                <span>Arrastra y suelta o<span className="file-link">elije el archivo .pdf</span></span>
              </div>
              {errorSelectFile! ? (<><label className="error">{`Debe adjuntar el certificado en formato PDF`}</label></>) : (<></>)}
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
              <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}
              >
                {isLoading ? <ImSpinner size={20} className='rotating' /> : <FaSave style={{ marginRight: "5px" }} size={20} />}Enviar Certificado</button>
            </div>

          </div>
        </>
      )
      }
      {showSuccessAlert && (
        <div
          ref={toastRefSuccess}
          style={{
            position: 'absolute',
            top: 20, // Puedes ajustar esta posición para que se muestre donde desees
            right: 20, // Puedes ajustar esta posición para que se muestre donde desees
            zIndex: 1,
          }}
        >
          <Toast style={{
            background: '#fff', // Color de fondo
            color: '#000', // Color del texto
            maxWidth: '300px', // Ancho máximo del Toast
          }} show={showSuccessAlert} delay={6000} onClose={handleCloseSuccess} autohide>
            <Toast.Header closeButton={false} style={{ background: '#157347', color: '#fff' }}>
              <strong className="me-auto">Éxito</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Cerrar"
                onClick={handleCloseSuccess}
              />
            </Toast.Header>
            <Toast.Body>
              El certificado se registró correctamente. Un analista de la Dirección lo validará para su posterior acreditación.
            </Toast.Body>
          </Toast>
        </div>
      )}
      {showErrorAlert && (
        <div
          ref={toastRefSuccess}
          style={{
            position: 'absolute',
            top: 20, // Puedes ajustar esta posición para que se muestre donde desees
            right: 20, // Puedes ajustar esta posición para que se muestre donde desees
            zIndex: 1,
          }}
        >
          <Toast style={{
            background: '#fff', // Color de fondo
            color: '#000', // Color del texto
            maxWidth: '300px', // Ancho máximo del Toast
          }} show={showErrorAlert} onClose={handleCloseError} autohide delay={6000}>
            <Toast.Header closeButton={false} style={{ background: '#A51008', color: '#fff' }}>
              <strong className="me-auto">Error</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Cerrar"
                onClick={handleCloseError}
              />
            </Toast.Header>
            <Toast.Body>
              No se pudo subir el certificado, el tamaño máximo del archivo pdf es de 1MB.
            </Toast.Body>
          </Toast>
        </div>
      )}

    </>
  );
};

export default CertificadosCursosPage;
