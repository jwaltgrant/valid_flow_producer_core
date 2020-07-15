import { IAbstractNode, initAbstractNode, INodeActions, IConnect } from "../AbstractNode";

export interface IInputNode extends IAbstractNode {
  targets: string[];
}

export const INPUT_TYPE = 'INPUT';

export function initInputNode(id?: string): IInputNode{
  return {
    ...initAbstractNode(INPUT_TYPE, id),
    targets: []
  }
}

export class InputNodeActions implements INodeActions<IInputNode>{
  instanceOf(node: IAbstractNode): boolean {
    return node.type === INPUT_TYPE;
  }

  /**
   * Connect two nodes
   * @param connectionData Object containing all connection data
   */
  connectNode(connectionData: IConnect<IInputNode>): IInputNode {
    const connections = connectionData.fromNode.targets;
    if(connectionData.connectionKey !== 'output'){
      throw new Error(`Unsupported connection key: ${connectionData.connectionKey}`);
    }
    if(!connections.includes(connectionData.toNodeID)){
      connections.push(connectionData.toNodeID);
    }
    return {...connectionData.fromNode};
  }

  /**
   * Dicsonnect a node from another node
   * @param connectionData Object containg all connection data
   */
  disconnectNode(connectionData: IConnect<IInputNode>): IInputNode {
    const connections = connectionData.fromNode.targets;
    if (connectionData.connectionKey !== 'output') {
      throw new Error(`Unsupported connection key: ${connectionData.connectionKey}`);
    }
    const index = connections.indexOf(connectionData.toNodeID);
    if(index === -1){
      return connectionData.fromNode;
    }
    connections.splice(index, 1);
    return { ...connectionData.fromNode };
  }

}
