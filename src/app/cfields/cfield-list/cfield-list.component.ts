import { Component, OnInit } from '@angular/core';
import { Cfield } from '../cfield';
import { CfieldService } from '../cfield.service';
import { OfferService } from '../../offers/offer.service';
import { CfieldDetailsComponent } from '../cfield-details/cfield-details.component';

@Component({
  selector: 'cfield-list',
  templateUrl: './cfield-list.component.html',
  styleUrls: ['./cfield-list.component.css'],
  providers: [CfieldService,OfferService]
})

export class CfieldListComponent implements OnInit {

  cfields: Cfield[]
  selectedCfield: Cfield

  constructor(private cfieldService: CfieldService) { }

  ngOnInit() {
     this.cfieldService
      .getCfields()
      .then((cfields: Cfield[]) => {
        //this.cfields = cfields.map((cfield) => {
          //return cfield;
        //});
        this.cfields = cfields;
      });
  }

  private getIndexOfCfield = (cfieldId: String) => {
    return this.cfields.findIndex((cfield) => {
      return cfield._id === cfieldId;
    });
  }

  selectCfield(cfield: Cfield) {
    this.selectedCfield = cfield
  }

  createNewCfield() {
    var cfield: Cfield = {
      name: 'Custom Field _',
      description: '',
      type: '',
      key: '',
      values: [
        { value: '', label: '' }
      ]
    };

    // By default, a newly-created cfield will have the selected state.
    this.selectCfield(cfield);
  }

  deleteCfield = (cfieldId: String) => {
    var idx = this.getIndexOfCfield(cfieldId);
    if (idx !== -1) {
      this.cfields.splice(idx, 1);
      this.selectCfield(null);
    }
    return this.cfields;
  }

  addCfield = (cfield: Cfield) => {
    this.cfields.push(cfield);
    this.selectCfield(cfield);
    return this.cfields;
  }

  updateCfield = (cfield: Cfield) => {
    var idx = this.getIndexOfCfield(cfield._id);
    if (idx !== -1) {
      this.cfields[idx] = cfield;
      this.selectCfield(cfield);
    }
    return this.cfields;
  }
}