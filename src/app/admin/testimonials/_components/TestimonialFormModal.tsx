"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useModal } from "@/hooks/useModal";
import { createTestimonial, updateTestimonial } from "../_lib/actions";
import type { TestimonialFormState, Testimonial } from "../_lib/schema";
import { useSWRConfig } from "swr";
import { getTestimonialsKey } from "../_lib/useTestimonials";
import { showToast } from "@/components/common/CustomToaster";

interface TestimonialFormModalProps {
  userId: string;
  testimonial?: Testimonial;
  trigger: React.ReactNode;
}

export default function TestimonialFormModal({
  userId,
  testimonial,
  trigger,
}: TestimonialFormModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<TestimonialFormState | null>(null);
  const { mutate } = useSWRConfig();

  const [name, setName] = useState(testimonial?.name ?? "");
  const [role, setRole] = useState(testimonial?.role ?? "");
  const [company, setCompany] = useState(testimonial?.company ?? "");
  const [content, setContent] = useState(testimonial?.content ?? "");

  const handleOpen = () => {
    setName(testimonial?.name ?? "");
    setRole(testimonial?.role ?? "");
    setCompany(testimonial?.company ?? "");
    setContent(testimonial?.content ?? "");
    setFeedback(null);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setFeedback(null);

    const data = {
      name,
      role: role || undefined,
      company: company || undefined,
      content,
    };

    try {
      const result = testimonial
        ? await updateTestimonial(testimonial.id, data)
        : await createTestimonial(userId, data);

      setFeedback(result);

      if (result.success && result.data) {
        mutate(getTestimonialsKey(userId));
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

  const isEditing = !!testimonial;

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, { onClick: handleOpen })}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[520px] p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit Testimonial" : "Add Testimonial"}
          </h4>
          <div className="flex flex-col gap-5">
            <div>
              <Label>
                Client / Author Name <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!feedback?.fieldErrors?.name}
                hint={feedback?.fieldErrors?.name?.[0]}
              />
            </div>

            <div>
              <Label>Role / Title</Label>
              <Input
                type="text"
                placeholder="e.g. CEO, Product Manager"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                error={!!feedback?.fieldErrors?.role}
                hint={feedback?.fieldErrors?.role?.[0]}
              />
            </div>

            <div>
              <Label>Company</Label>
              <Input
                type="text"
                placeholder="e.g. Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                error={!!feedback?.fieldErrors?.company}
                hint={feedback?.fieldErrors?.company?.[0]}
              />
            </div>

            <div>
              <Label>
                Testimonial Content <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Feedback or testimonial text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                error={!!feedback?.fieldErrors?.content}
                hint={feedback?.fieldErrors?.content?.[0]}
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
