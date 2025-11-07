
export enum StaffSkill {
  RN = 'Registered Nurse',
  ChargeNurse = 'Charge Nurse',
  PediatricCare = 'Pediatric Care',
  TraumaCertified = 'Trauma Certified',
  Support = 'Support Staff',
  ORTech = 'OR Technician',
}

export enum ShiftType {
  Day = 'Day (7a-7p)',
  Night = 'Night (7p-7a)',
  Off = 'Off',
}

export interface StaffMember {
  id: string;
  name: string;
  skills: StaffSkill[];
  contractedHours: number;
}

export interface ShiftAssignment {
  staffId: string;
  date: string; // YYYY-MM-DD
  shiftType: ShiftType;
}

export interface Kpi {
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
