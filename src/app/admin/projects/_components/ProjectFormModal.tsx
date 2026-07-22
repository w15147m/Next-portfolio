"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import ImageUpload from "@/components/ui/ImageUpload";
import { useModal } from "@/hooks/useModal";
import { createProject, updateProject } from "../_lib/actions";
import type { ProjectFormState, Project } from "../_lib/schema";
import { useSWRConfig } from "swr";
import { getProjectsKey } from "../_lib/useProjects";
import { showToast } from "@/components/common/CustomToaster";

interface ProjectFormModalProps {
  userId: string;
  project?: Project;
  trigger: React.ReactNode;
}

export default function ProjectFormModal({
  userId,
  project,
  trigger,
}: ProjectFormModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<ProjectFormState | null>(null);
  const { mutate } = useSWRConfig();

  const [name, setName] = useState(project?.name ?? "");
  const [image, setImage] = useState(project?.image ?? "");
  const [desc, setDesc] = useState(project?.desc ?? "");

  const handleOpen = () => {
    setName(project?.name ?? "");
    setImage(project?.image ?? "");
    setDesc(project?.desc ?? "");
    setFeedback(null);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setFeedback(null);

    const data = {
      name,
      image: image || undefined,
      desc: desc || undefined,
    };

    try {
      const result = project
        ? await updateProject(project.id, data)
        : await createProject(userId, data);

      setFeedback(result);

      if (result.success && result.data) {
        mutate(getProjectsKey(userId));
        showToast(result.message, "success");
        setTimeout(() => {
          closeModal();
        }, 300);
      } else if (!result.success) {
        showToast(result.message || "An error occurred", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isEditing = !!project;

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, { onClick: handleOpen })}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[560px] p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit Project" : "Add Project"}
          </h4>

          <div className="flex flex-col gap-5">
            <div>
              <Label>Project Image</Label>
              <ImageUpload
                defaultImage={image}
                onUploadSuccess={(url) => setImage(url)}
              />
              {feedback?.fieldErrors?.image && (
                <p className="mt-1 text-sm text-error-500">{feedback.fieldErrors.image[0]}</p>
              )}
            </div>

            <div>
              <Label>
                Project Name <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. Portfolio Website, E-commerce App"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!feedback?.fieldErrors?.name}
                hint={feedback?.fieldErrors?.name?.[0]}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Optional description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                error={!!feedback?.fieldErrors?.desc}
                hint={feedback?.fieldErrors?.desc?.[0]}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-7">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={closeModal}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Save Changes" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
