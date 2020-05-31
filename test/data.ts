export const blockDefData = [
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

export const blockSetData = [
         {
           blockSetKey: "number",
           blocks: blockDefData,
         },
         {
           blockSetKey: "person",
           blocks: [
             {
               blockKey: "overAge",
               uiString: "Is This Person over age of",
               args: [
                 {
                   name: "person",
                   type: "person",
                 },
                 {
                   name: "age",
                   type: "number",
                 },
               ],
               returnType: "boolean",
             },
             {
               blockKey: "isMarried",
               uiString: "Is this person married",
               args: [
                 {
                   name: "person",
                   type: "person",
                 },
               ],
               returnType: "boolean",
             },
           ],
         },
       ];