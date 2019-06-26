import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';

import { DataItem } from 'app/model';
import { DataService } from 'app/services/data';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  $items: Subject<DataItem[]> = new BehaviorSubject<DataItem[]>([]);
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadAllItems();
  }

  loadAllItems() {
    this.route.params.subscribe(params => {
      this.dataService.listItems().subscribe(items => {
        this.$items.next(items);
      });
    });
  }

  onSelectItem(id: number) {
    this.router.navigate(['/items', 'details', id]);
  }

  onNewItem() {
    this.router.navigate(['new']);
  }


  searchFilter(searchValue) {
    console.log(searchValue);
    if (searchValue != "") {


      //Parse the input into a number
      var idNumber: number = +searchValue;

      //Getting the item with the id
      this.dataService.getItem(idNumber).subscribe(item => {

        //Delete all items and show only the founded
        var itemsaux = [];
        itemsaux.push(item);
        this.$items.next(itemsaux);

      });

    } else {
      //If the input is empty then load all items
      this.loadAllItems();
    }
  }


}
