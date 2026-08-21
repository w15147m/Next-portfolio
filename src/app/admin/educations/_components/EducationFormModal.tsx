"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useModal } from "@/hooks/useModal";
import { createEducation, updateEducation } from "../_lib/actions";
import type { EducationFormState, Education } from "../_lib/schema";
import { useSWRConfig } from "swr";
import { getEducationsKey } from "../_lib/useEducations";
import { showToast } from "@/components/common/CustomToaster";

interface EducationFormModalProps {
  userId: string;
  education?: Education;
  trigger: React.ReactNode;
}

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

export default function EducationFormModal({
  userId,
  education,
  trigger,
}: EducationFormModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<EducationFormState | null>(null);
  const { mutate } = useSWRConfig();

  const [institution, setInstitution] = useState(education?.institution ?? "");
  const [degree, setDegree] = useState(education?.degree ?? "");
  const [fieldOfStudy, setFieldOfStudy] = useState(education?.fieldOfStudy ?? "");
  const [startDate, setStartDate] = useState(formatDate(education?.startDate));
  const [endDate, setEndDate] = useState(formatDate(education?.endDate));
  const [desc, setDesc] = useState(education?.desc ?? "");

  const handleOpen = () => {
    setInstitution(education?.institution ?? "");
    setDegree(education?.degree ?? "");
    setFieldOfStudy(education?.fieldOfStudy ?? "");
    setStartDate(formatDate(education?.startDate));
    setEndDate(formatDate(education?.endDate));
    setDesc(education?.desc ?? "");
    setFeedback(null);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setFeedback(null);

    const data = {
      institution,
      degree,
      fieldOfStudy: fieldOfStudy || undefined,
      startDate,
      endDate: endDate || undefined,
      desc: desc || undefined,
    };

    try {
      const result = education
        ? await updateEducation(education.id, data)
        : await createEducation(userId, data);

      setFeedback(result);

      if (result.success && result.data) {
        mutate(getEducationsKey(userId));
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

  const isEditing = !!education;

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, { onClick: handleOpen })}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[520px] p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit Education" : "Add Education"}
          </h4>
          <div className="flex flex-col gap-5">
            <div>
              <Label>
                Institution <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. Stanford University"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                error={!!feedback?.fieldErrors?.institution}
                hint={feedback?.fieldErrors?.institution?.[0]}
              />
            </div>

            <div>
              <Label>
                Degree <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. Bachelor of Science"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                error={!!feedback?.fieldErrors?.degree}
                hint={feedback?.fieldErrors?.degree?.[0]}
              />
            </div>

            <div>
              <Label>Field of Study</Label>
              <Input
                type="text"
                placeholder="e.g. Computer Science"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                error={!!feedback?.fieldErrors?.fieldOfStudy}
                hint={feedback?.fieldErrors?.fieldOfStudy?.[0]}
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
