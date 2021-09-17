import {MediaResource} from "./interfaces";

const getReadableDate = (resource: MediaResource): string => {
  const date = (new Date(parseInt(resource._id.toString().substring(0,8), 16) * 1000)).toISOString();
  return date.substring(0, 19).replace(/[A-Z]/, " ").replaceAll("-", "/");
};

export {getReadableDate};
