/**
 * BaseContract.js
 * Created by Kevin Li 2/22/18
 */

import { formatMoney } from 'helpers/moneyFormatter';
import BaseAwardRecipient from './BaseAwardRecipient';
import CoreAwardAgency from './CoreAwardAgency';
import BaseContractAdditionalDetails from './BaseContractAdditionalDetails';
import CoreAward from './CoreAward';
import CoreLocation from './CoreLocation';

const BaseContract = Object.create(CoreAward);

BaseContract.populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.piid,
        internalId: data.id,
        category: data.category,
        startDate: data.period_of_performance_start_date,
        endDate: data.period_of_performance_current_end_date
    };
    this.populateCore(coreData);

    const recipient = Object.create(BaseAwardRecipient);
    recipient.populate(data.recipient);
    this.recipient = recipient;

    const placeOfPerformanceData = {
        city: data.place_of_performance.city_name,
        county: data.place_of_performance.county_name,
        stateCode: data.place_of_performance.state_code,
        state: data.place_of_performance.state_name || data.place_of_performance.state_code,
        province: data.place_of_performance.foreign_province,
        zip5: data.place_of_performance.zip5,
        zip4: data.place_of_performance.zip4,
        congressionalDistrict: data.place_of_performance.congressional_code,
        country: data.place_of_performance.country_name,
        countryCode: data.place_of_performance.location_country_code
    };
    const placeOfPerformance = Object.create(CoreLocation);
    placeOfPerformance.populateCore(placeOfPerformanceData);
    this.placeOfPerformance = placeOfPerformance;

    if (data.awarding_agency) {
        const awardingAgencyData = {
            name: data.awarding_agency.toptier_agency && data.awarding_agency.toptier_agency.name,
            subtierName: data.awarding_agency.subtier_agency && data.awarding_agency.subtier_agency.name,
            officeName: data.latest_transaction.contract_data.awarding_office_name || data.latest_transaction.contract_data.awarding_office_code
        };
        const awardingAgency = Object.create(CoreAwardAgency);
        awardingAgency.populateCore(awardingAgencyData);
        this.awardingAgency = awardingAgency;
    }

    if (data.funding_agency) {
        const fundingAgencyData = {
            name: data.funding_agency.toptier_agency && data.funding_agency.toptier_agency.name,
            subtierName: data.funding_agency.subtier_agency && data.funding_agency.subtier_agency.name,
            officeName: data.latest_transaction.contract_data.funding_office_name || data.latest_transaction.contract_data.funding_office_code
        };
        const fundingAgency = Object.create(CoreAwardAgency);
        fundingAgency.populateCore(fundingAgencyData);
        this.fundingAgency = fundingAgency;
    }

    const additionalDetails = Object.create(BaseContractAdditionalDetails);
    additionalDetails.populate(data.latest_transaction.contract_data);
    this.additionalDetails = additionalDetails;

    // populate the contract-specific fields
    this.parentAward = data.parent_award_piid;
    this.description = data.description || '';
    this.type = data.type || '';
    this.typeDescription = data.type_description || '';
    this.pricing = data.type_of_contract_pricing_description || '';
    this._amount = parseFloat(data.base_and_all_options_value) || 0;
    this._ceiling = parseFloat(data.base_and_all_options_value) || 0;
    this._obligation = parseFloat(data.total_obligation) || 0;
};


// getter functions
Object.defineProperty(BaseContract, 'amount', {
    get() {
        return formatMoney(this._amount);
    }
});
Object.defineProperty(BaseContract, 'ceiling', {
    get() {
        return formatMoney(this._ceiling);
    }
});
Object.defineProperty(BaseContract, 'obligation', {
    get() {
        return formatMoney(this._obligation);
    }
});

export default BaseContract;