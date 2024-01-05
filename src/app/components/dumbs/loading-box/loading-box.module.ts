import { CommonModule } from '@angular/common';
import { LoadingBoxComponent } from './loading-box.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoadingBoxComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingBoxComponent],
})
export class LoadingBoxModule {}
