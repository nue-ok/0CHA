export interface FitnessType {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  like: boolean;
}

export interface newRoutine {
  name: string;
  dueDate: string;
}

export interface Routine {
  title: string;
  dueDate: string;
  exercises: exercise[];
}

type exercise = {
  id: number;
  name: string;
  detail: detail[];
};

type detail = {
  id: number;
  set: number;
  weight: number;
  count: number;
  isComplete: boolean;
};

export interface RoutineList {
  id: number;
  title: string;
  dueDate: string;
  like: boolean;
}

// 아래는 루틴불러오기

export interface RoutineListDetail {
  id?: number;
  title: string;
  sumVolume: number;
  sumTime: number;
  createdAt?: string;
  completedAt?: string;
  dueDate: string;
  details: RoutineDetails[];
  like: boolean;
  complete: boolean;
  upload: boolean;
}

export interface RoutineDetails {
  exerciseId: number;
  exerciseName: string;
  sequence?: number;
  sets: RoutineSets[];
}

export interface RoutineSets {
  sequence: number;
  weight: number | '';
  count: number | '';
  complete: boolean;
}

// 아래는 루틴 생성

export interface CreateRoutine {
  exerciseName: string;
  exerciseId: number;
}

export interface plan {
  name: string;
  id: number;
  detail: any[];
}

export interface axiosCreateRoutine {
  id?: number;
  title: string;
  sumVolume?: number;
  sumTime?: number;
  dueDate: string;
  details: axiosCreateRoutineDetails[];
}

export interface axiosCreateRoutineDetails {
  exerciseName: string;
  exerciseId: number;
  sequence?: number;
  sets: ExerciseDetailType[];
}

export interface ExerciseDetailType {
  sequence: number;
  weight: number | '';
  count: number | '';
  complete: boolean;
}

export interface mainPageRoutine {
  id: number;
  title: string;
  dueDate: string;
  like: boolean;
}

export interface FitnessMomenthum {
  date: string;
  exerciseName: string;
  volume: number;
  totalTime: number;
}

export interface FinishProps {
  date: string;
  volume: number;
  time: number;
}
