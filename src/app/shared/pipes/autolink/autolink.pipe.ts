import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autolink'
})
export class AutolinkPipe implements PipeTransform {

  constructor() {}

  escapeHtml(unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  transform(value: string, args?: any): string {
    const pattern = new RegExp(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/, 'gi');
    if (!value.match(pattern)) {
      return this.escapeHtml(value);
    }
    const escaped: string = this.escapeHtml(value);
    return escaped.replace(pattern, `<a href='$1' target='_blank'>$1</a>`);
  }

}
