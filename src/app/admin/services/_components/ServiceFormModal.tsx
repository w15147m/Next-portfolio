"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useModal } from "@/hooks/useModal";
import { createService, updateService } from "../_lib/actions";
import type { ServiceFormState, Service } from "../_lib/schema";
import { useSWRConfig } from "swr";
import { getServicesKey } from "../_lib/useServices";
import { showToast } from "@/components/common/CustomToaster";

interface ServiceFormModalProps {
  userId: string;
  service?: Service;
  trigger: React.ReactNode;
}

export default function ServiceFormModal({
  userId,
  service,
  trigger,
}: ServiceFormModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<ServiceFormState | null>(null);
  const { mutate } = useSWRConfig();

  const [name, setName] = useState(service?.name ?? "");
  const [link, setLink] = useState(service?.link ?? "");
  const [desc, setDesc] = useState(service?.desc ?? "");

  const handleOpen = () => {
    setName(service?.name ?? "");
    setLink(service?.link ?? "");
    setDesc(service?.desc ?? "");
    setFeedback(null);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setFeedback(null);

    const data = { name, link, desc: desc || undefined };

    try {
      const result = service
        ? await updateService(service.id, data)
        : await createService(userId, data);

      setFeedback(result);

      if (result.success && result.data) {
        mutate(getServicesKey(userId));
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

  const isEditing = !!service;

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, { onClick: handleOpen })}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[520px] p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit Service" : "Add Service"}
          </h4>
          <div className="flex flex-col gap-5">
            <div>
              <Label>
                Service Name <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. Web Development, UI/UX Design"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!feedback?.fieldErrors?.name}
                hint={feedback?.fieldErrors?.name?.[0]}
              />
            </div>

            <div>
              <Label>URL / Link</Label>
              <Input
                type="text"
                placeholder="https://example.com/service"
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
