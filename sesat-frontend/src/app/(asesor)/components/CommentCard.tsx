import Link from "next/link";

const CommentCard = ({ title, webLink, texta }: { title: string; webLink: string; texta:string;}) => {
  return (
    <Link
      href={webLink}
      className="mb-6 bg-light-blue-10 lg:w-3/3 lg:h-1/3 flex flex-col pb-5 h-[250px] rounded border border-red-500 border-solid hover:bg-light-blue-15 border-l-4 -red-500"
    >

      <label className="m-3 block text-1xl font-bold cursor-pointer mb-0 bt-0">
        {title}
      </label>

      <label className="m-3 block text-l cursor-pointer mb-0 bt-0">
        {texta}
      </label>
    </Link>
  );
};

export default CommentCard;
