"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useModal } from "@/hooks/useModal";
import { createSkill, updateSkill } from "../_lib/actions";
import type { SkillFormState, Skill } from "../_lib/schema";
import { useSWRConfig } from "swr";
import { getSkillsKey } from "../_lib/useSkills";
import { showToast } from "@/components/common/CustomToaster";

interface SkillFormModalProps {
  userId: string;
  skill?: Skill;
  trigger: React.ReactNode;
}

export default function SkillFormModal({
  userId,
  skill,
  trigger,
}: SkillFormModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<SkillFormState | null>(null);
  const { mutate } = useSWRConfig();

  const [name, setName] = useState(skill?.name ?? "");
  const [proficiency, setProficiency] = useState(skill?.proficiency ?? "");
  const [desc, setDesc] = useState(skill?.desc ?? "");

  const handleOpen = () => {
    setName(skill?.name ?? "");
    setProficiency(skill?.proficiency ?? "");
    setDesc(skill?.desc ?? "");
    setFeedback(null);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setFeedback(null);

    const data = { name, proficiency: proficiency || undefined, desc: desc || undefined };

    try {
      const result = skill
        ? await updateSkill(skill.id, data)
        : await createSkill(userId, data);

      setFeedback(result);

      if (result.success && result.data) {
        mutate(getSkillsKey(userId));
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

  const isEditing = !!skill;

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, { onClick: handleOpen })}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[520px] p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit Skill" : "Add Skill"}
          </h4>
          <div className="flex flex-col gap-5">
            <div>
              <Label>
                Skill Name <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. React, Node.js, TypeScript"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!feedback?.fieldErrors?.name}
                hint={feedback?.fieldErrors?.name?.[0]}
              />
            </div>

            <div>
              <Label>Proficiency</Label>
              <Input
                type="text"
                placeholder="e.g. Advanced, 85%, Expert"
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
                error={!!feedback?.fieldErrors?.proficiency}
                hint={feedback?.fieldErrors?.proficiency?.[0]}
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
