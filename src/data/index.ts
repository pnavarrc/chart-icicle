import householdJson from "./household.json";

export interface LeafNode {
  name: string;
  value?: number;
}

export interface BranchNode {
  name: string;
  children: (BranchNode | LeafNode)[];
  value?: number;
}

export type Tree = BranchNode | LeafNode;

export const household: Tree = householdJson;
