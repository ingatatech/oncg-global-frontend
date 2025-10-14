"use client";

import type React from "react";

import { useState, useEffect } from "react";
import AdminLayoutStructure from "./layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  MapPin,
  Phone,
  Mail,
  Plus,
  X,
  Building2,
  Crown,
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
import { Office } from "@/lib/types/offices";


export default function OfficesPage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);
  const [viewingOffice, setViewingOffice] = useState<Office | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    isHeadquarters: false,
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    officeId: string | null;
  }>({ isOpen: false, officeId: null });

  // Fetch offices
  const fetchOffices = async () => {
    try {
      const { data } = await api.get("/offices");
      setOffices(data.data || data);
    } catch (error) {
      console.error("Error fetching offices:", error);
      toast.error("Error fetching offices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  // Open modal for adding or editing
  const openModal = (office?: Office) => {
    if (office) {
      setEditingOffice(office);
      setFormData({
        country: office.country,
        city: office.city,
        address: office.address,
        phone: office.phone,
        email: office.email,
        isHeadquarters: office.isHeadquarters,
        isActive: office.isActive,
      });
    } else {
      setEditingOffice(null);
      setFormData({
        country: "",
        city: "",
        address: "",
        phone: "",
        email: "",
        isHeadquarters: false,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingOffice) {
        await api.patch(`/offices/${editingOffice.id}`, formData);
        toast.success("Office updated successfully");
      } else {
        await api.post("/offices", formData);
        toast.success("Office created successfully");
      }

      setIsModalOpen(false);
      fetchOffices();
    } catch (err: any) {
      const errorData = err.response?.data;

      if (errorData?.errors && Array.isArray(errorData.errors)) {
        const messages = errorData.errors.map((e: any) => e.msg).join(", ");
        toast.error(messages);
      } else if (errorData?.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Failed to save office");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/offices/${id}`);
      toast.success("Office deleted successfully");
      setDeleteModal({ isOpen: false, officeId: null });
      fetchOffices();
    } catch (error) {
      console.error("Error deleting office:", error);
      toast.error("Error deleting office");
    }
  };

  // Filter offices
  const filteredOffices = offices.filter((office) => {
    const matchesSearch =
      office.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && office.isActive) ||
      (statusFilter === "inactive" && !office.isActive);

    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "headquarters" && office.isHeadquarters) ||
      (typeFilter === "branch" && !office.isHeadquarters);

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleView = (office: Office) => {
    setViewingOffice(office);
    setShowViewModal(true);
  };

  return (
    <AdminLayoutStructure>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Network Offices</h1>
                <p className="text-sm text-slate-600">Manage your organization's office locations</p>
              </div>
            </div>
            <Button
              onClick={() => openModal()}
              className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Office
            </Button>
          </div>
        </div>


        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search offices by country, city, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Office Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="headquarters">Headquarters</SelectItem>
              <SelectItem value="branch">Branch Offices</SelectItem>
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

        {/* Offices Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
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
                        <span className="text-slate-600">Loading offices...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredOffices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      <div className="flex flex-col items-center space-y-2">
                        <Building2 className="h-12 w-12 text-slate-300" />
                        <p className="text-lg font-medium">No offices found</p>
                        <p className="text-sm">Try adjusting your search filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOffices.map((office) => (
                    <TableRow key={office.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                              {office.city}, {office.country}
                              {office.isHeadquarters && (
                                <Crown className="h-4 w-4 text-yellow-600" />
                              )}
                            </div>
                            <div className="text-sm text-slate-600">{office.address}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-slate-600">
                            <Phone className="h-3 w-3 mr-1 text-slate-400" />
                            {office.phone}
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <Mail className="h-3 w-3 mr-1 text-slate-400" />
                            {office.email}
                          </div>
                        </div>
                      </TableCell>
                
                      <TableCell>
                        <Badge
                          variant={office.isHeadquarters ? "default" : "secondary"}
                          className={
                            office.isHeadquarters
                              ? "bg-purple-100 text-purple-800 border-purple-300"
                              : ""
                          }
                        >
                          {office.isHeadquarters ? "Headquarters" : "Branch"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={office.isActive ? "default" : "secondary"}
                          className={
                            office.isActive ? "bg-green-100 text-green-800 border-green-300" : ""
                          }
                        >
                          {office.isActive ? "Active" : "Inactive"}
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
                              onClick={() => handleView(office)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openModal(office)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Office
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeleteModal({ isOpen: true, officeId: office.id })}
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

      {/* View Office Modal */}
      <AnimatePresence>
        {showViewModal && viewingOffice && (
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
                <h2 className="text-2xl font-bold text-slate-900">Office Details</h2>
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
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        {viewingOffice.city}, {viewingOffice.country}
                        {viewingOffice.isHeadquarters && (
                          <Crown className="h-5 w-5 text-yellow-600" />
                        )}
                      </h3>
                      <p className="text-slate-600 mt-1">{viewingOffice.address}</p>
                      <div className="flex items-center mt-3 space-x-3">
                        <Badge
                          variant={viewingOffice.isHeadquarters ? "default" : "secondary"}
                          className={
                            viewingOffice.isHeadquarters
                              ? "bg-purple-100 text-purple-800 border-purple-300"
                              : ""
                          }
                        >
                          {viewingOffice.isHeadquarters ? "Headquarters" : "Branch Office"}
                        </Badge>
                        <Badge
                          variant={viewingOffice.isActive ? "default" : "secondary"}
                          className={
                            viewingOffice.isActive
                              ? "bg-green-100 text-green-800 border-green-300"
                              : ""
                          }
                        >
                          {viewingOffice.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg border p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <a href={`tel:${viewingOffice.phone}`} className="text-primary hover:underline">
                        {viewingOffice.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <a
                        href={`mailto:${viewingOffice.email}`}
                        className="text-primary hover:underline"
                      >
                        {viewingOffice.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-700">{viewingOffice.address}</span>
                    </div>
                  </div>
                </div>

                {/* Office Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              

                  <div className="bg-white rounded-lg border p-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-primary" />
                      Office Type
                    </h4>
                    <p className="text-lg font-semibold text-slate-700">
                      {viewingOffice.isHeadquarters ? "Headquarters" : "Branch Office"}
                    </p>
                  </div>
                </div>

          
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit Office Modal */}
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
                  {editingOffice ? "Edit Office" : "Add New Office"}
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
                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Location Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Country *
                      </label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g., United States"
                        required
                        className="border-slate-200 focus:border-primary focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        City *
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g., New York"
                        required
                        className="border-slate-200 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address *
                    </label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g., 123 Main Street, Suite 100"
                      required
                      className="border-slate-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone *
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        required
                        className="border-slate-200 focus:border-primary focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="office@example.com"
                        required
                        className="border-slate-200 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Office Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Office Details
                  </h3>

                 

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isHeadquarters"
                        checked={formData.isHeadquarters}
                        onChange={(e) =>
                          setFormData({ ...formData, isHeadquarters: e.target.checked })
                        }
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="isHeadquarters" className="text-sm font-medium text-slate-700">
                        This is a Headquarters Office
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                        Active Office
                      </label>
                    </div>
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
                        {editingOffice ? "Updating..." : "Saving..."}
                      </>
                    ) : (
                      editingOffice ? "Update Office" : "Add Office"
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
        onClose={() => setDeleteModal({ isOpen: false, officeId: null })}
        onConfirm={handleDelete.bind(null, deleteModal.officeId!)}
        title="Delete Office"
        message="Are you sure you want to delete this office? This action cannot be undone."
      />
    </AdminLayoutStructure>
  );
}