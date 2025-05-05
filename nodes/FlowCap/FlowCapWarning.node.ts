import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class FlowCapWarning implements INodeType {
  description: INodeTypeDescription = {
    displayName: '⚠ Warning',
    name: 'flowCapWarning',
    icon: 'file:FlowCapWarning.svg',
    group: ['transform'],
    version: 1,
    description: 'Flags risky or temporary sections of a workflow.',
    defaults: {
      name: '⚠ Warning',
      color: '#ffcc00',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [], // No parameters needed
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Functionally identical to NoOp: Pass through input data unchanged
    return [this.getInputData()];
  }
}
