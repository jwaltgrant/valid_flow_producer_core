import AbstractNode, { IAbstractNode } from "../AbstractNode";

export interface IInputNode extends IAbstractNode{
    targets: number[];
}

export default class InputNode extends AbstractNode implements IInputNode{
    targets: number[];

    constructor(id: number, targets?: number[]){
        super(id);
        this.targets = targets || [];
    }

    /**
     * Add ID to Node's Targets, ensuring no duplication of targets
     * @param id ID to Add to Target List
     */
    addTarget(id: number){
        if(this.targets.indexOf(id) < 0){
            this.targets.push(id);
        }
    }
}