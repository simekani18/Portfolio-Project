export interface TechnicalSkill {
  name: string;
  level: number;
  category: 'Languages' | 'Frameworks' | 'Databases' | 'Cloud' | 'DevOps';
}

export interface SkillLevelIndicator {
  text: string;
  color: string;
  bg: string;
  ring: string;
}

export const PORTFOLIO_SKILLS: TechnicalSkill[] = [
  { name: "Swift", level: 90, category: "Languages" },
  { name: "C#", level: 85, category: "Languages" },
  { name: "TypeScript", level: 85, category: "Languages" },
  { name: "JavaScript", level: 80, category: "Languages" },
  { name: "Java", level: 75, category: "Languages" },
  { name: "UIKit", level: 90, category: "Frameworks" },
  { name: "SwiftUI", level: 85, category: "Frameworks" },
  { name: ".NET Core", level: 85, category: "Frameworks" },
  { name: "React", level: 80, category: "Frameworks" },
  { name: "Angular", level: 75, category: "Frameworks" },
  { name: "PostgreSQL", level: 85, category: "Databases" },
  { name: "SQL Server", level: 80, category: "Databases" },
  { name: "TypeORM", level: 75, category: "Databases" },
  { name: "AWS", level: 80, category: "Cloud" },
  { name: "Azure", level: 75, category: "Cloud" },
  { name: "Docker", level: 80, category: "DevOps" },
  { name: "Kubernetes", level: 75, category: "DevOps" },
  { name: "CI/CD", level: 80, category: "DevOps" }
];

export const SKILL_CATEGORIES = ['Languages', 'Frameworks', 'Databases', 'Cloud', 'DevOps'] as const;

export function getSkillLevelIndicator(proficiencyLevel: number): SkillLevelIndicator {
  if (proficiencyLevel >= 85) {
    return { text: 'Expert', color: 'text-gray-800', bg: 'bg-gray-800', ring: 'ring-gray-800' };
  }
  if (proficiencyLevel >= 75) {
    return { text: 'Advanced', color: 'text-gray-600', bg: 'bg-gray-600', ring: 'ring-gray-600' };
  }
  if (proficiencyLevel >= 65) {
    return { text: 'Intermediate', color: 'text-gray-500', bg: 'bg-gray-500', ring: 'ring-gray-500' };
  }
  return { text: 'Beginner', color: 'text-gray-400', bg: 'bg-gray-400', ring: 'ring-gray-400' };
}
