import { FileText, Type, Image, User, Settings, CheckCircle } from 'lucide-react';

const sections = [
  { id: 0, title: 'Basic Info', icon: FileText },
  { id: 1, title: 'Content', icon: Type },
  { id: 2, title: 'Media', icon: Image },
  { id: 3, title: 'Author', icon: User },
  { id: 4, title: 'Settings', icon: Settings },
];

interface SectionNavProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
}

export default function SectionNav({ currentSection, onSectionChange }: SectionNavProps) {
  return (
    <div className="bg-[#242424] border border-[#3a3a3a] rounded-2xl p-4 lg:sticky lg:top-24">
      <h3 className="text-sm font-bold text-gray-300 mb-4 px-2">Sections</h3>
      <div className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = currentSection === section.id;
          const isCompleted = currentSection > section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-[#1a1a1a]'}`}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isActive ? 'text-white' : ''}`}>
                  {section.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
