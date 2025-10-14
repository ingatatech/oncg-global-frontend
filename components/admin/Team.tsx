"use client";

import type React from "react";

import { useState, useEffect } from "react";
import AdminLayoutStructure from "./layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DroppableProvided } from "@hello-pangea/dnd";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Edit,
  Trash2,
  Eye,
  Search,
  MoreHorizontal,
  Users,
  Plus,
  X,
  User,
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
import RichTextEditor from "../ui/RichTextEditor";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  linkedin?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [viewingMember, setViewingMember] = useState<TeamMember | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    linkedin: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    memberId: string | null;
  }>({ isOpen: false, memberId: null });

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      const { data } = await api.get("/team");
      setTeamMembers(data.data || data);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error("Error fetching team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  async function handleReorder(result: DropResult) {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (sourceIndex === destIndex) return;

    const newMembers = Array.from(teamMembers);
    const [removed] = newMembers.splice(sourceIndex, 1);
    newMembers.splice(destIndex, 0, removed);
    const memberIds = newMembers.map((member: TeamMember) => member.id);
    
    try {
      await api.put("/team/reorder", { memberIds });
      toast.success("Team order updated successfully!");
      fetchTeamMembers();
    } catch (err: any) {
      toast.error("Failed to update team order");
      fetchTeamMembers(); // Revert on error
    }
  }

  // Open modal for adding or editing
  const openModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        position: member.position,
        linkedin: member.linkedin || "",
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: "",
        position: "",
        linkedin: "",
      });
    }
    setImageFile(null);
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

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      if (editingMember) {
        await api.patch(`/team/${editingMember.id}`, formDataToSend);
        toast.success("Team member updated successfully");
      } else {
        await api.post("/team", formDataToSend);
        toast.success("Team member created successfully");
      }

      setIsModalOpen(false);
      fetchTeamMembers();
    } catch (err: any) {
      const errorData = err.response?.data;

      if (errorData?.errors && Array.isArray(errorData.errors)) {
        const messages = errorData.errors.map((e: any) => e.msg).join(", ");
        toast.error(messages);
      } else if (errorData?.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Failed to save team member");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/team/${id}`);
      toast.success("Team member deleted successfully");
      setDeleteModal({ isOpen: false, memberId: null });
      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Error deleting team member");
    }
  };

  // Filter team members
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleView = (member: TeamMember) => {
    setViewingMember(member);
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
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
                <p className="text-sm text-slate-600">Manage your organization's team members</p>
              </div>
            </div>
            <Button
              onClick={() => openModal()}
              className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Team Members</p>
                <p className="text-2xl font-bold text-slate-900">{teamMembers.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">With LinkedIn</p>
                <p className="text-2xl font-bold text-slate-900">
                  {teamMembers.filter((m) => m.linkedin).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </div>
          </div>

         
        </div>

        {/* Search Filter */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search team members by name or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Team Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <DragDropContext onDragEnd={handleReorder}>
            <Droppable droppableId="team-table">
              {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">Team Member</TableHead>
                        <TableHead className="font-semibold">Position</TableHead>
                        <TableHead className="font-semibold">LinkedIn</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-12">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-slate-600">Loading team members...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : filteredMembers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                            <div className="flex flex-col items-center space-y-2">
                              <Users className="h-12 w-12 text-slate-300" />
                              <p className="text-lg font-medium">No team members found</p>
                              <p className="text-sm">Try adjusting your search filters</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredMembers.map((member, index) => (
                          <Draggable key={member.id} draggableId={member.id} index={index}>
                            {(provided: DraggableProvided, snapshot) => (
                              <TableRow
                                key={member.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:bg-slate-50/50 transition-colors ${
                                  snapshot.isDragging ? "bg-sky-100" : ""
                                }`}
                              >
                                <TableCell className="truncate">
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-12 w-12 ring-2 ring-slate-100">
                                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                                      <AvatarFallback className="bg-gradient-to-r from-primary to-blue-600 text-white font-semibold">
                                        {member.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-semibold text-slate-900">{member.name}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="truncate">
                                  <div className="flex items-center text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: member.position}}/>
                                </TableCell>
                                <TableCell className="truncate">
                                  {member.linkedin ? (
                                    <a
                                      href={member.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline text-sm flex items-center"
                                    >
                                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                      </svg>
                                      View Profile
                                    </a>
                                  ) : (
                                    <span className="text-sm text-slate-400">No LinkedIn</span>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                      <DropdownMenuItem onClick={() => handleView(member)} className="cursor-pointer">
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => openModal(member)} className="cursor-pointer">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Member
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => setDeleteModal({ isOpen: true, memberId: member.id })}
                                        className="text-red-600 cursor-pointer hover:bg-red-50"
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* View Member Modal */}
      <AnimatePresence>
        {showViewModal && viewingMember && (
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
              className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Team Member Details</h2>
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
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-lg">
                    {viewingMember.image ? (
                      <img
                        src={viewingMember.image || "/placeholder.svg"}
                        alt={viewingMember.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{viewingMember.name}</h3>
                    <p className="text-slate-600 font-medium" dangerouslySetInnerHTML={{ __html: viewingMember.position}}/>
                    {viewingMember.linkedin && (
                      <div className="flex items-center mt-3 space-x-3">
                        <a
                          href={viewingMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center text-sm"
                        >
                          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>

             
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit Member Modal */}
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
              className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
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
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Basic Information</h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter full name"
                      required
                      className="border-slate-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  <div>
                       <label className="block text-sm font-medium text-slate-700 mb-2">Position *</label>
                   
                   
                          <RichTextEditor
                          value={formData.position}
                          onChange={(value) => setFormData(prev => ({ ...prev, position: value }))}
                          placeholder="e.g., Head of Professional Practice"
                          />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn URL</label>
                    <Input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="border-slate-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Profile Image */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Profile Image *</h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                        {editingMember?.image ? (
                          <img src={editingMember.image} alt="Current" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-8 h-8 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                          required={!editingMember}
                          className="border-slate-200 focus:border-primary focus:ring-primary/20"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Upload a square image for best results. Max size: 5MB
                        </p>
                      </div>
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
                        {editingMember ? "Updating..." : "Saving..."}
                      </>
                    ) : (
                      editingMember ? "Update Member" : "Add Member"
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
        onClose={() => setDeleteModal({ isOpen: false, memberId: null })}
        onConfirm={handleDelete.bind(null, deleteModal.memberId!)}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
      />
    </AdminLayoutStructure>
  );
}