const Backdrop = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-100 bg-opacity-50">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Backdrop;
