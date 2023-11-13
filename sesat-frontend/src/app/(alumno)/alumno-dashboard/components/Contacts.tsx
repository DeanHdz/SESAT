import React from 'react';
import ContactCard from './ContactCard';
import { Usuario } from '../../../../../types/ISESAT';

interface ContactsProps{
  contacts: Usuario[]
}

const Contacts = (props: ContactsProps) => {
  return (
    <div className="w-full mt-4 p-6 justify-center bg-white gray__border">
      <div className="w-full mb-5">
        <p className="text-xl font-SESAT">Contactos</p>
      </div>

      {props.contacts?.map((contact, i) => (
        <ContactCard nombre={`${contact.nombre} ${contact.apellido_paterno} ${contact.apellido_materno} `} correo={`${contact.correo}`}/>
        ))
      }

    </div>
  );
};

export default Contacts;
