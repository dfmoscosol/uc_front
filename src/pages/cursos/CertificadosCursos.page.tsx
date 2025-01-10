import Header from "../../shared/header.component";
import { ChangeEvent, useEffect, useState, useRef } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { postPdf, postPdfReset } from "../../redux/cursos/postPdfs.slice";
import { Toast, Modal, Button } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { getConfiguraciones } from "../../redux/capacitaciones/getConfiguracion.slice";

const CertificadosCursosPage = (): JSX.Element => {
  // local variables
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const toastRefSuccess = useRef<HTMLDivElement>(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la modal

  const { exito, isLoading } = useAppSelector((state) => state.send_pdf);
  const { configuraciones, totalHorasCertificados, loading } = useAppSelector((state) => state.configuracion);

  const {
    certificados_cursos: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConfiguraciones());
    dispatch(postPdfReset());
  }, [dispatch]);

  useEffect(() => {
    if (exito == true) {
      dispatch(postPdfReset());
      dispatch(getConfiguraciones());
      setShowSuccessAlert(true);
      setSelectedFile(null);
    } else if (exito == "Server error") {
      setShowErrorAlert(true);
    }
  }, [dispatch, exito]);

  const handleCloseSuccess = () => {
    setShowSuccessAlert(false);
  };

  const handleCloseError = () => {
    setShowErrorAlert(false);
  };

  const handleShowModal = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  }

  const handleCloseModal = () => setShowModal(false); // Cierra la modal

  const handleConfirmSubmit = () => {
    handleSubmit();
    handleCloseModal();
  };

  const InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    let file = e.target.files?.[0];

    if (file) {
      reader.onloadend = () => {
        if (file && file.type === "application/pdf") {
          setSelectedFile(file);
          setErrors((prevErrors) => ({ ...prevErrors, file: false }));
        } else {
          setSelectedFile(null);
          setErrors((prevErrors) => ({ ...prevErrors, file: true }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setErrors((prevErrors) => ({ ...prevErrors, file: true }));
    }
  };

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const getDate = (timestamp) => {
    const fecha = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const fechaFormateada = fecha.toLocaleString("en-IN", options);
    return fechaFormateada;
  };

  const [formData, setFormData] = useState({
    nombre_curso: "",
    horas_certificado: "",
    institucion: "",
  });

  const [errors, setErrors] = useState({
    nombre_curso: false,
    horas_certificado: false,
    institucion: false,
    file: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = () => {
    const data = {
      file: selectedFile!,
      nombre_curso: formData.nombre_curso,
      horas_certificado: parseInt(formData.horas_certificado, 10),
      institucion: formData.institucion,
      horas_acredita: Math.round(parseInt(formData.horas_certificado, 10) * configuraciones.porcentaje_certificado) > ((configuraciones.porcentaje_programa * configuraciones.horas_programa) - totalHorasCertificados) ? ((configuraciones.porcentaje_programa * configuraciones.horas_programa) - totalHorasCertificados) : Math.round(parseInt(formData.horas_certificado, 10) * configuraciones.porcentaje_certificado),
    };
    dispatch(postPdf(data));
    setFormData({
      nombre_curso: "",
      horas_certificado: "",
      institucion: "",
    })
  };

  const validateForm = () => {
    const newErrors = {
      nombre_curso: !formData.nombre_curso.trim(),
      horas_certificado: !formData.horas_certificado.trim(),
      institucion: !formData.institucion.trim(),
      file: !selectedFile,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  return (
    <>
      <div
        style={{
          background: "#ffffff",
          borderRight: "1px solid #d7dfe3",
          borderLeft: "1px solid #d7dfe3",
          borderTop: "1px solid #d7dfe3",
        }}
      >
        <Header title={pageTitle} />
      </div>
      {loading ? (
        <>
          <div
            className="row justify-content-center"
            style={{
              background: "#ffffff",
              borderRight: "1px solid #d7dfe3",
              borderLeft: "1px solid #d7dfe3",
              borderBottom: "1px solid #d7dfe3",
            }}
          >
            <div className="col-6">
              <Loader></Loader>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              background: "#ffffff",
              borderRight: "1px solid #d7dfe3",
              borderLeft: "1px solid #d7dfe3",
              borderBottom: "1px solid #d7dfe3",
            }}
          >

            <div className="d-flex justify-content-center">
              <div className="card shadow-sm" style={{ width: "100%", maxWidth: "900px" }}>
                <div className="card-header">
                  <h5 className="mb-0">Detalles del Certificado</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    {/* Nombre del Curso */}
                    <div className="col-md-12">
                      <label htmlFor="nombre_curso" className="form-label">
                        Nombre del Curso
                      </label>
                      <input
                        type="text"
                        id="nombre_curso"
                        name="nombre_curso"
                        className="form-control"
                        placeholder="Ingrese el nombre del curso"
                        value={formData.nombre_curso}
                        onChange={handleInputChange}
                      />
                      {errors.nombre_curso && (
                        <small className="text-danger">Este campo es obligatorio</small>
                      )}
                    </div>

                    {/* Institución Ofertante */}
                    <div className="col-md-6">
                      <label htmlFor="institucion" className="form-label">
                        Institución Ofertante
                      </label>
                      <input
                        type="text"
                        id="institucion"
                        name="institucion"
                        className="form-control"
                        placeholder="Ingrese la institución ofertante"
                        value={formData.institucion}
                        onChange={handleInputChange}
                      />
                      {errors.institucion && (
                        <small className="text-danger">Este campo es obligatorio</small>
                      )}
                    </div>

                    {/* Horas del Certificado */}
                    <div className="col-md-6">
                      <label htmlFor="horas_certificado" className="form-label">
                        Horas del Certificado
                      </label>
                      <input
                        type="number"
                        id="horas_certificado"
                        name="horas_certificado"
                        className="form-control"
                        placeholder="Ingrese las horas"
                        value={formData.horas_certificado}
                        onChange={handleInputChange}
                      />
                      {errors.horas_certificado && (
                        <small className="text-danger">Este campo es obligatorio</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="kb-file-upload pt-3">
              <div className="file-upload-box">
                <input
                  type="file"
                  id="fileupload"
                  className="file-upload-input"
                  onChange={InputChange}
                />
                <span>
                  Arrastra y suelta o
                  <span className="file-link"> elije el archivo .pdf</span>
                </span>
              </div>
              {errors.file && (
                <label className="error">Es necesario subir el archivo en formato pdf</label>
              )}
            </div>
            <div className="kb-attach-box mb-3">
              {selectedFile && (
                <div className="file-atc-box">
                  <div className="file-image">
                    <i className="zmdi zmdi-file"></i>
                  </div>
                  <div className="file-detail">
                    <h6>{selectedFile.name}</h6>
                    <p>
                      <span>Size : {filesizes(selectedFile.size)}</span>
                      <br />
                      <span>Modified Time : {getDate(selectedFile.lastModified)}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center pb-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleShowModal}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ImSpinner size={20} className="rotating" />
                ) : (
                  <FaSave style={{ marginRight: "5px" }} size={20} />
                )}
                Enviar Certificado
              </button>
            </div>
          </div>
        </>
      )}
      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header >
          <Modal.Title>Confirmación</Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Cerrar"
            onClick={() => setShowModal(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <>
            {
              ((configuraciones.porcentaje_programa * configuraciones.horas_programa) - totalHorasCertificados) !== 0 ?
                <>
                  Usted tiene disponibles <b>{((configuraciones.porcentaje_programa * configuraciones.horas_programa) - totalHorasCertificados)} horas</b> para acreditar certificados externos en el programa de formación.<br></br><br></br>
                  Para este certificado se le acreditarán <b>{Math.round(parseInt(formData.horas_certificado, 10) * configuraciones.porcentaje_certificado) > ((configuraciones.porcentaje_programa * configuraciones.horas_programa) - totalHorasCertificados) ? ((configuraciones.porcentaje_programa * configuraciones.horas_programa) - totalHorasCertificados) : Math.round(parseInt(formData.horas_certificado, 10) * configuraciones.porcentaje_certificado)} horas</b>.<br></br><br></br>
                  ¿Desea subir el certificado?
                </>
                :
                <>
                  Usted ya ha completado el máximo de <b>{(configuraciones.porcentaje_programa * configuraciones.horas_programa)} horas</b> para acreditar certificados externos en el programa de formación.
                </>
            }
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <>
            {
              ((configuraciones.porcentaje_programa * configuraciones.horas_programa) - totalHorasCertificados) !== 0 &&
              <Button variant="primary" onClick={handleConfirmSubmit}>
                Confirmar
              </Button>
            }
          </>

        </Modal.Footer>
      </Modal>
      {/* Toast de éxito */}
      {showSuccessAlert && (
        <div
          ref={toastRefSuccess}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1,
          }}
        >
          <Toast
            style={{
              background: "#fff",
              color: "#000",
              maxWidth: "300px",
            }}
            show={showSuccessAlert}
            delay={6000}
            onClose={handleCloseSuccess}
            autohide
          >
            <Toast.Header
              closeButton={false}
              style={{ background: "#157347", color: "#fff" }}
            >
              <strong className="me-auto">Éxito</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Cerrar"
                onClick={handleCloseSuccess}
              />
            </Toast.Header>
            <Toast.Body>
              El certificado se registró correctamente. Un analista de la
              Dirección lo validará para su posterior acreditación.
            </Toast.Body>
          </Toast>
        </div>
      )}

      {showErrorAlert && (
        <Toast
          ref={toastRefSuccess}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1,
            background: "#fff",
            color: "#000",
          }}
          show={showErrorAlert}
          delay={6000}
          autohide
          onClose={handleCloseError}
        >
          <Toast.Header style={{ background: "#A51008", color: "#fff" }}>
            <strong className="me-auto">Error</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleCloseError}
            />
          </Toast.Header>
          <Toast.Body>
            No se pudo subir el certificado, el tamaño máximo del archivo es de
            1MB.
          </Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default CertificadosCursosPage;

