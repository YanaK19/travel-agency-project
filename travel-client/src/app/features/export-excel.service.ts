import { Injectable } from '@angular/core';
import * as xlsx from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  exportToExcel(jsonData, fileName) {
    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(jsonData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, fileName);
    xlsx.writeFile(wb, fileName + '.xlsx');
  }
}
