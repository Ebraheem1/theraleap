import Vue from "vue";
import { ActionContext, Store } from "vuex";
import { getStoreAccessors } from "vuex-typescript";

import { RootState } from "@/state/store";
import { ThumbSpreadClassifierId } from "@/classify/classifiers/thumbspread";
import { ThumbIndexClassifierId } from "@/classify/classifiers/thumbindex";

export interface ClassifierState {
  classifiers: { [name: string]: any };
}

export const classifier = {
  namespaced: true,
  state: {
    classifiers: {
      ThumbSpreadClassifier: {
        enabled: false,
        windowSize: 200,
        windowInterval: 50,
        threshhold: 30,
        symmetryTolerance: 10,
        throttleTime: 200,
        leapPointableIdentifier: 0,
        constructConfig: () => {
          return {
            identifier: ThumbSpreadClassifierId,
            args: [
              classifier.state.classifiers.ThumbSpreadClassifier.windowSize,
              classifier.state.classifiers.ThumbSpreadClassifier.windowInterval,
              classifier.state.classifiers.ThumbSpreadClassifier.threshhold,
              classifier.state.classifiers.ThumbSpreadClassifier
                .symmetryTolerance,
              classifier.state.classifiers.ThumbSpreadClassifier.throttleTime,
              classifier.state.classifiers.ThumbSpreadClassifier
                .leapPointableIdentifier
            ]
          };
        }
      },
      ThumbIndexClassifier: {
        enabled: false,
        threshold: 30,
        constructConfig: () => {
          return {
            identifier: ThumbIndexClassifierId,
            args: [classifier.state.classifiers.ThumbIndexClassifier.threshold]
          };
        }
      }
    }
  },

  getters: {
    getClassifiers: (state: ClassifierState) => state.classifiers,
    getActiveClassifier: (state: ClassifierState) =>
      Object.values(state.classifiers)
        .filter((classifier: any) => classifier.enabled)
        .map((classifier: any) => {
          return classifier.constructConfig();
        })[0]
  },

  mutations: {
    modifyClassifier: (
      state: ClassifierState,
      { name, newState }: { name: string; newState: any }
    ) => {
      Vue.set(state.classifiers, name, {
        ...state.classifiers[name],
        ...newState
      });
    },
    disableAllClassifiers: (state: ClassifierState) => {
      Object.values(state.classifiers).forEach(val => {
        val.enabled = false;
      });
    }
  }
};

const { commit, read, dispatch } = getStoreAccessors<
  ClassifierState,
  RootState
>("classifier");

export const getClassifiers = read(classifier.getters.getClassifiers);
export const getActiveClassifier = read(classifier.getters.getActiveClassifier);
export const modifyClassifier = commit(classifier.mutations.modifyClassifier);
export const disableAllClassifiers = commit(
  classifier.mutations.disableAllClassifiers
);
