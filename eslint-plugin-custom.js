const snakeToCamel = (str) => str.replace(/([-_][a-z])/g, (group) =>
  group.toUpperCase().replace('-', '').replace('_', '')
);

module.exports = {
  rules: {
    'convert-snake-to-camel': {
      meta: {
        type: 'suggestion',
        fixable: 'code',
        schema: [{
          type: 'object',
          properties: {
            ignore: {
              type: 'array',
              items: { type: 'string' }
            }
          },
          additionalProperties: false
        }]
      },
      create(context) {
        const options = context.options[0] || {};
        const ignorePatterns = [
          '^_id$',
          '^__v$',
          '^Access-Control-.*',
          '^default-src$',
          '^frame-ancestors$',
          ...options.ignore || []
        ];
        const shouldIgnore = (name) => ignorePatterns.some(pattern => new RegExp(pattern).test(name));

        return {
          Identifier(node) {
            if (node.name.includes('_') && !shouldIgnore(node.name)) {
              context.report({
                node,
                message: 'Use camelCase instead of snake_case.',
                fix: (fixer) => {
                  return fixer.replaceText(node, snakeToCamel(node.name));
                },
              });
            }
          },
          Property(node) {
            if (node.key.type === 'Identifier' && node.key.name.includes('_') && !shouldIgnore(node.key.name)) {
              context.report({
                node: node.key,
                message: 'Use camelCase instead of snake_case for object properties.',
                fix: (fixer) => {
                  return fixer.replaceText(node.key, snakeToCamel(node.key.name));
                },
              });
            }
          },
        };
      },
    },
  },
};