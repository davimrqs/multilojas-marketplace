export default function ModalComprovante({ isOpen, onClose, imagemUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-xl max-w-lg w-full relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute -top-10 right-0 text-white font-bold"
        >
          Fechar [X]
        </button>
        <h2 className="text-lg font-bold mb-4">Comprovante de Pagamento</h2>
        <img src={imagemUrl} alt="Comprovante" className="w-full rounded-lg border" />
      </div>
    </div>
  );
}