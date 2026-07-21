"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useModal } from "@/hooks/useModal";
import { createSocial, updateSocial } from "../_lib/actions";
import type { SocialFormState, Social } from "../_lib/schema";
import { useSWRConfig } from "swr";
import { getSocialsKey } from "../_lib/useSocials";
import { showToast } from "@/components/common/CustomToaster";

interface SocialFormModalProps {
  userId: string;
  social?: Social; // if provided, we are editing
  trigger: React.ReactNode;
}

export default function SocialFormModal({
  userId,
  social,
  trigger,
}: SocialFormModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<SocialFormState | null>(null);
  const { mutate } = useSWRConfig();

  const [name, setName] = useState(social?.name ?? "");
  const [link, setLink] = useState(social?.link ?? "");
  const [desc, setDesc] = useState(social?.desc ?? "");

  const handleOpen = () => {
    // Reset to latest values on open
    setName(social?.name ?? "");
    setLink(social?.link ?? "");
    setDesc(social?.desc ?? "");
    setFeedback(null);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setFeedback(null);

    const data = { name, link: link || undefined, desc: desc || undefined };

    const result = social
      ? await updateSocial(social.id, data)
      : await createSocial(userId, data);

    setFeedback(result);
    setIsLoading(false);

    if (result.success && result.data) {
      mutate(getSocialsKey(userId));
      showToast(result.message, "success");
      setTimeout(() => {
        closeModal();
      }, 800);
    } else if (!result.success) {
      showToast(result.message || "An error occurred", "error");
    }
  };

  const isEditing = !!social;

  return (
    <>
      <span onClick={handleOpen}>{trigger}</span>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[520px] p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit Social Link" : "Add Social Link"}
          </h4>
          <div className="flex flex-col gap-5">
            <div>
              <Label>
                Platform Name <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. GitHub, LinkedIn, Twitter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                error={!!feedback?.fieldErrors?.name}
                hint={feedback?.fieldErrors?.name?.[0]}
              />
            </div>

            <div>
              <Label>URL / Link</Label>
              <Input
                type="text"
                placeholder="https://github.com/username"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                error={!!feedback?.fieldErrors?.link}
                hint={feedback?.fieldErrors?.link?.[0]}
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