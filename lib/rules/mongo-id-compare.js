module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "warns of usage of === operator when comparing ids"
    },
    schema: [],
  },
  create: function(context) {
    return {
      "BinaryExpression": (node) => {
        if (context.getScope().block.params !== undefined) {
            let typesId1 = context.getScope().block.params[0].typeAnnotation.typeAnnotation.types;
            let typesId2 = context.getScope().block.params[1].typeAnnotation.typeAnnotation.types;
          
            let flag = false;
          
            for (let i = 0; i < typesId1.length; i++) {
              if (typesId1[i].type === "GenericTypeAnnotation") {
                flag = true;
              }
            }
          
            if (flag === false) {
          	  return;
            }
          
            flag = false;
            for (let i = 0; i < typesId2.length; i++) {
              if (typesId2[i].type === "GenericTypeAnnotation") {
                flag = true;
              }
            }
          
            if (flag === false) {
          	  return;
            }
          }
          context.report({
            node: node,
            message: "Usage of === operator can lead to untractable errors, use equals instead"
         });
      },
    }
  },
};
