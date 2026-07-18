import React from "react";

interface SkillIconProps {
  icon: string;
  size?: number;
  className?: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ icon, size = 40, className = "" }) => {
  if (!icon) return null;
  
  const iconName = icon.trim().toLowerCase();
  
  return (
    <img
      src={`https://skillicons.dev/icons?i=${iconName}`}
      alt={`${iconName} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default SkillIcon;
