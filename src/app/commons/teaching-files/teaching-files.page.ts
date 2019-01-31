import { Component, OnInit } from '@angular/core';
import { GetService } from '../../service/get.service';
import { TeachingMaterial } from '../../models/TeachingMaterial';
import { ActivatedRoute } from '@angular/router';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';



@Component({
  selector: 'app-teaching-files',
  templateUrl: './teaching-files.page.html',
  styleUrls: ['./teaching-files.page.scss'],
})
export class TeachingFilesPage implements OnInit {

  files: Array<TeachingMaterial>
  id: string = null;

  constructor(private getService: GetService,
    private route: ActivatedRoute,
    private transfer: FileTransfer,
    private file: File,
    private toastCtrl: ToastController,
    private fileOpener: FileOpener) {
  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.getService.findFileByModule(Number(this.id)).subscribe(files => {
      this.files = files;
      console.log(this.files);
    });
  }


  humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (bytes < thresh) return bytes + ' B';
    var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (bytes >= thresh);
    return bytes.toFixed(1) + ' ' + units[u];
  };

  onDownload(fileId: number, fileName: string, fileType: string) {
    console.log(fileId);
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.getService.downloadFile(fileId);
    fileTransfer.download(url, this.file.externalRootDirectory +
      '/Download/' + fileName).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.presentToastWithOptions(this.file.externalRootDirectory +
          '/Download/' + fileName, fileType);
      }, (error) => {
        console.log(error)
      });
    //window.open(this.getService.downloadFile(fileId), '_blank');
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'File has been downloaded to the Downloads folder.',
      duration: 3000
    });
    toast.present();
  }

  openFile(filePath, fileType){
    console.log(filePath + "--->" + fileType)
    this.fileOpener.open(filePath, fileType)
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error opening file', e));
  }

  async presentToastWithOptions(filePath, fileType) {
    const toast = await this.toastCtrl.create({
      message: 'File has been downloaded to the Downloads folder. Click to Open',
      showCloseButton: true,
      position: 'bottom',
      duration: 3000,
      closeButtonText: 'Open'
    });
    toast.present();
    const dismiss = await toast.onDidDismiss();
    dismiss.data = filePath;
    console.log('Dismissed toast', dismiss);
    if (dismiss.role === 'cancel') {
      this.openFile(filePath, fileType);
    }
  }
}
