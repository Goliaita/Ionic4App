import { Module } from "./Module";

export interface TeachingMaterial{
    teachingMaterialId?: number;
    module?: Module;
    doc?: File;
    fileName?: string;
    fileType?: string;
    created?: String;
    size?: number;
}


export     function   humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(bytes < thresh) return bytes + ' B';
    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(bytes >= thresh);
    return bytes.toFixed(1)+' '+units[u];
};