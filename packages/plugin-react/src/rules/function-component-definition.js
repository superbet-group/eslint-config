// original: https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/function-component-definition.js
// adds option to customise behaviour of default exports

const Components = require('eslint-plugin-react/lib/util/Components');
const docsUrl = require('eslint-plugin-react/lib/util/docsUrl');
const reportC = require('eslint-plugin-react/lib/util/report');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function buildFunction(template, parts) {
  return Object.keys(parts)
    .reduce((acc, key) => acc.replace(`{${key}}`, parts[key] || ''), template);
}

const NAMED_FUNCTION_TEMPLATES = {
  'function-declaration': 'function {name}{typeParams}({params}){returnType} {body}',
  'arrow-function': 'var {name}{typeAnnotation} = {typeParams}({params}){returnType} => {body}',
  'function-expression': 'var {name}{typeAnnotation} = function{typeParams}({params}){returnType} {body}',
};

const UNNAMED_FUNCTION_TEMPLATES = {
  'function-expression': 'function{typeParams}({params}){returnType} {body}',
  'arrow-function': '{typeParams}({params}){returnType} => {body}',
};

function hasOneUnconstrainedTypeParam(node) {
  if (node.typeParameters) {
    return node.typeParameters.params.length === 1 && !node.typeParameters.params[0].constraint;
  }

  return false;
}

function hasName(node) {
  return node.type === 'FunctionDeclaration' || node.parent.type === 'VariableDeclarator';
}

function getNodeText(prop, source) {
  if (!prop) return null;
  return source.slice(prop.range[0], prop.range[1]);
}

function getName(node) {
  if (node.type === 'FunctionDeclaration') {
    return node.id.name;
  }

  if (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') {
    return hasName(node) && node.parent.id.name;
  }
}

function getParams(node, source) {
  if (node.params.length === 0) return null;
  return source.slice(node.params[0].range[0], node.params[node.params.length - 1].range[1]);
}

function getBody(node, source) {
  const range = node.body.range;

  if (node.body.type !== 'BlockStatement') {
    return [
      '{',
      `  return ${source.slice(range[0], range[1])}`,
      '}',
    ].join('\n');
  }

  return source.slice(range[0], range[1]);
}

function getTypeAnnotation(node, source) {
  if (!hasName(node) || node.type === 'FunctionDeclaration') return;

  if (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') {
    return getNodeText(node.parent.id.typeAnnotation, source);
  }
}

function isDefaultExport(node) {
  return node.type === "FunctionDeclaration" && node.parent && node.parent.type === "ExportDefaultDeclaration";
}

function isUnfixableBecauseOfExport(node) {
  return isDefaultExport(node);
}

function isFunctionExpressionWithName(node) {
  return node.type === 'FunctionExpression' && node.id && node.id.name;
}

const messages = {
  'function-declaration': 'Function component is not a function declaration',
  'function-expression': 'Function component is not a function expression',
  'arrow-function': 'Function component is not an arrow function',
};

const configShape = {
  namedComponents: {
    oneOf: [
      { enum: ['function-declaration', 'arrow-function', 'function-expression'] },
      {
        type: 'array',
        items: {
          type: 'string',
          enum: ['function-declaration', 'arrow-function', 'function-expression'],
        },
      },
    ],
  },
  unnamedComponents: {
    oneOf: [
      { enum: ['arrow-function', 'function-expression'] },
      {
        type: 'array',
        items: {
          type: 'string',
          enum: ['arrow-function', 'function-expression'],
        },
      },
    ],
  },
}

module.exports = {
  meta: {
    docs: {
      description: 'Standardize the way function component get defined',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('function-component-definition'),
    },
    fixable: 'code',

    messages,

    schema: [
      {
        type: 'object',
        properties: {
          ...configShape,
          defaultExport: {
            type: "object",
            properties: configShape,
          }
        },
      },
    ],
  },

  create: Components.detect((context, components) => {
    const configuration = context.options[0] || {};
    const defaultExportConfig = configuration.defaultExport || {};

    const defaultExportNamedConfig = [].concat(defaultExportConfig.namedComponents || 'function-declaration');
    const defaultExportUnnamedConfig = [].concat(defaultExportConfig.unnamedComponents || 'function-expression');
    const namedConfig = [].concat(configuration.namedComponents || 'function-declaration');
    const unnamedConfig = [].concat(configuration.unnamedComponents || 'function-expression');

    function getFixer(node, options) {
      const sourceCode = context.getSourceCode();
      const source = sourceCode.getText();

      const typeAnnotation = getTypeAnnotation(node, source);

      if (options.type === 'function-declaration' && typeAnnotation) return;
      if (options.type === 'arrow-function' && hasOneUnconstrainedTypeParam(node)) return;
      if (isUnfixableBecauseOfExport(node)) return;
      if (isFunctionExpressionWithName(node)) return;

      return (fixer) => fixer.replaceTextRange(options.range, buildFunction(options.template, {
        typeAnnotation,
        typeParams: getNodeText(node.typeParameters, source),
        params: getParams(node, source),
        returnType: getNodeText(node.returnType, source),
        body: getBody(node, source),
        name: getName(node),
      }));
    }

    function report(node, options) {
      reportC(context, messages[options.messageId], options.messageId, {
        node,
        fix: getFixer(node, options.fixerOptions),
      });
    }

    function validate(node, functionType) {
      if (!components.get(node)) return;

      if (node.parent && node.parent.type === 'Property') return;

      function applyConfig(node, appliedNameConfig, appliedUnnamedConfig) {
        if (hasName(node) && !appliedNameConfig.includes(functionType)) {
          report(node, {
            messageId: namedConfig[0],
            fixerOptions: {
              type: namedConfig[0],
              template: NAMED_FUNCTION_TEMPLATES[namedConfig[0]],
              range: node.type === 'FunctionDeclaration'
                ? node.range
                : node.parent.parent.range,
            },
          });
          return;
        }
        if (!hasName(node) && !appliedUnnamedConfig.includes(functionType)) {
          report(node, {
            messageId: unnamedConfig[0],
            fixerOptions: {
              type: unnamedConfig[0],
              template: UNNAMED_FUNCTION_TEMPLATES[unnamedConfig[0]],
              range: node.range,
            },
          });
        }
      }

      if (isDefaultExport(node)) {
        applyConfig(node, defaultExportNamedConfig, defaultExportUnnamedConfig);
        return;
      };

      applyConfig(node, namedConfig, unnamedConfig);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      FunctionDeclaration(node) { validate(node, 'function-declaration'); },
      ArrowFunctionExpression(node) { validate(node, 'arrow-function'); },
      FunctionExpression(node) { validate(node, 'function-expression'); },
    };
  }),
};