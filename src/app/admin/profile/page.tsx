"use client";

import React, { useEffect, useState, useCallback } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Alert from "@/components/ui/alert/Alert";
import ImageUpload from "@/components/ui/ImageUpload";
import { authClient } from "@/lib/auth-client";
import { updateProfile, ProfileFormState } from "./actions";
import Image from "next/image";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
};

export default function ProfilePage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const userId = session?.user?.id;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<ProfileFormState | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/profile?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      setProfile(data);
      setName(data.name || "");
      setImage(data.image || "");
    } catch {
      setError("Could not load profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId, fetchProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setIsSaving(true);
    setFeedback(null);

    const result = await updateProfile(userId, { name, image });
    setFeedback(result);
    setIsSaving(false);

    if (result.success) {
      fetchProfile(); // Reload to get fresh data
      // Force reload authClient session data
      window.location.reload();
    }
  };

  if (sessionLoading || isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    );
  }

  if (!userId || !profile) {
    return (
      <div className="p-10 text-center text-error-500">
        Unauthorized or profile not found.
      </div>
    );
  }

  const initials = profile.name.substring(0, 2).toUpperCase();

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}

      <PageBreadcrumb pageTitle="Profile" />


      {error && <Alert variant="error" title="Error" message={error} />}

        <ComponentCard title={null}>
          <form onSubmit={handleSubmit} className="p-2">
            {feedback && (
              <div className="mb-6">
                <Alert
                  variant={feedback.success ? "success" : "error"}
                  title={feedback.success ? "Success" : "Error"}
                  message={feedback.message}
                />
              </div>
            )}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              <div className="sm:w-1/5">
                <div className="mt-2">
                  <ImageUpload
                    defaultImage={image}
                    onUploadSuccess={(url) => setImage(url)}
                  />
                  {feedback?.fieldErrors?.image && (
                    <p className="mt-1 text-sm text-error-500">{feedback.fieldErrors.image[0]}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6 flex flex-col sm:flex-1  ">
                <div>
                  <Label>
                    Full Name <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    error={!!feedback?.fieldErrors?.name}
                    hint={feedback?.fieldErrors?.name?.[0]}
                  />
                </div>

                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    disabled
                    hint="Email cannot be changed."
                  />
                </div>
                <div className=" flex-1   flex items-end justify-end pt-4 ">
                  <Button className="max-h-14" type="submit"  disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>


          </form>
        </ComponentCard>
      </div>
  );
}
