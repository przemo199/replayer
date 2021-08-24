import {ObjectId} from "mongodb";

export interface Resource {
  _id: ObjectId;
  privateUrl: string;
  name: string;
  type: string;
  size: number;
}
