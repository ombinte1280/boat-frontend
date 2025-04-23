import { Pipe, PipeTransform } from '@angular/core';
import {CategoryItems} from '../../core/models/category.item';

@Pipe({
  name: 'categoryName',
  standalone: true
})
export class CategoryNamePipe implements PipeTransform {

  transform(code: string): string {
    const found = CategoryItems.find(item => item.code === code);
    return found ? found.name : code;
  }
}
