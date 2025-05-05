# n8n Community Node: FlowCaps

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-flowcaps.svg?style=flat&logo=npm)](https://www.npmjs.com/package/n8n-nodes-flowcaps)
[![NPM Downloads](https://img.shields.io/npm/dt/n8n-nodes-flowcaps.svg?style=flat&logo=npm)](https://www.npmjs.com/package/n8n-nodes-flowcaps)

This is an n8n community node package that provides simple visual marker nodes, called **FlowCaps**, to help organize and clarify your n8n workflows.

These nodes are functionally identical to the built-in `NoOp` (No Operation) node – they simply pass input data through unchanged. Their primary purpose is to serve as visual cues or end-caps within a workflow diagram.

## Nodes Included

- **✔ Done (`flowCapDone`)**

  - **Icon:** ![Done Icon](nodes/FlowCap/icons/FlowCapDone.svg?raw=true&sanitize=true)
  - **Color:** `#00cc66`
  - **Description:** Marks the successful completion or a specific success path within a workflow branch.

- **🏁 End (`flowCapEnd`)**

  - **Icon:** ![End Icon](nodes/FlowCap/icons/FlowCapEnd.svg?raw=true&sanitize=true)
  - **Color:** `#555555`
  - **Description:** Clearly indicates the final end-point or terminal state of a workflow or major section.

- **⚠ Warning (`flowCapWarning`)**
  - **Icon:** ![Warning Icon](nodes/FlowCap/icons/FlowCapWarning.svg?raw=true&sanitize=true)
  - **Color:** `#ffcc00`
  - **Description:** Flags potentially problematic, risky, incomplete, or temporary sections of a workflow that require attention.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-flowcaps` in the search box.
4. Agree to the risks and install the package.

## Usage

After installation, you can find the FlowCap nodes in the node panel under the "Transform" category (or by searching for "Done", "End", or "Warning"). Drag them onto your canvas like any other node to visually mark specific points in your workflow.

They require no configuration and simply pass data through.

## Compatibility

Tested with n8n version X.Y.Z. (Update with your tested version)

## Development

Clone this repository, run `npm install`, and then `npm run build` or `npm run dev`.

## License

MIT
