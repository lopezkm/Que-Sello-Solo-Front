import React, { useState, useRef, useEffect } from 'react';
import  { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addImage, addImageClient } from '../../actions/index.js';
import Trodat4910 from '../../images/trodat4910.jpeg';
import Trodat4911 from '../../images/trodat4911.jpeg';
import Trodat3911 from '../../images/trodat3911.jpeg';
import TrodatPocket from '../../images/trodatPocket.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import { Modal, Button } from 'react-bootstrap';

export default function FormBigModel() {

    const [stamp, setStamp] = useState({
        lineOne: "",
        lineTwo: "",
        lineThree: "",
        lineFour: ""
    });

    const [bold, setBold] = useState ({
        checkLineOne: false,
        checkLineTwo: false,
        checkLineThree: false,
        checkLineFour: false
    });

    const [fontSize, setFontSize] = useState({
        lineOneStamp: 30,
        lineTwoStamp: 30,
        lineThreeStamp: 30,
        lineFourStamp: 30
    });

    const [fontFamily, setFontFamily] = useState({
        lineOneStamp: "arial-font",
        lineTwoStamp: "arial-font",
        lineThreeStamp: "arial-font",
        lineFourStamp: "arial-font"
    });

    const [imageStamp, setImageStamp] = useState();
    const [imageClient, setImageClient] = useState();
    
    const [selectedModel, setSelctedModel] = useState("Trodat 3911");

    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const lineOne = useRef(); 
    const lineTwo = useRef();
    const lineThree = useRef(); 
    const lineFour = useRef();

    const checkLineOne = useRef();    
    const checkLineTwo = useRef();
    const checkLineThree = useRef();    
    const checkLineFour = useRef();

    const lineOneStamp= useRef();
    const lineTwoStamp= useRef();
    const lineThreeStamp= useRef();
    const lineFourStamp= useRef();

    const finalStamp = useRef();

    function handleClose() {
        setShow(false);
    }
    
    function handleShow() {
        divToImgClient();
        setShow(true);
    } 

    function handleModel(e) {
        setSelctedModel(e.target.name);
        if(e.target.name === "Trodat 3911") {
            finalStamp.current.className="plantilla"
        } else if(e.target.name === "Trodat 4910") {
            finalStamp.current.className="trodat4910"
        } else if(e.target.name === "Trodat 4911") {
            finalStamp.current.className="trodat4911"
        } else if(e.target.name === "Trodat Pocket") {
            finalStamp.current.className="trodatPocket"
        }
    }
    
    function handleBold(e) {
        let name = e.target.name;
        setBold ({
            ...bold,
            [name]: !bold[name]
        });
    }

    function handleFont(e) {
        let name = e.target.name;
        setFontFamily({
            ...fontFamily,
            [name]: e.target.value
        })
    }

    useEffect(() => {
        if(bold.checkLineOne && stamp.lineOne) { 
            lineOneStamp.current.className = `${fontFamily.lineOneStamp}-bold`;
        } else if(stamp.lineOne) {
            lineOneStamp.current.className = `${fontFamily.lineOneStamp}`;
        } else {
            lineOneStamp.current.className = "invisible";
        }
        if(bold.checkLineTwo && stamp.lineTwo) { 
            lineTwoStamp.current.className = `${fontFamily.lineTwoStamp}-bold`;
        } else if(stamp.lineTwo){
            lineTwoStamp.current.className = fontFamily.lineTwoStamp;
        } else {
            lineTwoStamp.current.className = "invisible";
        }
        if(bold.checkLineThree && stamp.lineThree) { 
            lineThreeStamp.current.className = `${fontFamily.lineThreeStamp}-bold`;
        } else if(stamp.lineThree){
            lineThreeStamp.current.className = fontFamily.lineThreeStamp;
        } else {
            lineThreeStamp.current.className = "invisible";
        }
        if(bold.checkLineFour && stamp.lineFour) { 
            lineFourStamp.current.className = `${fontFamily.lineFourStamp}-bold`;
        } else if(stamp.lineFour){
            lineFourStamp.current.className = fontFamily.lineFourStamp;
        } else {
            lineFourStamp.current.className = "invisible";
        }
    }, [bold, fontFamily])

    function fontDecrease(e) {
        let name = e.target.name;
        if(fontSize[name] > 26) {
            setFontSize({
                ...fontSize,
                [name]: fontSize[name] - 2
            })
        } else {
            alert("El tamaño de fuente, no puede ser menor al actual");
        }
    }

    function fontIncrease(e) {
        let name = e.target.name;
        setFontSize({
            ...fontSize,
            [name]: fontSize[name] + 2
        })
    }

    function divToImg() {
        if(finalStamp.current.className === "plantilla") {
            finalStamp.current.className = "plantilla-invertida"
        } else if(finalStamp.current.className === "trodat4910") {
            finalStamp.current.className = "trodat4910-invertida"
        } else if(finalStamp.current.className === "trodat4911") {
            finalStamp.current.className = "trodat4911-invertida"
        } else if(finalStamp.current.className === "trodatPocket") {
            finalStamp.current.className = "trodatPocket-invertida"
        };
        html2canvas(document.getElementById("selloFinal"), {scrollY: -window.scrollY})
        .then(function (canvas) {
            var img = canvas.toDataURL('image/png', 1);
            setImageStamp (img);
        })
    }

    function divToImgClient() {
        html2canvas(document.getElementById("selloFinal"), {scrollY: -window.scrollY})
        .then(function (canvas) {
            var img = canvas.toDataURL('image/png', 1);
            setImageClient (img);
        })
    }

    useEffect(() => {
        dispatch(addImageClient(imageClient)); 
    }, [imageClient]) 

    useEffect(() => {
        dispatch(addImage(imageStamp)); 
    }, [imageStamp]) 

    function onSubmit(e) {
        e.preventDefault();
    }

    function lineData(e) {
        setStamp({
        ...stamp,
        [e.target.name]: e.target.value
        });
    }

    return (
        <div className="wrapper">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirmación de diseño</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Has finalizado el diseño de tu sello?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  No
                </Button>
                <Button variant="primary" onClick={divToImg}>Si</Button>
              </Modal.Footer>
            </Modal>
            {imageStamp ? <Redirect to="/personalData"/> : null}
            <div className="models-container">
                <p className="title-models">Selecciona tu modelo</p>
                <div className="d-flex justify-content-around">
                    <div className="model-container">
                        <img name="Trodat 3911" onClick={handleModel} className="models" src={Trodat3911}/>
                        <p className="models-name">Trodat 3911</p>
                    </div>
                    <div className="model-container">
                    <img name="Trodat 4910" onClick={handleModel} className="models" src={Trodat4910}/>
                        <p className="models-name">Trodat 4910</p>
                    </div>
                    <div className="model-container">
                    <img name="Trodat 4911" onClick={handleModel} className="models" src={Trodat4911}/>
                        <p className="models-name">Trodat 4911</p>
                    </div>
                    <div className="model-container">
                    <img name="Trodat Pocket" onClick={handleModel} className="models" src={TrodatPocket}/>
                        <p className="models-name">Trodat Pocket</p>
                    </div>
                </div> 
            </div>
            <h1 className="title">PERSONALIZA TU SELLO</h1>
            <div className="line-container">
                <div className="line-bottom-title"></div>
            </div>
            <div className="guide">
                Completa el formulario linea por linea y dale vida a tu sello
            </div>
            <div className="row row-contenedora">
                <div className="col-6">
                    <form autoComplete="off" className="formulario" onSubmit= {(e) => onSubmit(e)}>
                        <div className="d-flex">
                            <div className="adjustment-form-titles"></div>
                            <h6 className="h6-negrita">Negrita</h6>
                            <h6 className="h6-fuentes">Fuentes</h6>
                            <h6 className="h6-tamaño">Tamaño</h6>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input className="form-control" 
                                onChange= {lineData}
                                id="lineOne"
                                type="text" 
                                placeholder="Linea 1" 
                                name="lineOne"
                                ref= {lineOne}
                                />
                            </div>
                            <div className="col-6 d-flex justify-content-around px-0">
                                <div className="text-center">
                                    <input type="checkbox" 
                                    className="check-input"
                                    id="checkLineOne" 
                                    name="checkLineOne" 
                                    ref= {checkLineOne}
                                    onClick = {handleBold}
                                    />
                                </div>
                                <div className="text-center select-ancho-container">
                                    <select onChange={handleFont} 
                                    className="select-ancho" 
                                    id="font-family-one" 
                                    name="lineOneStamp">
                                        <option value="arial-font">Arial</option>
                                        <option value="times-new-roman-font">Times New Roman</option>
                                        <option value="roboto-condensed-font">Roboto Condensed</option>
                                        <option value="sofia-font-font">Sofia</option>
                                        <option value="staatliches-font">Staatliches</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <button type="button" 
                                        className="btn-fontSizeDe" 
                                        name="lineOneStamp" 
                                        onClick={fontDecrease}>
                                        <FontAwesomeIcon className="icon-down" icon={faArrowAltCircleDown}/>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-fontSizeIn" 
                                        name="lineOneStamp" 
                                        onClick={fontIncrease}>
                                        <FontAwesomeIcon className="icon-up" icon={faArrowAltCircleUp}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input className="form-control" 
                                id="lineTwo"
                                onChange= {lineData}
                                type="text" 
                                placeholder="Linea 2" 
                                name="lineTwo"
                                ref= {lineTwo}
                                />
                            </div>
                            <div className="col-6 d-flex justify-content-around px-0">
                                <div className="text-center">
                                    <input type="checkbox" 
                                    className="check-input"
                                    id="checkLineTwo" 
                                    name="checkLineTwo" 
                                    ref= {checkLineTwo}
                                    onClick = {handleBold}
                                    />
                                    </div>
                                <div className="text-center select-ancho-container">
                                    <select onChange={handleFont} 
                                    className="select-ancho" 
                                    id="font-family-two" 
                                    name="lineTwoStamp">
                                        <option value="arial-font">Arial</option>
                                        <option value="times-new-roman-font">Times New Roman</option>
                                        <option value="roboto-condensed-font">Roboto Condensed</option>
                                        <option value="sofia-font-font">Sofia</option>
                                        <option value="staatliches-font">Staatliches</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <button type="button" 
                                        className="btn-fontSizeDe" 
                                        name="lineTwoStamp"  
                                        onClick={fontDecrease}>
                                        <FontAwesomeIcon className="icon-down" icon={faArrowAltCircleDown}/>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-fontSizeIn" 
                                        name="lineTwoStamp" 
                                        onClick={fontIncrease}>
                                        <FontAwesomeIcon className="icon-up" icon={faArrowAltCircleUp}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input className="form-control" 
                                id="lineThree"
                                onChange= {lineData}
                                type="text" 
                                placeholder="Linea 3" 
                                name="lineThree"
                                ref= {lineThree}
                                />
                            </div>
                            <div className="col-6 d-flex justify-content-around px-0">
                                <div className="text-center">
                                    <input type="checkbox" 
                                    className="check-input"
                                    id="checkLineThree" 
                                    name="checkLineThree" 
                                    ref= {checkLineThree}
                                    onClick = {handleBold}
                                    />
                                    </div>
                                <div className="text-center select-ancho-container">
                                    <select onChange={handleFont} 
                                    className="select-ancho" 
                                    id="font-family-three" 
                                    name="lineThreeStamp">
                                        <option value="arial-font">Arial</option>
                                        <option value="times-new-roman-font">Times New Roman</option>
                                        <option value="roboto-condensed-font">Roboto Condensed</option>
                                        <option value="sofia-font-font">Sofia</option>
                                        <option value="staatliches-font">Staatliches</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <button type="button" 
                                        className="btn-fontSizeDe" 
                                        name="lineThreeStamp" 
                                        onClick={fontDecrease}>
                                        <FontAwesomeIcon className="icon-down" icon={faArrowAltCircleDown}/>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-fontSizeIn" 
                                        name="lineThreeStamp" 
                                        onClick={fontIncrease}>
                                        <FontAwesomeIcon className="icon-up" icon={faArrowAltCircleUp}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input className="form-control" 
                                id="lineFour"
                                onChange= {lineData}
                                type="text" 
                                placeholder="Linea 4" 
                                name="lineFour"
                                ref= {lineFour}
                                />
                            </div>
                            <div className="col-6 d-flex justify-content-around px-0">
                                <div className="text-center">
                                    <input type="checkbox" 
                                    className="check-input"
                                    id="checkLineFour" 
                                    name="checkLineFour" 
                                    ref= {checkLineFour}
                                    onClick = {handleBold}
                                    />
                                    </div>
                                <div className="text-center select-ancho-container">
                                    <select onChange={handleFont} 
                                    className="select-ancho" 
                                    id="font-family-four" 
                                    name="lineFourStamp">
                                        <option value="arial-font">Arial</option>
                                        <option value="times-new-roman-font">Times New Roman</option>
                                        <option value="roboto-condensed-font">Roboto Condensed</option>
                                        <option value="sofia-font-font">Sofia</option>
                                        <option value="staatliches-font">Staatliches</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <button type="button" 
                                        className="btn-fontSizeDe" 
                                        name="lineFourStamp" 
                                        onClick={fontDecrease}>
                                        <FontAwesomeIcon className="icon-down" icon={faArrowAltCircleDown}/>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-fontSizeIn" 
                                        name="lineFourStamp" 
                                        onClick={fontIncrease}>
                                        <FontAwesomeIcon className="icon-up" icon={faArrowAltCircleUp}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <button onClick={handleShow} className="form-button" type="submit">Finalizar</button>
                    </form>
                </div>
                <div className="col-6">
                    <div className="wrapper-plantilla">
                        <h1 className="titulo-plantilla">Modelo: {selectedModel}</h1>    
                        <div ref={finalStamp} id="selloFinal" className="plantilla">
                            <div className= {stamp.lineOne ? "linea-plantilla" : "invisible"}
                                style={{fontSize:`${fontSize.lineOneStamp}px`}} 
                                name="lineOneStamp" 
                                ref= {lineOneStamp}>
                                {stamp.lineOne}
                            </div>
                            <div className={stamp.lineTwo ? "linea-plantilla" : "invisible"}
                                style={{fontSize:`${fontSize.lineTwoStamp}px`}} 
                                name="lineTwoStamp" 
                                ref= {lineTwoStamp}>
                                {stamp.lineTwo}
                            </div>
                            <div className={stamp.lineThree ? "linea-plantilla" : "invisible"}
                                style={{fontSize:`${fontSize.lineThreeStamp}px`}} 
                                name="lineThreeStamp" 
                                ref= {lineThreeStamp}>
                                {stamp.lineThree}
                            </div>
                            <div className={stamp.lineFour ? "linea-plantilla" : "invisible"}
                                style={{fontSize:`${fontSize.lineFourStamp}px`}} 
                                name="lineFourStamp" 
                                ref= {lineFourStamp}>
                                {stamp.lineFour}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}