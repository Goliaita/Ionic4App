import { Component, OnInit } from '@angular/core';
import { GetService } from '../../service/get.service';
import { TeachingMaterial } from '../../models/TeachingMaterial';
import { ActivatedRoute } from '@angular/router';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ProfessorHomePage } from '../../professor/professor-home/professor-home.page';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-teaching-files',
  templateUrl: './teaching-files.page.html',
  styleUrls: ['./teaching-files.page.scss'],
})

export class TeachingFilesPage implements OnInit {

  files: Array<TeachingMaterial>
  id: string = null;
  showRateId: number = null;
  studentUser: boolean = false;
  dict = [];

  constructor(private getService: GetService,
    private route: ActivatedRoute,
    private transfer: FileTransfer,
    private file: File,
    private toastCtrl: ToastController,
    private fileOpener: FileOpener,
    private alertController: AlertController,
    private authService: AuthService) {
  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    

    this.getService.findFileByModule(Number(this.id)).subscribe(files => {
      this.files = files;
      console.log(this.files);
      if (this.authService.getToken('token') == '"student"'){
        this.studentUser = true;
      } else {
        this.files.forEach(file => {
          this.getService.findRatingByTMId(file.teachingMaterialId).subscribe(ratings =>{
            if (ratings != null){
              var sum: number = 0;
              ratings.forEach(rating => {
                sum = sum + Number(rating.rate);
              });
              var average = sum / ratings.length;
              file.meanRate = average;
              //this.dict[file.teachingMaterialId] = average;
               this.dict.push({
                 file: file,
                id: file.teachingMaterialId,
                mean: average
              });  
            }
          });
        });
      }
    });
  }

  onRate(teachingMaterialId) {
    if (this.showRateId === teachingMaterialId)
      this.showRateId = null;
    else
      this.showRateId = teachingMaterialId;
  };


prova(){
  console.log(this.dict)

}
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
  };



  openFile(filePath, fileType) {
    this.fileOpener.open(filePath, fileType)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
  };

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
    };
  };

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
}
