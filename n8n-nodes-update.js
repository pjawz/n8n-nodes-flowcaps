#!/usr/bin/env node

/**
 * n8n Custom Node Type Upgrade Tool
 * This script updates n8n custom node type definitions to be compatible with newer n8n versions.
 *
 * It fixes common issues like:
 * - Input/output definitions
 * - Type imports
 * - Interface compatibility
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix n8n node TypeScript imports and input/output definitions
 */
function updateNodeFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix imports - ensure IExecuteFunctions is imported from n8n-workflow
  content = content.replace(
    /import\s+{([^}]*)}\s+from\s+['"]n8n-core['"];/g,
    (match, imports) => {
      // If IExecuteFunctions is in n8n-core imports, remove it
      const fixedImports = imports
        .split(',')
        .map(i => i.trim())
        .filter(i => i !== 'IExecuteFunctions')
        .join(', ');

      if (!fixedImports.trim()) {
        return ''; // Remove empty import
      }
      return `import { ${fixedImports} } from 'n8n-core';`;
    }
  );

  // Ensure IExecuteFunctions is in n8n-workflow imports
  if (content.includes('IExecuteFunctions') && !content.match(/import\s+{[^}]*IExecuteFunctions[^}]*}\s+from\s+['"]n8n-workflow['"];/)) {
    content = content.replace(
      /import\s+{([^}]*)}\s+from\s+['"]n8n-workflow['"];/,
      (match, imports) => {
        if (!imports.includes('IExecuteFunctions')) {
          return `import { ${imports.trim()}, IExecuteFunctions } from 'n8n-workflow';`;
        }
        return match;
      }
    );
  }

  // Add NodeConnectionType import if needed for modern n8n versions
  if ((content.includes('inputs:') || content.includes('outputs:')) &&
      !content.includes('NodeConnectionType')) {
    content = content.replace(
      /import\s+{([^}]*)}\s+from\s+['"]n8n-workflow['"];/,
      (match, imports) => {
        return `import { ${imports.trim()}, NodeConnectionType } from 'n8n-workflow';`;
      }
    );
  }

  // Fix inputs/outputs arrays using NodeConnectionType (modern n8n method)
  content = content.replace(
    /(inputs|outputs):\s*\[\s*['"]main['"]\s*\],?/g,
    match => {
      const type = match.startsWith('inputs') ? 'inputs' : 'outputs';
      return `${type}: [
      {
        name: 'main',
        type: NodeConnectionType.Main,
      },
    ],`;
    }
  );

  // Fix inputs/outputs defined as arrays cast to any
  content = content.replace(
    /(inputs|outputs):\s*\[\s*['"]main['"]\s*\]\s*as\s*any,?/g,
    match => {
      const type = match.startsWith('inputs') ? 'inputs' : 'outputs';
      return `${type}: [
      {
        name: 'main',
        type: NodeConnectionType.Main,
      },
    ],`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
}

/**
 * Process all TypeScript files in a directory
 */
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.node.ts')) {
      updateNodeFile(filePath);
    }
  }
}

// Main execution - process the provided path or current directory
const targetDir = process.argv[2] || './nodes';
if (fs.existsSync(targetDir)) {
  console.log(`Processing n8n nodes in: ${targetDir}`);
  processDirectory(targetDir);
  console.log('Done! Node files have been updated.');
} else {
  console.error(`Error: Directory "${targetDir}" not found.`);
  console.log('Usage: node n8n-nodes-upgrade.js [directory]');
}