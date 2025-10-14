"use client";

import type React from "react";

import { useState, useEffect } from "react";
import AdminLayoutStructure from "./layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Eye,
  Search,
  MoreHorizontal,
  FileText,
  Plus,
  X,
  Download,
  Calendar,
  File,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import api from "@/lib/axios";

import { AnimatePresence, motion } from "framer-motion";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

export interface Publication {
  id: string;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  fileType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [viewingPublication, setViewingPublication] = useState<Publication | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    isActive: true,
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    publicationId: string | null;
  }>({ isOpen: false, publicationId: null });

  // Publication types
  const publicationTypes = [
    "Annual Report",
    "Quarterly Report",
    "White Paper",
    "Case Study",
    "Research Paper",
    "Newsletter",
    "Brochure",
    "Guide",
    "Other",
  ];

  // Fetch publications
  const fetchPublications = async () => {
    try {
      const { data } = await api.get("/publications");
      setPublications(data.data || data);
    } catch (error) {
      console.error("Error fetching publications:", error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  // Open modal for adding or editing
  const openModal = (publication?: Publication) => {
    if (publication) {
      setEditingPublication(publication);
      setFormData({
        title: publication.title,
        description: publication.description,
        type: publication.type,
        isActive: publication.isActive,
      });
    } else {
      setEditingPublication(null);
      setFormData({
        title: "",
        description: "",
        type: "",
        isActive: true,
      });
    }
    setFile(null);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });

      if (file) {
        formDataToSend.append("file", file);
      }

      if (editingPublication) {
        await api.patch(`/publications/${editingPublication.id}`, formDataToSend);
        toast.success("Publication updated successfully");
      } else {
        await api.post("/publications", formDataToSend);
        toast.success("Publication created successfully");
      }

      setIsModalOpen(false);
      fetchPublications();
    } catch (err: any) {
      const errorData = err.response?.data;

      if (errorData?.errors && Array.isArray(errorData.errors)) {
        const messages = errorData.errors.map((e: any) => e.msg).join(", ");
        toast.error(messages);
      } else if (errorData?.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Failed to save publication");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/publications/${id}`);
      toast.success("Publication deleted successfully");
      setDeleteModal({ isOpen: false, publicationId: null });
      fetchPublications();
    } catch (error) {
      console.error("Error deleting publication:", error);
      toast.error("Error deleting publication");
    }
  };

  // Filter publications
  const filteredPublications = publications.filter((publication) => {
    const matchesSearch =
      publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && publication.isActive) ||
      (statusFilter === "inactive" && !publication.isActive);

    const matchesType =
      typeFilter === "all" || publication.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleView = (publication: Publication) => {
    setViewingPublication(publication);
    setShowViewModal(true);
  };

  // Get unique publication types from existing publications
  const existingTypes = Array.from(new Set(publications.map((p) => p.type)));
  const allTypes = Array.from(new Set([...publicationTypes, ...existingTypes]));

  return (
    <AdminLayoutStructure>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Publications</h1>
                <p className="text-sm text-slate-600">Manage your organization's publications and documents</p>
              </div>
            </div>
            <Button
              onClick={() => openModal()}
              className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Publication
            </Button>
          </div>
        </div>

   

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search publications by title, description, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {allTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Publications Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Publication</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">File</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-slate-600">Loading publications...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredPublications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      <div className="flex flex-col items-center space-y-2">
                        <FileText className="h-12 w-12 text-slate-300" />
                        <p className="text-lg font-medium">No publications found</p>
                        <p className="text-sm">Try adjusting your search filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPublications.map((publication) => (
                    <TableRow key={publication.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{publication.title}</div>
                            <div className="text-sm text-slate-600 line-clamp-1">
                              {publication.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-medium">
                          {publication.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                          {new Date(publication.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {publication.fileUrl ? (
                          <a
                            href={publication.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-primary hover:underline"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            {publication.fileType || "Download"}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400">No file</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={publication.isActive ? "default" : "secondary"}
                          className={
                            publication.isActive ? "bg-green-100 text-green-800 border-green-300" : ""
                          }
                        >
                          {publication.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => handleView(publication)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {publication.fileUrl && (
                              <DropdownMenuItem asChild>
                                <a
                                  href={publication.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="cursor-pointer"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download File
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => openModal(publication)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Publication
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setDeleteModal({ isOpen: true, publicationId: publication.id })
                              }
                              className="text-red-600 cursor-pointer hover:bg-red-50"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* View Publication Modal */}
      <AnimatePresence>
        {showViewModal && viewingPublication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Publication Details</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowViewModal(false)}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">{viewingPublication.title}</h3>
                      <div className="flex items-center mt-2 space-x-3">
                        <Badge variant="secondary" className="font-medium">
                          {viewingPublication.type}
                        </Badge>
                        <Badge
                          variant={viewingPublication.isActive ? "default" : "secondary"}
                          className={
                            viewingPublication.isActive
                              ? "bg-green-100 text-green-800 border-green-300"
                              : ""
                          }
                        >
                          {viewingPublication.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(viewingPublication.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-lg border p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Description</h4>
                  <p className="text-slate-700 leading-relaxed">{viewingPublication.description}</p>
                </div>

                {/* File Information */}
                {viewingPublication.fileUrl && (
                  <div className="bg-white rounded-lg border p-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <File className="h-5 w-5 mr-2 text-primary" />
                      File Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">File Type:</span>
                        <Badge variant="secondary">
                          {viewingPublication.fileType || "Unknown"}
                        </Badge>
                      </div>
                      <div className="pt-3 border-t">
                        <a
                          href={viewingPublication.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Download Publication
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit Publication Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingPublication ? "Edit Publication" : "Add New Publication"}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Basic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter publication title"
                      required
                      className="border-slate-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter publication description"
                      required
                      rows={4}
                      className="border-slate-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Type *
                      </label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} required>
                        <SelectTrigger className="border-slate-200 focus:border-primary focus:ring-primary/20">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {publicationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    File Upload
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Upload File {!editingPublication && "*"}
                    </label>
                    <Input
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required={!editingPublication}
                      className="border-slate-200 focus:border-primary focus:ring-primary/20"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (Max 10MB)
                    </p>
                    {editingPublication?.fileUrl && (
                      <p className="text-xs text-primary mt-2 flex items-center">
                        <File className="h-3 w-3 mr-1" />
                        Current file: {editingPublication.fileType || "Uploaded"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Status</h3>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                      Active Publication
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary hover:bg-primary/90 text-white px-6"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {editingPublication ? "Updating..." : "Saving..."}
                      </>
                    ) : (
                      editingPublication ? "Update Publication" : "Add Publication"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, publicationId: null })}
        onConfirm={handleDelete.bind(null, deleteModal.publicationId!)}
        title="Delete Publication"
        message="Are you sure you want to delete this publication? This action cannot be undone."
      />
    </AdminLayoutStructure>
  );
}