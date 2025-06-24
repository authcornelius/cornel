"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import moment from "moment";
import MultiSelect from "./MultiSelect";
import MonthYearPicker from "./MonthYearPicker";
import { technologyOptions } from "./technologyOptions";
import { experienceAction } from "@/app/Actions/experience";
import { projectAction } from "@/app/Actions/project";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PostModal({
  isOpen,
  onClose,
  onSuccess,
}: PostModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"experience" | "project">(
    "experience"
  );

  const [formData, setFormData] = useState({
    // Experience fields
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    present: false,
    experienceTechnologies: [] as string[],
    // Project fields
    title: "",
    technologies: [] as string[],
    projectDescription: "",
    features: "",
    githubUrl: "",
    liveUrl: "",
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setError(null);

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === "present" && checked ? { endDate: "" } : {}),
      }));
    } else if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (name: string, value: string) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectTechnologiesChange = (selected: string[]) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      technologies: selected,
    }));
  };

  const handleExperienceTechnologiesChange = (selected: string[]) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      experienceTechnologies: selected,
    }));
  };

  // Helper function to preserve line breaks and clean up text
  const formatTextWithLineBreaks = (text: string): string => {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  };

  const validateForm = (): string | null => {
    if (activeTab === "experience") {
      if (!formData.company.trim()) return "Company name is required";
      if (!formData.position.trim()) return "Position is required";
      if (!formData.location.trim()) return "Location is required";
      if (!formData.startDate) return "Start date is required";
      if (!formData.present && !formData.endDate) return "End date is required";
      if (!formData.description.trim()) return "Job description is required";

      if (!formData.present && formData.startDate && formData.endDate) {
        const startMoment = moment(formData.startDate);
        const endMoment = moment(formData.endDate);
        if (endMoment.isBefore(startMoment)) {
          return "End date cannot be before start date";
        }
      }
    } else {
      if (!formData.title.trim()) return "Project title is required";
      if (formData.technologies.length === 0)
        return "Please select at least one technology";
      if (!formData.projectDescription.trim())
        return "Project description is required";
      if (!formData.features.trim()) return "Project features are required";

      if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
        return "Please enter a valid GitHub URL";
      }
      if (formData.liveUrl && !isValidUrl(formData.liveUrl)) {
        return "Please enter a valid live demo URL";
      }
    }
    return null;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (activeTab === "experience") {
        const payload = {
          company: formData.company.trim(),
          position: formData.position.trim(),
          location: formData.location.trim(),
          start: moment(formData.startDate).format("MMM, YYYY"),
          end: formData.present
            ? "Present"
            : moment(formData.endDate).format("MMM, YYYY"),
          description: formatTextWithLineBreaks(formData.description),
          technologies: formData.experienceTechnologies,
        };

        await experienceAction({ payload });
      } else {
        // Create FormData for project submission to handle file upload
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title.trim());
        formDataToSend.append("technologies", JSON.stringify(formData.technologies));
        formDataToSend.append("description", formatTextWithLineBreaks(formData.projectDescription));
        formDataToSend.append("features", formatTextWithLineBreaks(formData.features));
        formDataToSend.append("githubUrl", formData.githubUrl.trim());
        formDataToSend.append("liveUrl", formData.liveUrl.trim());
        
        if (formData.image) {
          formDataToSend.append("image", formData.image);
        }

        await projectAction(formDataToSend);
      }

      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(`Error creating ${activeTab}:`, error);
      setError(
        error instanceof Error
          ? error.message
          : `Failed to create ${activeTab}. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      present: false,
      experienceTechnologies: [],
      title: "",
      technologies: [],
      projectDescription: "",
      features: "",
      githubUrl: "",
      liveUrl: "",
      image: null,
    });
    setError(null);
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  const handleTabChange = (tab: "experience" | "project") => {
    if (!isLoading) {
      setActiveTab(tab);
      setError(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Add New {activeTab === "experience" ? "Experience" : "Project"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={isLoading}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200">
          <button
            className={`flex-1 py-3 px-6 text-center font-medium transition-colors ${
              activeTab === "experience"
                ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                : "text-slate-600 hover:text-indigo-600"
            }`}
            onClick={() => handleTabChange("experience")}
            disabled={isLoading}
            type="button"
          >
            Professional Experience
          </button>
          <button
            className={`flex-1 py-3 px-6 text-center font-medium transition-colors ${
              activeTab === "project"
                ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                : "text-slate-600 hover:text-indigo-600"
            }`}
            onClick={() => handleTabChange("project")}
            disabled={isLoading}
            type="button"
          >
            Feature Project
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          {activeTab === "experience" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., New York, NY or Remote"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Technologies Used
                  <span className="text-xs text-slate-500 ml-1">
                    (Select technologies used in this role)
                  </span>
                </label>
                <MultiSelect
                  options={technologyOptions}
                  value={formData.experienceTechnologies}
                  onChange={handleExperienceTechnologiesChange}
                  placeholder="Select technologies..."
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="present"
                  id="present"
                  checked={formData.present}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                  disabled={isLoading}
                />
                <label
                  htmlFor="present"
                  className="text-sm font-medium text-slate-700"
                >
                  Currently working here
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Date *
                  </label>
                  <MonthYearPicker
                    value={formData.startDate}
                    onChange={(value) => handleDateChange("startDate", value)}
                    placeholder="Select start month/year..."
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    End Date {!formData.present && "*"}
                  </label>
                  <MonthYearPicker
                    value={formData.endDate}
                    onChange={(value) => handleDateChange("endDate", value)}
                    placeholder="Select end month/year..."
                    disabled={formData.present || isLoading}
                    required={!formData.present}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description & Responsibilities *
                  <span className="text-xs text-slate-500 ml-1">
                    (Use line breaks to separate different points)
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your key responsibilities, achievements, and impact in this role...&#10;&#10;• Use bullet points or line breaks to organize your content&#10;• Each responsibility on a new line&#10;• Highlight key achievements"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
                  required
                  disabled={isLoading}
                  maxLength={1000}
                />
                <div className="text-xs text-slate-500 mt-1">
                  {formData.description.length}/1000 characters
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Technologies Used *
                  <span className="text-xs text-slate-500 ml-1">
                    (Select multiple technologies)
                  </span>
                </label>
                <MultiSelect
                  options={technologyOptions}
                  value={formData.technologies}
                  onChange={handleProjectTechnologiesChange}
                  placeholder="Select technologies..."
                  disabled={isLoading}
                />
                {formData.technologies.length === 0 && (
                  <p className="text-red-500 text-xs mt-1">
                    Please select at least one technology
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Description *
                  <span className="text-xs text-slate-500 ml-1">
                    (Use line breaks to organize your content)
                  </span>
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe what the project does..."                 className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
                  required
                  disabled={isLoading}
                  maxLength={1000}
                />
                <div className="text-xs text-slate-500 mt-1">
                  {formData.projectDescription.length}/1000 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Features *
                  <span className="text-xs text-slate-500 ml-1">
                    (List each feature on a new line)
                  </span>
                </label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="List the key features and functionalities of your project...&#10;&#10;• User authentication and authorization&#10;• Real-time data synchronization&#10;• Responsive design for all devices&#10;• Advanced search and filtering"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
                  required
                  disabled={isLoading}
                  maxLength={1000}
                />
                <div className="text-xs text-slate-500 mt-1">
                  {formData.features.length}/1000 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/project-name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://your-project-demo.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={isLoading}
                />
                {formData.image && (
                  <div className="mt-2 p-2 bg-slate-50 rounded-md">
                    <p className="text-sm text-slate-600">
                      Selected: {formData.image.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Size: {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              disabled={
                isLoading ||
                (activeTab === "project" && formData.technologies.length === 0)
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                `Add ${activeTab === "experience" ? "Experience" : "Project"}`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

