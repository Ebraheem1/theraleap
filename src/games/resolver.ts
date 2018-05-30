import { Game } from "./types";

export const GameResolveMapping: { [key: string]: () => Promise<any> } = {
  "space-shooter": () =>
    import("@/games/space-shooter").then((imp: any) => {
      return imp.default;
    }),
  "space-ship": () =>
    import("@/games/space-ship").then((imp: any) => {
      return imp.default;
    })
};
