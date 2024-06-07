import loader from "../assets/images/loader.gif";

function Loader({ bgColor }) {
  return (
    <div className={`flex items-center justify-center h-screen ${bgColor}`}>
      <img src={loader} alt="loader-gif" className="w-80" />
    </div>
  );
}

export default Loader;
