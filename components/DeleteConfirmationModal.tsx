"use client";
import { Loader2, Trash2 } from "lucide-react";
import type React from "react";

import { useState } from "react";

interface DeleteConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => Promise<void>;
	title: string;
	message: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	if (!isOpen) return null;

	const handleConfirm = async () => {
		setIsDeleting(true);
		try {
			await onConfirm();
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="fixed inset-0  bg-black/50 backdrop-blur-sm   z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col items-center p-6">
				{/* Icon */}
				<div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4">
					<Trash2 size={24} className="text-red-700" />
				</div>

				{/* Title */}
				<h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>

				{/* Message */}
				<p className="text-gray-600 text-center mb-6">{message}</p>

				{/* Delete Button */}
				<button onClick={handleConfirm} className="w-full py-3 bg-red-600 text-white rounded-full hover:bg-red-600 flex items-center justify-center" disabled={isDeleting}>
					{isDeleting ? (
						<>
							<Loader2 size={18} className="mr-2 animate-spin" /> Deleting...
						</>
					) : (
						"Delete"
					)}
				</button>

				{/* Cancel option */}
				<button onClick={onClose} className="w-full rounded-full mt-3 py-3 text-white hover:text-white bg-gray-800" disabled={isDeleting} >
					Cancel
				</button>
			</div>
		</div>
	);
};

export default DeleteConfirmationModal;