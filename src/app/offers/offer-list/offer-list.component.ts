import { Component, OnInit } from '@angular/core';
import { Offer } from '../offer';
import { Cfield } from '../../cfields/cfield';
import { OfferService } from '../offer.service';
import { CfieldService } from '../../cfields/cfield.service';
import { OfferDetailsComponent } from '../offer-details/offer-details.component';

@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
  providers: [OfferService, CfieldService]
})

export class OfferListComponent implements OnInit {

  offers: Offer[]
  cfields: Cfield[]
  selectedOffer: Offer

  constructor(private offerService: OfferService, private cfieldService: CfieldService) { }

  ngOnInit() {
     this.offerService
      .getOffers()
      .then((offers: Offer[]) => {
        this.offers = offers.map((offer) => {
          if (!offer.checks) {
            offer.checks = {
              check_gender1: {
              	use: false,
              	cond: ''
              },
              check_gender2: {
              	use: false,
              	cond: ''
              },
              check_age: {
                use: false,
                cond: '',
                val: 0
              }
            }
          } else {
          	if (!offer.checks.check_gender1) {
          	  offer.checks.check_gender1 = {
          	    use: false,
          	    cond: ''
          	  }
          	}
          	if (!offer.checks.check_gender2) {
          	  offer.checks.check_gender2 = {
          	    use: false,
          	    cond: ''
          	  }
          	}
          	if (!offer.checks.check_age) {
          	  offer.checks.check_age = {
          	    use: false,
          	    cond: '',
          	    val: 0
          	  }
          	}
          }
          if (!offer.preqst) {
            offer.preqst = {
              description: '',
              type: '',
              key: '',
              primaryValue: '',
              values: [ { value: '', label: '' }]
            };
          }
          return offer;
        });
      });
    this.cfieldService
      .getCfields()
      .then((cfields: Cfield[]) => {
        this.cfields = cfields.map((cfield) => {
          return cfield;
        })
      });
  }

  private getIndexOfOffer = (offerId: String) => {
    return this.offers.findIndex((offer) => {
      return offer._id === offerId;
    });
  }

  selectOffer(offer: Offer) {
    this.selectedOffer = offer
  }

  createNewOffer() {
    var offer: Offer = {
      name: 'New Offer _',
      url: '',
      img_url: '',
      description: '',
      checks: {
        check_gender1: {
          use: false,
          cond: ''
        },
        check_gender2: {
          use: false,
          cond: ''
        },
        check_age: {
          use: false,
          cond: '',
          val: 0
        }
      },
      preqst: {
        type: '',
        key: '',
        description: '',
        primaryValue: '',
        values: [
          { value: '', label: '' }
        ]
      },
      cfields: []
    };
    this.cfields.forEach((cfield) => {
      offer.cfields.push({ cfield_id:cfield._id, use:false});
    });

    //console.log(offer);
    // By default, a newly-created offer will have the selected state.
    this.selectOffer(offer);
  }

  deleteOffer = (offerId: String) => {
    var idx = this.getIndexOfOffer(offerId);
    if (idx !== -1) {
      this.offers.splice(idx, 1);
      this.selectOffer(null);
    }
    return this.offers;
  }

  addOffer = (offer: Offer) => {
    this.offers.push(offer);
    this.selectOffer(offer);
    return this.offers;
  }

  updateOffer = (offer: Offer) => {
    var idx = this.getIndexOfOffer(offer._id);
    if (idx !== -1) {
      this.offers[idx] = offer;
      this.selectOffer(offer);
    }
    return this.offers;
  }
}