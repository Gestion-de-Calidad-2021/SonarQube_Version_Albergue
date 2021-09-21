import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  HostBinding,
} from '@angular/core';
import { FileHandle } from './models/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
@Directive({
  selector: '[appImageDrag]',
})
export class ImageDragDirective {
  @Output('files') files: EventEmitter<FileHandle[]> = new EventEmitter();
  @HostBinding('style.background') public background = '#EEE';
  @HostBinding('style.height') public height = '150px';
  constructor(private sanitizer:DomSanitizer
  ) {}
  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#C5C5C5';
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFFF';
  }
  @HostListener('drop', ['$event']) public async onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eeee';    
    let files: FileHandle[] = [];
    // var data_transfer = evt.dataTransfer ? evt.dataTransfer : new DataTransfer();
    // for (let i = 0; i < data_transfer.files.length; i++) {
    //   const file = data_transfer.files[i];
    //   var url = '';
    //   //const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    //   files.push({
    //     file,
    //     url,
    //   });
    // }
    for (let i = 0; i < evt.dataTransfer!.files.length; i++) {
      const file = evt.dataTransfer!.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );
      files.push({ file, url });
      }

    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
