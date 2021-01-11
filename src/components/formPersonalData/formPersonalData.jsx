import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';

export default function FormPersonalData() {

    const [personalInfo, setPersonalInfo] = useState ({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    })

    const [flag, setFlag] = useState(false);

    const stamp = useSelector(state => state.imageStamp);
    const stampClient = useSelector(state => state.imageClient);

    function onSubmit(e) {
        e.preventDefault();
        const  {firstName, lastName, email, phoneNumber} = personalInfo;
        /*const link = 'https://api.whatsapp.com/send?phone=54'; */
        emailjs.sendForm('quesello','mail_owner', e.target, 'user_zn2810wYzHJQG8AwVNida')
		.then((response) => {
				   console.log('SUCCESS!', response.status, response.text);
		}, (err) => {
				   console.log('FAILED...', err);
        });
        emailjs.sendForm('quesello','mail_buyer', e.target, 'user_zn2810wYzHJQG8AwVNida')
		.then((response) => {
				   console.log('SUCCESS!', response.status, response.text);
		}, (err) => {
				   console.log('FAILED...', err);
		});
        alert(`Listo ${firstName}, tu pedido se realizo con éxito. Te llegará un correo de confirmación a ${email}, y luego te contactaremos al ${phoneNumber} para coordinar los pasos a seguir. Muchas gracias por tu pedido.`);
        setFlag(true);        
    }

    function lineData(e) {
        setPersonalInfo({
        ...personalInfo,
        [e.target.name]: e.target.value
        });
    }

    useEffect(() => {

        if (personalInfo.email && emailRegex.test(personalInfo.email)) {
            emailText.current.className = "disable";
        } else {
            emailText.current.className = "p-personalInfo";
        }
        if (personalInfo.phoneNumber && numberRegex.test(personalInfo.phoneNumber)) {
            phoneNumber.current.className = "disable";
        } else {
            phoneNumber.current.className = "p-personalInfo";
        }
        
    }, [personalInfo])

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const emailText = useRef();
    const numberRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
    const phoneNumber = useRef();
   

    return (
        <div className="d-flex flex-column align-items-center form-data-container">
            {flag ? <Redirect to ="/" />: null }
            <h3 className="personlaInfo-title">Complete su información personal</h3>
            <div className="backgroudColor-container">
                <form autoComplete="off" className="form" onSubmit= {(e) => onSubmit(e)}>
                    <div className="row">
                        <div>
                            <input className="form-control-personalInfo" 
                            onChange= {lineData}
                            id="lineOne"
                            type="text" 
                            placeholder="NOMBRES - ejemplo: Jorge Augusto" 
                            name="firstName"
                            autoComplete="NoCompletar"
                            />
                        </div>
                    </div>
                    <p className= {personalInfo.firstName ? "disable" : "p-personalInfo"}>Este campo debe ser completado</p>
                    <div className="row">
                        <div>
                            <input className="form-control-personalInfo" 
                            onChange= {lineData}
                            id="lineTwo"
                            type="text" 
                            placeholder="APELLIDOS - ejemplo: Rodriguez Marti" 
                            name="lastName"
                            autoComplete="Tampoco"
                            />
                        </div>
                    </div>
                    <p className= {personalInfo.lastName ? "disable" : "p-personalInfo"}>Este campo debe ser completado</p>
                    <div className="row">
                        <div>
                            <input className="form-control-personalInfo" 
                            onChange= {lineData}
                            id="lineThree"
                            type="text" 
                            placeholder="EMAIL - ejemplo: Jorge_Marti@gmail.com" 
                            name="email"
                            autoComplete="NunaHacerlo"
                            />
                        </div>
                    </div>
                    <p className= {personalInfo.email ? "disable" : "p-personalInfo"}>Este campo debe ser completado</p>
                    <p ref={emailText} className="p-personalInfo">El email debe ser válido</p>
                    <div className="row">
                        <div>
                            <input className="form-control-personalInfo" 
                            onChange= {lineData}
                            id="lineFour"
                            type="text" 
                            placeholder="CELULAR - ejemplo: 3814578962" 
                            name="phoneNumber"
                            />
                        </div>
                    </div>
                    <p className= {personalInfo.phoneNumber ? "disable" : "p-personalInfo"}>Este campo debe ser completado</p>
                    <p ref={phoneNumber} className= "p-personalInfo">Solo debe ingresar números</p>
                    <button className="button-personalInfo" type="submit" 
                            disabled= {personalInfo.firstName && 
                            personalInfo.lastName && 
                            personalInfo.email && 
                            emailText.current.className === "disable" &&
                            personalInfo.phoneNumber && phoneNumber.current.className === "disable" ? false : true}> 
                        Enviar pedido 
                    </button>
                </form>
            </div>
        </div>
    );
}