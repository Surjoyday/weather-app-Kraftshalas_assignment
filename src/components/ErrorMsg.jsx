function ErrorMsg({ children }) {
  console.log("oooo");

  return (
    <div className="p-10 text-center font-medium contrast-125 text-red-600">
      {children}
    </div>
  );
}

export default ErrorMsg;
