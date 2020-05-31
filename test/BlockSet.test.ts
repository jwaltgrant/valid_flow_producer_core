import BlockSet from '../src/BlockSet';

test('Deserialize BlockSet', () => {
    const data = {
      blockSetKey: "number",
      blocks: [
        {
          blockKey: "gt",
          uiString: "Is Greater Than",
          args: [
            {
              name: "lhs",
              type: "number",
            },
            {
              name: "rhs",
              type: "number",
            },
          ],
          returnType: "boolean",
        },
        {
          blockKey: "sum",
          uiString: "Sum Of",
          listArgs: true,
          listArgType: "number",
          returnType: "number",
        },
      ]
    };
    const blockSet = BlockSet.deserialise(data);
    expect(blockSet.findBlock("gt")).not.toBeNull();
    expect(blockSet.findBlock("sum")).not.toBeNull();
    expect(blockSet.findBlock('missinng')).toBeUndefined();
});
