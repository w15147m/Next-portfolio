'use client'
import { useState } from 'react';
import Button from '@/components/ui/button/Button';
import CustomToaster from '@/components/common/CustomToaster';

export default function UploadTestPage() {
  const [fire, setFire] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Button onClick={() => setFire(prev => !prev)}>
        Save
      </Button>

      <CustomToaster message="Saved successfully!" type="success" trigger={fire} />
    </div>
  );
}