import * as Block from "./BlockInstance";
import { IBlockDef } from "./IBlockSet";

describe("Test Block Instance", () => {
  const blockSetKey = "testSet";
  const blockDef1: IBlockDef = {
    key: "testKey",
    uiString: "test1",
    args: [
      {
        name: "arg1",
        type: "string",
        default: "Hello",
      },
      {
        name: "arg2",
        type: "number",
        default: 7,
      },
    ],
    returnType: "number",
  };
  const blockDef2: IBlockDef = {
    key: "testKey2",
    uiString: "test2",
    args: [
      {
        name: "arg3",
        type: "datetime",
        default: "2020-06-20",
      },
      {
        name: "arg4",
        type: "number",
        default: 7,
      },
    ],
    returnType: "datetime",
  };
  test("From Block Def", () => {
    let block1: Block.IBlockInstance = Block.fromBlockDef({
      blockSetKey,
      blockDef: blockDef1,
    });
    let expected: Block.IBlockInstance = {
      blockSetKey: blockSetKey,
      blockKey: blockDef1.key,
      args: [
        {
          name: "arg1",
          value: "Hello",
          payloadElement: false,
        },
        {
          name: "arg2",
          value: 7,
          payloadElement: false,
        },
      ],
    };
    expect(block1).toEqual(expected);
    let _block1 = Block.fromBlockDef({
      blockSetKey,
      blockDef: blockDef1,
      block: block1,
    });
    expect(_block1).toEqual(expected);
  });

  test("Update Arg", () => {
    let block2: Block.IBlockInstance = Block.fromBlockDef({
      blockSetKey,
      blockDef: blockDef2,
    });
    let expected: Block.IBlockInstance = {
      blockSetKey: blockSetKey,
      blockKey: blockDef2.key,
      args: [
        {
          name: "arg3",
          value: "2020-06-20",
          payloadElement: false,
        },
        {
          name: "arg4",
          value: 7,
          payloadElement: false,
        },
      ],
    };
    expect(block2).toEqual(expected);

    let _block2 = Block.updateArg(block2, block2.args[0]);
    expect(_block2).toEqual(expected);

    let newArg: Block.IArgInstance = {
      name: "arg3",
      value: "entry2",
      payloadElement: true,
    };
    expected = { ...expected, args: [newArg, expected.args[1]] };
    _block2 = Block.updateArg(block2, newArg);
    expect(_block2).toEqual(expected);
  });
});
