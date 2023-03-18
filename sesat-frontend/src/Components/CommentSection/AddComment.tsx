const AddComment = () =>
{
  return(
    <div className="w-full mt-5 mb-5 shadow-md">
      <form action="" className="w-full p-4">
        <label className="block mb-2">
          <span className="text-gray-600">Añade un comentario</span>
          <textarea className="block w-full mt-1 rounded" rows={3}></textarea>
        </label>
        <button className="px-3 py-2 text-sm btn text-blue-100 bg-primary rounded">Guardar Comentario</button>
      </form>
    </div>
  )
}

export default AddComment