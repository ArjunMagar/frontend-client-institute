const Modal = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center" style={{padding:"24px"}}>
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600" style={{padding:"8px 16px"}}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal