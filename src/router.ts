import VueRouter from "vue-router";

const DeviceLog = () => import("@/ui/debug/DeviceLog.vue");
const StatusLog = () => import("@/ui/debug/StatusLog.vue");
const DeviceGraphicalLog = () => import("@/ui/debug/DeviceGraphicalLog.vue");
const DeviceDebugRoot = () => import("@/ui/debug/DeviceDebugRoot.vue");
const DeviceDebugTabs = () => import("@/ui/debug/DeviceDebugTabs.vue");

const DeviceRecorderRoot = () => import("@/ui/recorder/DeviceRecorderRoot.vue");
const DeviceRecorderTabs = () => import("@/ui/recorder/DeviceRecorderTabs.vue");
const DeviceRecorder = () => import("@/ui/recorder/DeviceRecorder.vue");
const DeviceRecorderSettings = () =>
  import("@/ui/recorder/DeviceRecorderSettings.vue");

const Classifiers = () => import("@/ui/classify/Classifiers.vue");
const ClassifyRoot = () => import("@/ui/classify/ClassifyRoot.vue");
const ClassifySettings = () => import("@/ui/classify/ClassifySettings.vue");
const ClassifyTabs = () => import("@/ui/classify/ClassifyTabs.vue");

const PreProcessing = () => import("@/ui/data-processing/PreProcessing.vue");
const ProcessingRoot = () => import("@/ui/data-processing/ProcessingRoot.vue");
const ProcessingTabs = () => import("@/ui/data-processing/ProcessingTabs.vue");

const HandMeasurement = () => import("@/ui/measure/HandMeasurement.vue");
const HandMeasurementRoot = () =>
  import("@/ui/measure/HandMeasurementRoot.vue");
const HandMeasurementTabs = () =>
  import("@/ui/measure/HandMeasurementTabs.vue");

const Games = () => import("@/ui/games/GameList.vue");
const GameSettings = () => import("@/ui/games/GameSettings.vue");
const GameRoot = () => import("@/ui/games/GameRoot.vue");
const GameTabs = () => import("@/ui/games/GameTabs.vue");
const GameExecutor = () => import("@/ui/games/GameExecutor.vue");
const GameOver = () => import("@/ui/games/GameOver.vue");

//Therapist routes
const Therapists = () => import("@/ui/therapist/AddTherapist.vue");
const TherapistRoot = () => import("@/ui/therapist/TherapistRoot.vue");
const TherapistTabs = () => import("@/ui/therapist/TherapistTabs.vue");
const AddPatient = () => import("@/ui/therapist/AddPatient.vue");
const TherapistLogin = () => import("@/ui/therapist/Login.vue");
const TherapistViewPatients = () => import("@/ui/therapist/ViewPatients.vue");
const PatientDetails = () => import("@/ui/therapist/PatientDetails.vue");

//Patient routes
const PatientRoot = () => import("@/ui/patient/PatientRoot.vue");
const PatientTabs = () => import("@/ui/patient/PatientTabs.vue");
const PatientLogin = () => import("@/ui/patient/Login.vue");

//Logout route
const Logout = () => import("@/ui/Logout.vue");

import App from "@/ui/App.vue";

const loginTherapistRequired = (to: any, from: any, next: any) => {
  var user: any | null = localStorage.getItem("user");
  if (user == null) {
    next({ path: "/therapist/login_therapist" });
  }
  user = JSON.parse(user);
  if (user && user.type == "1") {
    next();
  } else {
    next({ path: "/therapist/login_therapist" });
  }
};
export const RootRouter = new VueRouter({
  routes: [
    {
      children: [
        {
          children: [
            {
              component: DeviceLog,
              name: "device-log",
              path: "devicelog"
            },
            {
              component: DeviceGraphicalLog,
              path: "hand"
            },
            {
              component: StatusLog,
              path: "status"
            }
          ],
          components: {
            main: DeviceDebugRoot,
            tabs: DeviceDebugTabs
          },
          path: "debug",
          redirect: "/debug/devicelog"
        },
        {
          children: [
            {
              component: DeviceRecorder,
              path: "main"
            },
            {
              component: DeviceRecorderSettings,
              path: "settings"
            }
          ],
          components: {
            main: DeviceRecorderRoot,
            tabs: DeviceRecorderTabs
          },
          path: "recorder",
          redirect: "/recorder/main"
        },
        {
          children: [
            {
              component: Classifiers,
              path: "classifiers",
              beforeEnter: loginTherapistRequired
            },
            {
              component: ClassifySettings,
              path: "settings",
              beforeEnter: loginTherapistRequired
            }
          ],
          components: {
            main: ClassifyRoot,
            tabs: ClassifyTabs
          },
          path: "classify",
          redirect: "/classify/classifiers"
        },
        {
          children: [
            {
              component: PreProcessing,
              path: "preprocessing"
            }
          ],
          components: {
            main: ProcessingRoot,
            tabs: ProcessingTabs
          },
          path: "data-processing",
          redirect: "/data-processing/preprocessing"
        },
        {
          children: [
            {
              component: HandMeasurement,
              path: "display"
            }
          ],
          components: {
            main: HandMeasurementRoot,
            tabs: HandMeasurementTabs
          },
          path: "measurement",
          redirect: "/measurement/display"
        },
        {
          children: [
            {
              component: Games,
              name: "game-list",
              path: "list"
            },
            {
              component: GameSettings,
              path: "settings"
            },
            {
              component: GameExecutor,
              path: "play/:gameIdentifier",
              props: true
            },
            {
              component: GameOver,
              name: "game-over",
              path: "game-over",
              props: true
            }
          ],
          components: {
            main: GameRoot,
            tabs: GameTabs
          },
          path: "games",
          redirect: "/games/list"
        },
        {
          children: [
            {
              component: Therapists,
              path: "add"
            },
            {
              component: AddPatient,
              path: "add_patient"
            },
            {
              component: TherapistViewPatients,
              name: "view-all",
              path: "view_patients"
            },
            {
              component: PatientDetails,
              name: "patient-data",
              path: "/patient",
              props: true
            },
            {
              component: TherapistLogin,
              path: "login_therapist"
            }
          ],
          components: {
            main: TherapistRoot,
            tabs: TherapistTabs
          },
          path: "therapist",
          redirect: "/therapist/login_therapist"
        },
        {
          children: [
            {
              component: PatientLogin,
              path: "login_patient"
            }
          ],
          components: {
            main: PatientRoot,
            tabs: PatientTabs
          },
          path: "patient",
          redirect: "/patient/login_patient"
        },
        {
          children: [],
          components: {
            main: Logout
          },
          path: "logout"
        }
      ],
      component: App,
      path: "/",
      redirect: "/debug"
    }
  ]
});
