import { Control } from 'react-hook-form';

export type FormInputs = {
  // 第一页
  patientName: string;
  gender: '男' | '女';
  age: number;
  dominantHand: '左手' | '右手' | '双手';
  injurySide: '左侧' | '右侧' | '无';
  phoneNumber: string;
  sportLifestyle: '是' | '否';
  sportLevel: '竞技性运动' | '休闲运动' | '不参加运动';
  sportType: '接触性运动' | '强力过顶运动' | '无';
  // 第二页
  painLevel: number;
  painFrequency: string;
  strongerPainKiller: '有' | '无';
  painKillerFrequency: number;
  painKillerDosage: number;
  shoulderPain: '无' | '轻微' | '中等' | '严重' | '极度';
  shoulderPainLifting: '无疼痛' | '轻度痛' | '中度痛' | '重度痛';
  // 第三页
  shoulderSatisfaction: '满意或比以前好' | '不满意或比以前更差';
  shoulderComfort: '是' | '否';
  painOrSpasm: number;
  weakness: number;
  fatigue: number;
  popping: number;
  stiffness: number;
  neckDiscomfort: number;
  instability: number;
  compensation: number;
  protectArm: number;
  fallConcern: number;
  problemAwareness: number;
  worsenConcern: number;
  emotionalImpact: number;
  // 第四页
  dailyWork: number;
  routineSports: number;
  leisureActivities: number;
  socialImpact: number;
  workLimitation: string;
  wearCoat: number;
  washBack: number;
  useToilet: number;
  combHair: number;
  reachHighShelf: number;
  putCoinOnShelf: number;
  liftWeight: number;
  throwBallLow: number;
  throwBallHigh: number;
  reachBehind: number;
  openBottle: string;
  heavyHousework: string;
  carryBags: string;
  cutFood: string;
  // 第五页
  nightPain: '是' | '否';
  sideSleepping: '能' | '不能';
  sleepDifficulty: number;
  // New fields
  symptoms: string;
  medicalHistory: string;
};

export interface PageProps {
  control: Control<FormInputs>;
}

export interface Page1to3Props extends PageProps {
  page: number;
}
