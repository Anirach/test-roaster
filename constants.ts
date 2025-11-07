
import { StaffMember, StaffSkill, ShiftType, ShiftAssignment, Kpi } from './types';

export const STAFF_MEMBERS: StaffMember[] = [
  { id: '1', name: 'Eleanor Vance', skills: [StaffSkill.RN, StaffSkill.ChargeNurse, StaffSkill.TraumaCertified], contractedHours: 40 },
  { id: '2', name: 'Ben Carter', skills: [StaffSkill.RN, StaffSkill.PediatricCare], contractedHours: 36 },
  { id: '3', name: 'Olivia Martinez', skills: [StaffSkill.RN], contractedHours: 40 },
  { id: '4', name: 'Liam Goldberg', skills: [StaffSkill.RN, StaffSkill.TraumaCertified], contractedHours: 36 },
  { id: '5', name: 'Sophia Chen', skills: [StaffSkill.RN, StaffSkill.ChargeNurse], contractedHours: 40 },
  { id: '6', name: 'Noah Rodriguez', skills: [StaffSkill.Support], contractedHours: 40 },
  { id: '7', name: 'Ava Nguyen', skills: [StaffSkill.ORTech], contractedHours: 36 },
  { id: '8', name: 'James Kim', skills: [StaffSkill.RN], contractedHours: 24 },
];

const today = new Date();
const getDay = (dayOffset: number): string => {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    return date.toISOString().split('T')[0];
};

export const INITIAL_ROSTER: ShiftAssignment[] = [
    { staffId: '1', date: getDay(0), shiftType: ShiftType.Day },
    { staffId: '2', date: getDay(0), shiftType: ShiftType.Day },
    { staffId: '3', date: getDay(0), shiftType: ShiftType.Day },
    { staffId: '4', date: getDay(0), shiftType: ShiftType.Off },
    { staffId: '5', date: getDay(0), shiftType: ShiftType.Night },
    { staffId: '6', date: getDay(0), shiftType: ShiftType.Day },
    { staffId: '7', date: getDay(0), shiftType: ShiftType.Night },
    { staffId: '8', date: getDay(0), shiftType: ShiftType.Night },

    { staffId: '1', date: getDay(1), shiftType: ShiftType.Day },
    { staffId: '2', date: getDay(1), shiftType: ShiftType.Off },
    { staffId: '3', date: getDay(1), shiftType: ShiftType.Day },
    { staffId: '4', date: getDay(1), shiftType: ShiftType.Day },
    { staffId: '5', date: getDay(1), shiftType: ShiftType.Night },
    { staffId: '6', date: getDay(1), shiftType: ShiftType.Night },
    { staffId: '7', date: getDay(1), shiftType: ShiftType.Day },
    { staffId: '8', date: getDay(1), shiftType: ShiftType.Night },
];

export const KPIS: Kpi[] = [
    { label: 'Overtime Hours', value: '128', change: '-12%', changeType: 'decrease', description: 'vs. last week' },
    { label: 'Agency Spend', value: '$8,500', change: '-25%', changeType: 'decrease', description: 'vs. last week' },
    { label: 'Understaffed Shifts', value: '2', change: '+1', changeType: 'increase', description: 'vs. last week' },
    { label: 'Staff Satisfaction', value: '8.2/10', change: '+5%', changeType: 'increase', description: 'vs. last month' },
];

export const DATES: string[] = Array.from({ length: 7 }, (_, i) => getDay(i));
