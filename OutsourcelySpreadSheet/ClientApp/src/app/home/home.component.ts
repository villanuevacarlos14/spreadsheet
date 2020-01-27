import { Component, OnInit } from '@angular/core';
import { Column } from '../model/column.model';
import { Row, Cell } from '../model/row.model';
import { SpreadsheetService } from '../service/spreadsheet.service';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  columns: Column[]; 
  rows: Row[];
  constructor(private spreadSheetService: SpreadsheetService)
  {

  }

  ngOnInit()
  {
    this.initializeColumns();
    this.initializeRows();
  }

  initializeRows()
  {
    this.rows = [];
    for (var x = 1; x <= 20; x++) {
      this.rows.push(new Row(x));
    }
  }

  initializeColumns()
  {
    this.columns = [];
    for (var x = 1; x <= 6; x++) {
      this.columns.push(new Column(x));
    }
  }

  addColumn() {
    var colId = this.columns.length + 1;
    this.columns.push(new Column(colId))
  }

  addRow()
  {
    var rowId = this.rows.length + 1;
    this.rows.push(new Row(rowId));
  }

  changeValue($event,rowIndex: number, columnIndex: number)
  {
    var cellData = $event.target.value;

    if (this.rows[rowIndex].Values[columnIndex] == undefined) {
      var id = CommonService.toLetters(columnIndex + 1) + (rowIndex+1);
      this.rows[rowIndex].Values[columnIndex] = new Cell(id,cellData, false, cellData);
    } else
    {
      this.rows[rowIndex].Values[columnIndex].name = cellData;
    }
  
    var value = this.rows[rowIndex].Values[columnIndex];

    if (value != undefined)
    {
      var res = value.name.charAt(0);
      if (res == '=') {
        var data = value.name.substr(1);

        this.rows[rowIndex].Values[columnIndex].isFormula = true;
        this.rows[rowIndex].Values[columnIndex].formula = data;

        var splitData = data.split(/[+-/*()]/);
        
        splitData.forEach(x => {
          var filteredRows = this.rows.filter(r => r.Values.some(v => v.id.toUpperCase() == x.toUpperCase())).map(r => r.Values)[0];
          if (filteredRows != undefined || filteredRows != null)
          {
            var filteredCells = filteredRows.filter(v => v.id.toUpperCase() == x.toUpperCase())[0];
            if (filteredCells != null)
            {
              data = data.replace(x, filteredCells.name);

            }
          }
        });

        this.spreadSheetService.evaluateValue({ value: data }).subscribe(result => {

          this.rows[rowIndex].Values[columnIndex].name = result;
        }, error => {
          this.rows[rowIndex].Values[columnIndex].name = "Error";
        });
      } else
      {
        this.rows[rowIndex].Values[columnIndex].isFormula = false;
      }
    }
   
  }

  onFocus(rowIndex: number, columnIndex: number)
  {
    if (this.rows[rowIndex].Values[columnIndex]!=undefined && this.rows[rowIndex].Values[columnIndex].isFormula)
    {
      this.rows[rowIndex].Values[columnIndex].name = "="+this.rows[rowIndex].Values[columnIndex].formula;
    }
  }
}


