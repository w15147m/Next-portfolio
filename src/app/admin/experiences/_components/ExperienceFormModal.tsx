"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useModal } from "@/hooks/useModal";
import { createExperience, updateExperience } from "../_lib/actions";
import type { ExperienceFormState, Experience } from "../_lib/schema";
import { useSWRConfig } from "swr";
import { getExperiencesKey } from "../_lib/useExperiences";
import { showToast } from "@/components/common/CustomToaster";

interface ExperienceFormModalProps {
  userId: string;
  experience?: Experience;
  trigger: React.ReactNode;
}

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

export default function ExperienceFormModal({
  userId,
  experience,
  trigger,
}: ExperienceFormModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<ExperienceFormState | null>(null);
  const { mutate } = useSWRConfig();

  const [company, setCompany] = useState(experience?.company ?? "");
  const [position, setPosition] = useState(experience?.position ?? "");
  const [startDate, setStartDate] = useState(formatDate(experience?.startDate));
  const [endDate, setEndDate] = useState(formatDate(experience?.endDate));
  const [desc, setDesc] = useState(experience?.desc ?? "");

  const handleOpen = () => {
    setCompany(experience?.company ?? "");
    setPosition(experience?.position ?? "");
    setStartDate(formatDate(experience?.startDate));
    setEndDate(formatDate(experience?.endDate));
    setDesc(experience?.desc ?? "");
    setFeedback(null);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setFeedback(null);

    const data = {
      company,
      position,
      startDate,
      endDate: endDate || undefined,
      desc: desc || undefined,
    };

    try {
      const result = experience
        ? await updateExperience(experience.id, data)
        : await createExperience(userId, data);

      setFeedback(result);

      if (result.success && result.data) {
        mutate(getExperiencesKey(userId));
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

  const isEditing = !!experience;

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, { onClick: handleOpen })}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[520px] p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit Experience" : "Add Experience"}
          </h4>
          <div className="flex flex-col gap-5">
            <div>
              <Label>
                Company <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. Google, TechCorp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                error={!!feedback?.fieldErrors?.company}
                hint={feedback?.fieldErrors?.company?.[0]}
              />
            </div>

            <div>
              <Label>
                Position / Job Title <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                error={!!feedback?.fieldErrors?.position}
                hint={feedback?.fieldErrors?.position?.[0]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  Start Date <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  error={!!feedback?.fieldErrors?.startDate}
                  hint={feedback?.fieldErrors?.startDate?.[0]}
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  error={!!feedback?.fieldErrors?.endDate}
                  hint={feedback?.fieldErrors?.endDate?.[0]}
                />
              </div>
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
