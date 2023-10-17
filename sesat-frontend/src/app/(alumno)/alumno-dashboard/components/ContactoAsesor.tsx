import React from 'react';
import CardAsesor from './CardAsesor';

const ContactoAsesor = () => {
  return (
    <div className="w-full pb-5 justify-center">
          <div className="w-full pb-5 pt-5 justify-center">
            <p className="text-2xl font-bold">Contactos</p>
          </div>
          <CardAsesor nombre="SANDRA EDITH NAVA MUÑOZ" correo='senavam@uaslp.mx' webLink="#"/>
          <CardAsesor nombre="FRANCISCO EDGAR CASTILLO BARRERA" correo='ecastillo@uaslp.mx' webLink="#"/>
    </div>
  );
};

export default ContactoAsesor;
