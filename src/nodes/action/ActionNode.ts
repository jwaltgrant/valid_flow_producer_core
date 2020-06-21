import AbstractNode, {
  IAbstractNode,
  IChildNode,
  instanceOfIChildNode,
} from "../AbstractNode";
import { IBlockInstance } from "../../BlockInstance";

export interface IActionNode extends IAbstractNode, IChildNode {
  readonly actionKey?: string;
  block?: IBlockInstance;
  returnKey?: string;
}

export default abstract class ActionNode extends AbstractNode implements IActionNode{
    abstract readonly actionKey: string;
    block: IBlockInstance;
    returnKey?: string;
    parentNodeIDs: string[];


    constructor(id: string, parentNodeIDs: string[] = [], block?: IBlockInstance, returnKey?: string){
        super(id);
        this.block = block;
        this.returnKey = returnKey;
        this.parentNodeIDs = parentNodeIDs;
    }

    /**
     * Search through a list of nodes for all nodes which are up stream(ancensotrs) of this node
     * @param nodes Nodes to search through to find ancestors in
     */
    getAncenstorNodeIDs(nodes: AbstractNode[]): string[]{
      let ancestors: string[] = [];
      ancestors.push(...this.parentNodeIDs);
      for(const node of nodes){
        if (this.parentNodeIDs.indexOf(node.id) > -1 && instanceOfIChildNode(node)) {
          ancestors.push(...node.getAncenstorNodeIDs(nodes));
        }
      }
      return ancestors;
    }

    serialize(): IActionNode{
      return {
        ...super.serialize(),
        block: this.block,
        returnKey: this.returnKey,
        parentNodeIDs: this.parentNodeIDs,
        actionKey: this.actionKey
      }
    }
}