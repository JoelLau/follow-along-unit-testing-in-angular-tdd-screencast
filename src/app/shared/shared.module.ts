import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SelectorComponent } from './selector/selector.component';
import { StartsWithPipe } from './starts-with.pipe';

@NgModule({
  declarations: [SelectorComponent, StartsWithPipe],
  imports: [CommonModule, FormsModule],
})
export class SharedModule {}
