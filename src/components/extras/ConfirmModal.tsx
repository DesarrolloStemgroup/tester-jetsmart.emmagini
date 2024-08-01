// components/ConfirmModal.tsx
import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck, FaTimes } from "react-icons/fa";

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="absolute inset-0 bg-black opacity-50"
				onClick={onClose}
			></div>
			<div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px] z-10">
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
					onClick={onClose}
				>
					<IoClose size={24} />
				</button>
				<h2 className="text-xl font-semibold mb-4">
					¿Estás seguro de que quieres salir?
				</h2>
				<div className="flex justify-center gap-4">
					<button
						className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2"
						onClick={onClose}
					>
						<FaTimes />
						Cancelar
					</button>
					<button
						className="px-4 py-2 bg-green-500 text-white rounded-lg  flex items-center gap-2"
						onClick={onConfirm}
					>
						<FaCheck />
						Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
