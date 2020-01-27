import { DataType } from './DataType';
import { UpdateType } from '../model/UpdateType';

export interface PropertyDefinition {
  documentation?: string;
  name: string;
  required?: boolean;
  type: DataType;
  updateType?: UpdateType;
}
