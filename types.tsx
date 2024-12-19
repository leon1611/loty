export type RootStackParamList = {
  Main: undefined;
  Selection: undefined;
  Draw: { selectedNumbers: number[] };
  Results: { selectedNumbers: number[]; drawnNumbers: number[] };
};
