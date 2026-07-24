
interface SkillIconProps {
  icon: string;
  size?: number;
  className?: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ icon, size = 40, className = "" }) => {
  if (!icon) return null;
  const iconName = icon.trim().toLowerCase(); 
  if (iconName == 'vps') {
    return (
      // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SJ4JKUzINxH5SYJuZxESg9uzKuTzu4woQgudspJ1Mg&s=10
      <img
        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SJ4JKUzINxH5SYJuZxESg9uzKuTzu4woQgudspJ1Mg&s=10`}
        alt={`${iconName} icon`}
        width={size}
        height={size}
        className={`${className} rounded-md`}
      />
    )
  }
  https://i.icoziv.workers.dev/icons?i=js,html,css,wasm
  return (
    <img
      src={`https://i.icoziv.workers.dev/icons?i=${iconName}`}
      alt={`${iconName} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default SkillIcon;

// Laravel Reverb
// RESTful APIs
// WebSockets
// Relational Database
// VPS
