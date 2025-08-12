import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class FlowCapDone implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Done',
    name: 'flowCapDone',
    icon: 'file:FlowCapDone.svg',
    group: ['transform'],
    version: 1,
    description: 'Marks successful completion of a workflow branch.',
    defaults: {
      name: 'Done',
      color: '#00cc66',
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
