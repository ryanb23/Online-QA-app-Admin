import { Component, Input } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { Cfield } from '../cfield';
import { CfieldService } from '../cfield.service';
import { Offer } from '../../offers/offer';
import { OfferService } from '../../offers/offer.service';

@Component({
  selector: 'cfield-details',
  templateUrl: './cfield-details.component.html',
  styleUrls: ['./cfield-details.component.css']
})

export class CfieldDetailsComponent {

  types =  [ { value:'', label: '' }, { value:'radio', label:'Radio' }, { value:'checkbox', label:'Check Box' }, { value:'select', label:'Select' } ]

  @Input()
  cfield: Cfield;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private cfieldService: CfieldService, private offerService: OfferService) {}

  addCFValue() {
    const value = { value: '', label: '' };
    this.cfield.values.push(value);
  }

  removeCFValue(i: number) {
    this.cfield.values.splice(i,1);
  }

  createCfield(cfield: Cfield) {
    let that = this;
    this.cfieldService.createCfield(cfield).then((newCfield: Cfield) => {
      that.offerService.getOffers().then((offers: Offer[]) => {
        offers.map((offer) => {
          let t_offer = Object.assign({},offer);
          t_offer.cfields.push({ cfield_id: newCfield._id, use: false });
          that.offerService.updateOffer(t_offer);
        })
      });

      this.createHandler(newCfield);
    });
  }

  updateCfield(cfield: Cfield): void {
    this.cfieldService.updateCfield(cfield).then((updatedCfield: Cfield) => {
      this.updateHandler(updatedCfield);
    });
  }

  deleteCfield(cfieldId: String): void {
    let that = this;
    this.cfieldService.deleteCfield(cfieldId).then((deletedCfieldId: String) => {
      that.offerService.getOffers().then((offers: Offer[]) => {
        offers.map((offer) => {
          let t_offer = Object.assign({},offer);
          t_offer.cfields = t_offer.cfields.filter((cfield) => {
            return cfield.cfield_id!=deletedCfieldId ? cfield : false;
          })
          that.offerService.updateOffer(t_offer);
        })
      });
      this.deleteHandler(deletedCfieldId);
    });
  }
}
