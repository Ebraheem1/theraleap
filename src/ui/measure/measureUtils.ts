import {
  LeapHandTrackingData,
  LeapPointable,
  LeapDeviceFrame
} from "@/devices/leapmotion";
//norm calculates the magnitude of any vector
const norm = (vec: number[]) => {
  return Math.sqrt(vec.map(x => Math.pow(x, 2)).reduce((p, c) => p + c, 0));
};
//This function is pure dot product like in the Maths
export const calculatePointableAngle = (
  first: LeapPointable,
  second: LeapPointable
): number => {
  //This ab constant to do the dot product
  const ab = first.direction
    .map((el, idx) => el * second.direction[idx]) //map to perform the product
    .reduce((p, c) => p + c, 0); //reduce to perform the addition after the multiplication
  const normFirst = norm(first.direction);
  const normSecond = norm(second.direction);
  const theta = Math.acos(ab / (normFirst * normSecond));
  return theta * 180 / Math.PI;
};
//This function sorts the pointables returned from the leap motion API
export const sortPointables = (
  frame: LeapHandTrackingData
): LeapPointable[] | undefined => {
  const copy = frame.data.pointables.slice(0);
  if (copy.length !== 5) {
    // We only work with frames tracking all fingers
    return undefined;
  }
  copy.sort((a: LeapPointable, b: LeapPointable) => {
    if (a.type < b.type) {
      return -1;
    } else {
      return 1;
    }
  });
  return copy;
};
const dotProduct = (arr1: number[], arr2: number[]): number => {
  return (
    arr1[0] * arr2[0] * -1 + arr1[1] * arr2[1] * -1 + arr1[2] * arr2[2] * -1
  ); //-1 since armBasis[3] is opposite direction to arm.direction()
};
const directionUp = (tipPosition: number[], metacarpal: number[]): boolean => {
  if (tipPosition[1] > metacarpal[1]) return true;
  else return false;
};

export const measureWristAngle = (frame: LeapDeviceFrame): number => {
  var handDirection = frame.hands[0].direction;
  var wristDirection = frame.hands[0].armBasis[2];
  var wristAngle =
    Math.acos(dotProduct(wristDirection, handDirection)) * (180 / Math.PI);
  var upDirection = directionUp(
    frame.pointables[2].dipPosition,
    frame.pointables[2].mcpPosition
  );
  if (upDirection) {
    return wristAngle;
  } else {
    return wristAngle * -1;
  }
};
