import { useParams } from 'react-router-dom';
import Loader from '../../shared/loader.component';
import Header from '../../shared/header.component';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { getCapacitacion } from '../../redux/capacitaciones/getCapacitacion.slice';
import CharlaEvent from './CharlaDetail';
import TallerJornadaEvent from './TallerJornadaDetail';
import MicrotallerEvent from './MicrotallerDetail';
import ObservacionEvent from './ObservacionDetail';

const EventoDetallePage = () => {
  const { id, tallerId } = useParams();
  const { evento } = useAppSelector((state) => state.evento);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCapacitacion(Number(id), Number(tallerId)))
  }, [dispatch]);

  const renderEventDetails = () => {
    switch (evento?.tipo) {
      case 1:
        return <TallerJornadaEvent evento={evento} />;
      case 2:
        return <CharlaEvent evento={evento} />;
      case 3:
        return <MicrotallerEvent evento={evento} />;
      case 4:
        return <ObservacionEvent evento={evento} />;
      default:
        return <div>Unknown event type</div>;
    }
  };

  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        {!evento ? (
          <>
            <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
              <div className="col-4">
                <Loader></Loader>
              </div>
            </div>
          </>
        ) : (
          <>
            <Header title={evento.tipo === 1 ? `${evento.nombre_jornada}: ${evento.nombre}` : evento.nombre} />
            {renderEventDetails()}
          </>
        )}
      </div>

    </>

  );
};

export default EventoDetallePage;