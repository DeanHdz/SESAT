import Link from "next/link";

interface ContactCardProps{
  nombre: string,
  correo: string
}

const ContactCard = (props: ContactCardProps) => {
  return (
      <a href={`mailto:${props.correo}`} className="mb-6 bg-light-blue-10 flex flex-col pb-5 rounded-xl border hover:bg-light-blue-15">
        <label className="m-3 block text-1xl font-bold cursor-pointer mb-0 bt-0">
          {props.nombre}
        </label>

        <label className="m-3 block text-l cursor-pointer mb-0 bt-0">
          {props.correo}
        </label>
      </a>
  );
};

export default ContactCard;
