import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getChar'
})
export class GetCharPipe implements PipeTransform {

  transform(value: unknown, position: unknown): unknown {
    if (typeof value === 'string' && typeof position === 'number') {
      if (position && position < value.length) {
        return value.charAt(position);
      } else {
        return value.charAt(0);
      }
    } else {
      return ""
    }
  }
}
