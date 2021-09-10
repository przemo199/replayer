import {ObjectId} from "mongodb";

export interface MediaResource {
  _id: ObjectId;
  resourceId: string;
  privateUrl: string;
  name: string;
  type: string;
  size: number;
}
