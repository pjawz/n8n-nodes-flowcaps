import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class FlowCapEnd implements INodeType {
  description: INodeTypeDescription = {
    displayName: '🏁 End',
    name: 'flowCapEnd',
    icon: 'file:FlowCapEnd.svg',
    group: ['transform'],
    version: 1,
    description: 'Indicates final end-point of a workflow.',
    defaults: {
      name: 'End',
      color: '#555555',
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
