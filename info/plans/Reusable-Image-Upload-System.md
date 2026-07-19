# Reusable Image Upload System

This plan outlines the architecture for a generic, reusable image upload system that saves files to `public/images/upload/[category]/` and returns the file path for database storage.

## User Review Required

> [!IMPORTANT]  
> Please review this design. Currently, images will be saved directly to the local file system (`public/` folder). This is fine for local development and traditional VPS hosting, but if you plan to deploy to a serverless platform like Vercel or Netlify in the future, the local filesystem is read-only or ephemeral, meaning uploaded images will disappear after a restart. Let me know if you want to proceed with local storage, or if you prefer a cloud provider (like AWS S3 or Cloudinary) instead!

## Proposed Changes

### 1. Next.js API Route for Temporary Uploads

#### [NEW] `src/app/api/upload/temp/route.ts`
This API route will handle uploading images to a temporary directory before the form is officially submitted.
- **Inputs**: `file` (image).
- **Storage Logic**:
  - Save the file to `public/images/upload/temp/`.
  - Generate a unique filename (e.g., `12345-image.jpg`).
- **Response**: Return the temporary URL (e.g., `/images/upload/temp/12345-image.jpg`).

### 2. Reusable UI Component

#### [NEW] `src/components/ui/ImageUpload.tsx`
A drag-and-drop component using `react-dropzone`.
- **Props**:
  - `onUploadSuccess` (function): Returns the temporary image path to the parent form state.
  - `defaultImage` (string, optional): Display an existing image if editing.
- **Features**: Drag/drop, loading state, previewing the temporary image.

### 3. Server Action Utility for Moving Files

#### [NEW] `src/lib/file-utils.ts`
A utility function to be called inside your actual form submission API routes (e.g., creating a project).
- **`commitImage(tempPath, category)`**:
  - Takes the temporary path (e.g., `/images/upload/temp/12345.jpg`) and a category (`project`).
  - Moves the physical file from `temp/` to the permanent `public/images/upload/[category]/` directory.
  - Returns the new permanent path.
- **`deleteTempImage(tempPath)`**:
  - Deletes the image from the temporary directory if a form submission fails.

### Workflow Example
1. User selects image -> Uploads to `temp` -> Gets `/images/upload/temp/abc.jpg`.
2. User submits the form with `image: "/images/upload/temp/abc.jpg"`.
3. Server receives form data.
4. Server attempts to save to Database.
5. If DB fails -> Server calls `deleteTempImage("/images/upload/temp/abc.jpg")`.
6. If DB succeeds -> Server calls `commitImage("/images/upload/temp/abc.jpg", "project")` and saves the final path to the DB.

## Verification Plan
- Build the `ImageUpload` component.
- Build the `temp` upload API route.
- Build the `commitImage` and `deleteTempImage` utilities.
- Create a test form to verify the full temp-to-permanent and failure cleanup lifecycle.
