import { Module } from "./Module";

export interface TeachingMaterial{
    teachingMaterialId?: number;
    module?: Module;
    doc?: File;
    fileName?: string;
    fileType?: string;
    created?: Date;
    size?: number;
    meanRate?: number;
}