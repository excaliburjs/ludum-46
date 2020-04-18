import sword from '../img/sword.png';

import { Graphics, Resource } from "excalibur";


export const Resources: {[key: string]: Resource<any>} = {
    swordImage: new Graphics.RawImage(sword)
 };