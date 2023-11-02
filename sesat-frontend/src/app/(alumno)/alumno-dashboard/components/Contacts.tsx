import React from 'react';
import ContactCard from './ContactCard';
import { Usuario } from '../../../../../types/ISESAT';

interface ContactsProps{
  contacts: Usuario[]
}

const Contacts = (props: ContactsProps) => {
  return (
    <div className="w-full pb-5 justify-center">
      <div className="w-full pb-5 pt-5 justify-center">
        <p className="text-2xl font-bold">Contactos</p>
      </div>

      {props.contacts?.map((contact, i) => (
        <ContactCard nombre={`${contact.nombre} ${contact.apellido_paterno} ${contact.apellido_materno} `} correo={`${contact.correo}`}/>
        ))
      }

    </div>
  );
};

export default Contacts;
