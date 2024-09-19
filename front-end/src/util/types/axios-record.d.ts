export interface Inbody {
  id?: number;
  userId?: number;
  height?: number;
  weight?: number;
  bodyWater?: number;
  protein?: number;
  mineral?: number;
  bodyFat?: number;
  muscleMass?: number;
  muscleBody?: number;
  muscleLeftArm?: number;
  muscleRightArm?: number;
  muscleLeftLeg?: number;
  muscleRightLeg?: number;
  bmi?: number;
  bodyFatPercent?: number;
  measuredAt?: string;
}

export interface FitnessDay {
  routineId: number;
  routineName: string;
  dueDate: string;
  completed: boolean;
}

export interface IsRoutine {
  btnName: string;
  isFlag: boolean;
  routineId: number;
}

export interface FitnessData {
  date: string;
  maxWeight: number;
  totalVolume: number;
  totalTime: number;
}
export interface RmDataType {
  date: string;
  oneRepMax: number;
}
// 인바디 OCR 타입

interface Image {
  uid: string;
  name: string;
  inferResult: string;
  message: string;
  matchedTemplate: {
    id: number;
    name: string;
  };
  validationResult: {
    result: string;
  };
  convertedImageInfo: {
    width: number;
    height: number;
    pageIndex: number;
    longImage: boolean;
  };
  fields: Field[];
  title: Title;
}

interface Field {
  name: string;
  valueType: string;
  boundingPoly: BoundingPoly;
  inferText: string;
  inferConfidence: number;
  type: string;
  subFields: SubField[];
}

interface BoundingPoly {
  vertices: Vertex[];
}

interface Vertex {
  x: number;
  y: number;
}

interface SubField {
  boundingPoly: BoundingPoly;
  inferText: string;
  inferConfidence: number;
  lineBreak: boolean;
}

interface Title {
  name: string;
  boundingPoly: BoundingPoly;
  inferText: string;
  inferConfidence: number;
  subFields: SubField[];
}

interface ApiResponse {
  version: string;
  requestId: string;
  timestamp: number;
  images: Image[];
}
