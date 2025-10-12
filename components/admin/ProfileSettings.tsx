import React, { useEffect, useState } from "react";
import { fetchCurrentUser, updateProfile, changePassword } from "@/lib/api";
import { User, Lock, Check, X, Mail } from "lucide-react";

interface ProfileSettingsProps {
	onClose: () => void;
}

export default function ProfileSettings({ onClose }: ProfileSettingsProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordLoading, setIsPasswordLoading] = useState(false);

	useEffect(() => {
		async function fetchUser() {
			try {
				const user = await fetchCurrentUser();
				setName(user.name || "");
				setEmail(user.email || "");
			} catch (err) {
				setError("Failed to fetch user info");
			}
		}
		fetchUser();
	}, []);

	async function handleProfileSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setIsLoading(true);
		
		try {
			await updateProfile({ name });
			setSuccess("Profile updated successfully!");
			setTimeout(() => setSuccess(null), 3000);
		} catch (err) {
			setError("Failed to update profile.");
		} finally {
			setIsLoading(false);
		}
	}

	async function handlePasswordSubmit(e: React.FormEvent) {
		e.preventDefault();
		setPasswordError(null);
		setPasswordSuccess(null);
		
		if (newPassword !== confirmPassword) {
			setPasswordError("New passwords do not match.");
			return;
		}
		
		setIsPasswordLoading(true);
		
		try {
			await changePassword({ currentPassword, newPassword });
			setPasswordSuccess("Password changed successfully!");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
			setTimeout(() => setPasswordSuccess(null), 3000);
		} catch (err) {
			setPasswordError("Failed to change password.");
		} finally {
			setIsPasswordLoading(false);
		}
	}

	return (
		<div className="fixed inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
				{/* Header */}
				<div className="bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-6 relative overflow-hidden">
					<div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
					<div className="relative flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
								<User className="w-6 h-6 text-white" />
							</div>
							<h1 className="text-3xl font-bold text-white">Profile Settings</h1>
						</div>
						<button 
							onClick={onClose} 
							className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
						>
							<X className="w-5 h-5 text-white" />
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="overflow-y-auto max-h-[calc(90vh-100px)] p-8">
					{/* Profile Section */}
					<div className="mb-10">
						<div className="flex items-center gap-2 mb-6">
							<div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
								<User className="w-4 h-4 text-sky-600" />
							</div>
							<h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
						</div>
						
						<div className="space-y-5">
							<div className="group">
								<label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
								<input
									type="text"
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all duration-200"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter your name"
									required
								/>
							</div>
							
							<div className="group">
								<label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
								<div className="relative">
									<input 
										type="email" 
										className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500" 
										value={email} 
										disabled 
									/>
									<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								</div>
								<p className="mt-2 text-xs text-gray-500">Email cannot be changed</p>
							</div>
							
							{error && (
								<div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
									<X className="w-4 h-4 flex-shrink-0" />
									<span>{error}</span>
								</div>
							)}
							
							{success && (
								<div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
									<Check className="w-4 h-4 flex-shrink-0" />
									<span>{success}</span>
								</div>
							)}
							
							<button 
								onClick={handleProfileSubmit}
								disabled={isLoading}
								className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
							>
								{isLoading ? (
									<>
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										<span>Updating...</span>
									</>
								) : (
									<>
										<Check className="w-5 h-5" />
										<span>Update Profile</span>
									</>
								)}
							</button>
						</div>
					</div>

					{/* Divider */}
					<div className="relative my-10">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200"></div>
						</div>
						<div className="relative flex justify-center">
							<span className="px-4 text-sm text-gray-500 bg-white">Security</span>
						</div>
					</div>

					{/* Password Section */}
					<div>
						<div className="flex items-center gap-2 mb-6">
							<div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
								<Lock className="w-4 h-4 text-blue-600" />
							</div>
							<h2 className="text-xl font-bold text-gray-800">Change Password</h2>
						</div>
						
						<div className="space-y-5">
							<div className="group">
								<label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
								<input
									type="password"
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
									value={currentPassword}
									onChange={(e) => setCurrentPassword(e.target.value)}
									placeholder="Enter current password"
									required
								/>
							</div>
							
							<div className="group">
								<label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
								<input
									type="password"
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									placeholder="Enter new password"
									required
								/>
							</div>
							
							<div className="group">
								<label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
								<input
									type="password"
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="Confirm new password"
									required
								/>
							</div>
							
							{passwordError && (
								<div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
									<X className="w-4 h-4 flex-shrink-0" />
									<span>{passwordError}</span>
								</div>
							)}
							
							{passwordSuccess && (
								<div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
									<Check className="w-4 h-4 flex-shrink-0" />
									<span>{passwordSuccess}</span>
								</div>
							)}
							
							<button 
								onClick={handlePasswordSubmit}
								disabled={isPasswordLoading}
								className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
							>
								{isPasswordLoading ? (
									<>
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										<span>Changing...</span>
									</>
								) : (
									<>
										<Lock className="w-5 h-5" />
										<span>Change Password</span>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}