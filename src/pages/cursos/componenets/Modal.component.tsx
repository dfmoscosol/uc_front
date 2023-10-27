import { useRef, useState } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

import {
    AiFillDislike,
    AiFillLike,
    AiOutlineDislike,
    AiOutlineLike
} from 'react-icons/ai';

const abrirEnlaceEnNuevaPestana = (enlace) => {
    window.open(enlace, '_blank'); // Abre el enlace en una nueva pestaña
};




const ModalComponent = ({ url, keyWords, onClose }) => {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [keyActives, setkeyActives] = useState(Array(keyWords.length).fill(false));

    const handleLike = () => {
        if (!like) {
            setLike(true);
            setDislike(false);
        } else {
            setLike(false)
        }
    }

    const handleDislike = () => {
        if (!dislike) {
            setLike(false);
            setDislike(true);
        } else {
            setDislike(false)
        }
    }
    const changeKeyActive = (index) => {
        setkeyActives((prevState) => {
            const updatedArray = [...prevState]; // Copiamos el array original
            updatedArray[index] = !updatedArray[index]; // Cambiamos el valor en el índice
            return updatedArray; // Devolvemos el nuevo array como el nuevo estado
        });
    };

    return (
        <Modal show={true} backdrop="static" keyboard={false} onHide={onClose} centered>
            <Modal.Header >
                <Modal.Title>Ayúdanos a mejorar las recomendaciones</Modal.Title>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Cerrar"
                    onClick={onClose}
                />
            </Modal.Header>
            <Modal.Body>
                <p className='text-center'>¿Le parece útil esta recomendación?</p>
                <div className="row justify-content-center ">
                    <button className="btn-like" onClick={handleLike}>{like ? (<AiFillLike></AiFillLike>) : (<AiOutlineLike></AiOutlineLike>)}</button>
                    <button className="btn-like" onClick={handleDislike}>{dislike ? (<AiFillDislike></AiFillDislike>) : (<AiOutlineDislike></AiOutlineDislike>)}</button>
                </div>
                {like || dislike ? (<>
                    {like ? (<p className='text-center pt-4' style={{ paddingInline: "40px" }}>Seleccione las palabras claves de este curso que considere pertinentes a esta competencia</p>
                    ) : (
                        <p className='text-center pt-4' style={{ paddingInline: "40px" }}>Seleccione las palabras claves de este curso que considere ajenas a esta competencia</p>)}
                    <div className="text-center">
                        {keyWords?.map(
                            (word, index): JSX.Element => (
                                <>
                                    <Badge onClick={() => changeKeyActive(index)} bg={keyActives[index] ? "primary" : "secondary"}>{word}</Badge>
                                </>
                            ))}
                    </div>
                </>) : (<></>)}


            </Modal.Body>
            {like || dislike ? (<Modal.Footer>
                <button className="boton-modal" onClick={() => {

                }}>Enviar Retroalimentación</button>
            </Modal.Footer>) : (<></>)}
        </Modal>
    );
};

export default ModalComponent;