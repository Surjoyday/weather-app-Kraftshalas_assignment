import "../index.css";

function Loader({ bgColor }) {
  return (
    <aside className={`flex items-center justify-center h-screen ${bgColor}`}>
      <div className="pulsing-7"></div>
    </aside>
  );
}

export default Loader;
