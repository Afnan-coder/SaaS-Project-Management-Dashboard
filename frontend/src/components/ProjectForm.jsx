import { useState, useEffect } from "react";
import Button from "./Button";

const ProjectForm = ({ onSubmit, initialData = null, buttonText, users }) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        status: initialData?.status || "Planning",
        priority: initialData?.priority || "Medium",
        deadline: initialData?.deadline
            ? initialData.deadline.slice(0, 10)
            : "",
        client: initialData?.client?._id || "",
        teamMembers: initialData?.teamMembers?.map(tm => tm._id) || [],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                status: initialData.status || "Planning",
                priority: initialData.priority || "Medium",
                deadline: initialData.deadline
                    ? initialData.deadline.slice(0, 10)
                    : "",
                client: initialData.client?._id || "",
                teamMembers: initialData.teamMembers?.map(tm => tm._id) || [],
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // --- DATA UNCHANGED: same teamMembers array of _id strings ---
    const toggleTeamMember = (userId) => {
        setFormData((prev) => ({
            ...prev,
            teamMembers: prev.teamMembers.includes(userId)
                ? prev.teamMembers.filter(id => id !== userId)
                : [...prev.teamMembers, userId],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    const isCreate = buttonText === "Create";

    const statusOptions = ["Planning", "In Progress", "Completed"];
    const priorityOptions = [
        { label: "Low", color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100", active: "bg-emerald-500 text-white border-emerald-500" },
        { label: "Medium", color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100", active: "bg-amber-500 text-white border-amber-500" },
        { label: "High", color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100", active: "bg-red-500 text-white border-red-500" },
    ];

    const getInitials = (name = "") =>
        name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

    const avatarColors = [
        "bg-violet-500", "bg-blue-500", "bg-teal-500",
        "bg-pink-500", "bg-orange-500", "bg-indigo-500",
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex items-start justify-center py-10 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-liner-to-r from-slate-800 to-slate-700 px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h2 className=" text-xl font-semibold">
                                {isCreate ? "New Project" : "Edit Project"}
                            </h2>
                            <p className="text-slate-400 text-sm mt-0.5">
                                {isCreate ? "Fill in the details to get started" : "Update your project information"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-7 space-y-6">

                    {/* Project Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Project Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Customer Portal Redesign"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Description <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="What is this project about?"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition resize-none"
                            required
                        />
                    </div>

                    {/* Status + Priority row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Status
                            </label>
                            <div className="flex gap-2">
                                {statusOptions.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, status: s }))}
                                        className={`flex-1 text-xs font-medium py-2 rounded-lg border transition
                                            ${formData.status === s
                                                ? "bg-slate-800 text-white border-slate-800"
                                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Priority
                            </label>
                            <div className="flex gap-2">
                                {priorityOptions.map(({ label, color, active }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, priority: label }))}
                                        className={`flex-1 text-xs font-medium py-2 rounded-lg border transition
                                            ${formData.priority === label ? active : color}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Client + Deadline row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Client */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Client <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="client"
                                    value={formData.client}
                                    onChange={handleChange}
                                    className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent bg-white transition pr-9"
                                    required
                                >
                                    <option value="">Select client</option>
                                    {users &&
                                        users
                                            .filter((user) => user.role === "user")
                                            .map((user) => (
                                                <option
                                                    key={user._id}
                                                    value={user._id}
                                                >
                                                    {user.username}
                                                </option>
                                            ))
                                    }
                                </select>
                                <svg className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Deadline <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Team Members — custom avatar picker */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-slate-700">
                                Team Members
                            </label>
                            {formData.teamMembers.length > 0 && (
                                <span className="text-xs text-slate-500">
                                    {formData.teamMembers.length} selected
                                </span>
                            )}
                        </div>

                        {users && users.length > 0 ? (
                            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                                <div className="flex flex-wrap gap-3">
                                    {users.map((user, idx) => {
                                        const isSelected = formData.teamMembers.includes(user._id);
                                        const initials = getInitials(user.username);
                                        const colorClass = avatarColors[idx % avatarColors.length];
                                        return (
                                            <button
                                                key={user._id}
                                                type="button"
                                                onClick={() => toggleTeamMember(user._id)}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all
                                                    ${isSelected
                                                        ? "bg-slate-800 text-white border-slate-800 shadow-sm scale-105"
                                                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                                                    }`}
                                            >
                                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${isSelected ? "bg-white/20" : colorClass}`}>
                                                    {initials}
                                                </span>
                                                {user.username}
                                                {isSelected && (
                                                    <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                {formData.teamMembers.length === 0 && (
                                    <p className="text-xs text-slate-400 mt-2">Click a member to add them to the project</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 border border-slate-200 rounded-xl px-4 py-3 bg-slate-50">
                                No users available
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    {isCreate ? "Creating..." : "Updating..."}
                                </>
                            ) : (
                                <>
                                    {isCreate ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                    {buttonText}
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default ProjectForm;