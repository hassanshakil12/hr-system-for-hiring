// const AccountPreferencesSidebar = () => {
//   return (
//     <div className="p-4 bg-white min-h-screen w-full">

//       <nav className="space-y-1">
//         <div className="flex items-center py-2 px-3 rounded-md space-x-2">
//           <img className="w-6 h-6" src="./images/key-hole-icon.png" alt="" />
//           <span className="text-[16px] font-medium">
//             Account preferences</span>
//         </div>
//         <div className="flex items-center py-2 px-3 rounded-md space-x-2">
//           <img className="w-5 h-5" src="./images/notification-icon.png" alt="" />
//           <span className="text-[16px] font-medium">
//             Notification</span>
//         </div>

//         <div className="flex items-center py-2 px-3 rounded-md space-x-2">
//           <img className="w-6 h-6" src="./images/privacy-icon.png" alt="" />
//           <span className="text-[16px]">Privacy</span>
//         </div>

//         <div className="flex items-center py-2 px-3 rounded-md space-x-2">
//           <img className="w-6 h-6" src="./images/password-icon.png" alt="" />
//           <span className="text-[16px]">
//             Two-Step Authentication</span>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default AccountPreferencesSidebar

import { useState } from "react";

const AccountPreferencesSidebar = () => {
  const [settings, setSettings] = useState({
    activate: true,
    notifications: true,
    privacy: false,
    twoFactor: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 font-sans text-gray-800 space-y-8">
      {/* Account Section */}
      <Section title="Account Settings">
        <SidebarItem
          icon="./images/key-hole-icon.png"
          label="Activate Account"
          toggle
          value={settings.activate}
          onToggle={() => toggleSetting("activate")}
        />
        <SidebarItem
          icon="./images/notification-icon.png"
          label="Notifications"
          toggle
          value={settings.notifications}
          onToggle={() => toggleSetting("notifications")}
        />
      </Section>

      {/* Privacy & Security */}
      <Section title="Privacy & Security">
        <SidebarItem
          icon="./images/privacy-icon.png"
          label="Privacy Settings"
          toggle
          value={settings.privacy}
          onToggle={() => toggleSetting("privacy")}
        />
        <SidebarItem
          icon="./images/password-icon.png"
          label="Two-Step Authentication"
          toggle
          value={settings.twoFactor}
          onToggle={() => toggleSetting("twoFactor")}
        />
      </Section>
    </aside>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
      {title}
    </h3>
    <ul className="space-y-3">{children}</ul>
  </div>
);

interface SidebarItemProps {
  icon: string;
  label: string;
  toggle?: boolean;
  value?: boolean;
  onToggle?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  toggle = false,
  value,
  onToggle,
}: SidebarItemProps) => (
  <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer">
    <div className="flex items-center gap-3">
      <img src={icon} alt={label} className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {toggle && (
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={onToggle}
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all duration-200"></div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 peer-checked:translate-x-full" />
      </label>
    )}
  </li>
);

export default AccountPreferencesSidebar;
