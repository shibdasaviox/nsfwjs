/// <reference types="node" />
import * as tf from "@tensorflow/tfjs";
import { NSFW_CLASSES } from "./nsfw_classes";
export type frameResult = {
    index: number;
    totalFrames: number;
    predictions: Array<predictionType>;
    image: HTMLCanvasElement | ImageData;
};
export type classifyConfig = {
    topk?: number;
    fps?: number;
    onFrame?: (result: frameResult) => any;
};
interface nsfwjsOptions {
    size?: number;
    type?: string;
}
export type predictionType = {
    className: typeof NSFW_CLASSES[keyof typeof NSFW_CLASSES];
    probability: number;
};
export declare function load(base?: string, options?: nsfwjsOptions): Promise<NSFWJS>;
interface IOHandler {
    load: () => any;
}
export declare class NSFWJS {
    endpoints: string[];
    model: tf.LayersModel | tf.GraphModel;
    private options;
    private pathOrIOHandler;
    private intermediateModels;
    private normalizationOffset;
    constructor(modelPathBaseOrIOHandler: string | IOHandler, options: nsfwjsOptions);
    load(): Promise<void>;
    infer(img: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, endpoint?: string): tf.Tensor;
    classify(img: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, topk?: number): Promise<Array<predictionType>>;
    classifyGif(gif: HTMLImageElement | Buffer, config?: classifyConfig): Promise<Array<Array<predictionType>>>;
}
export {};
