import {ObjectId} from "mongodb";

export interface MediaResource {
  _id: ObjectId;
  privateUrl: string;
  name: string;
  type: string;
  size: number;
}
