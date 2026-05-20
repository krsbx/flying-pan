export type DataViewDataType<T extends keyof DataView = keyof DataView> =
  T extends string
    ? T extends `set${infer U}`
      ? U
      : T extends `get${infer V}`
        ? V
        : never
    : never;

export interface DataViewMethodInfo {
  getter: `get${DataViewDataType}`;
  setter: `set${DataViewDataType}`;
  size: number;
}
