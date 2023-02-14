//* this file is necessary to allow .pngs and .jpgs to be imported

declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.png" {
  const path: string;
  export default path;
}