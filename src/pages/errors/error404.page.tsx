import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo3.png'; // Make sure to replace this with the actual path to your logo
import INTERNAL_ROUTES from '../../data/constants/internalRoutes';

const Error404 = (): JSX.Element => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate(INTERNAL_ROUTES.HOME)
    };

    return (
        <div className="row justify-content-center mt-5">
        <div className='col-4 align-items-center' >
            <div className="card-capacitacion text-center d-flex flex-column" >
                <div className="card-header" >
                    <img src={logo} alt="Logo" style={{ width: '300px', marginBottom: '20px' }} />
                </div>
                <div className="card-body d-flex flex-column flex-fill justify-content-around">
                    <h5 className="card-title">
                        Error 404
                    </h5>
                    <p>Recurso no encontrado</p>
                </div>
                <div className="card-footer text-muted">
                    <button className='btn btn-primary' onClick={handleGoHome} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                        Regresar al inicio
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Error404;
