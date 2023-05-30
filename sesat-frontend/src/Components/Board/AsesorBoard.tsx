import TesisCard from "../TesisView/TesisCard";

const AsesorBoard = () => {
    return (
        <form className="mt-10 lg:flex lg:flex-row w-11/12 m-auto  flex justify-center">
            <div className="block w-11/12 lg:w-8/12 mr-6">
                <label className="m-3 block text-2xl font-bold">Ultima tesis revisada</label>
                <TesisCard />
            </div>
        </form>
    );
};

export default AsesorBoard;