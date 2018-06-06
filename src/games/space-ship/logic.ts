import { LeapDeviceFrame } from "@/devices/leapmotion";
const vec3 = require("gl-vec3") as any;

export const doLeapFilteringTI = (frames: LeapDeviceFrame[]): number[][] => {
  var thumbIndexAngleArrCon: number[] = [];
  var thumbIndexAngleArrDis: number[] = [];
  var distalMedialArr: number[] = [];
  var medialProximalArr: number[] = [];
  frames.forEach(frame => {
    var data_arr = measuringAnglesforFilteringLeap(frame);
    thumbIndexAngleArrCon.push(data_arr[0]);
    if (frame.hands[0].confidence > 0.7) {
      thumbIndexAngleArrDis.push(data_arr[0]);
      distalMedialArr.push(data_arr[1]);
      medialProximalArr.push(data_arr[2]);
    }
  });
  return [
    thumbIndexAngleArrCon,
    thumbIndexAngleArrDis,
    distalMedialArr,
    medialProximalArr
  ];
};

const direction = (basis: number[][]): number[] => {
  return [basis[2][0] * -1, basis[2][1] * -1, basis[2][2] * -1];
};
const measuringAnglesforFilteringLeap = (frame: LeapDeviceFrame): number[] => {
  var thumbDirection = frame.pointables[0].direction;
  var indexDirection = frame.pointables[1].direction;
  var thumbDistal = direction(frame.pointables[0].bases[3]);
  var thumbMedial = direction(frame.pointables[0].bases[2]);
  var thumbProximal = direction(frame.pointables[0].bases[1]);

  var thumbIndexAngle =
    Math.acos(vec3.dot(thumbDirection, indexDirection)) * (180 / Math.PI);
  var distal_medial =
    Math.acos(vec3.dot(thumbDistal, thumbMedial)) * (180 / Math.PI);
  var medial_proximal =
    Math.acos(vec3.dot(thumbMedial, thumbProximal)) * (180 / Math.PI);
  return [
    Number(Number.parseFloat("" + thumbIndexAngle).toPrecision(4)),
    Number(Number.parseFloat("" + distal_medial).toPrecision(4)),
    Number(Number.parseFloat("" + medial_proximal).toPrecision(4))
  ];
};
