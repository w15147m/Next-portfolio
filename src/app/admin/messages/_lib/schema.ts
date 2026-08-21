export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string | Date;
};

export type MessageActionState = {
  success: boolean;
  message: string;
};
