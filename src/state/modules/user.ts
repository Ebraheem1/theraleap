import { ActionContext, Store } from "vuex";
import { getStoreAccessors } from "vuex-typescript";

import { RootState } from "@/state/store";

export interface UserState {
  userType: string;
}

export const user = {
  namespaced: true,

  state: {
    userType: "0"
  },

  getters: {
    getUserType: (state: UserState) => state.userType
  },

  mutations: {
    setUserType: (state: UserState, userType: string) => {
      state.userType = userType;
    }
  }
};

const { commit, read, dispatch } = getStoreAccessors<UserState, RootState>(
  "user"
);

export const getUserType = read(user.getters.getUserType);

export const setUserType = commit(user.mutations.setUserType);
