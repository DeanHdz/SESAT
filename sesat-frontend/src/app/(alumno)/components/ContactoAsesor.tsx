import React from 'react';
import CardAsesor from './CardAsesor';

const ContactoAsesor = () => {
  return (
    <div className="w-full pb-5 justify-center">
          <div className="w-full pb-5 justify-center">
            <p className="text-2xl font-bold">Contactos</p>
          </div>
          <CardAsesor title="FRANCISCO EDGAR CASTILLO BARRERA" correo='bjfejbk@dxjedbje.com' webLink="#"/>
          <CardAsesor title="Francisco Martínez" correo='bjfejbk@dxjedbje.com' webLink="#"/>
    </div>
  );
};

export default ContactoAsesor;
