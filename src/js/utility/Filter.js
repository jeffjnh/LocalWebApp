/*
 * TODO :
 * Decide how we want to do filter,
 *   (A && B && C) or (A || B || C)
 */

/*
 * Called by Offerings.js in appendDataToCards().
 * Param:
 *  - data[] of all offerings fetched from API,
 *  - filters = this.state.filters containing all filtering categories.
 * For each offering, check in isOfferingMatchFilter()
 * Returns [] of objects that matches with the filter.
 */
export function filterOfferings(data, filters) {
  return data.filter((offering) => {
    return isOfferingMatchOfAnyFilters(offering, filters);
  });
}

/*
 * Offerings are filtered by (A || B || C),
 * Returns:
 *  - true: offering matches one of the checkboxes in ANY filtering category
 *  - false: offering matches none of the checkboxes in ALL of the filtering category
 */
export function isOfferingMatchOfAnyFilters(offering, filters) {

  // console.log(offering.offering_type);
  // console.log(offering.offering_maturity_level);
  // console.log(offering.gsp_vertical);

  if (filters.OFFERING_TYPE[offering.offering_type] === true) {
    // console.log('true');
    return true;
  }

  if (filters.MATURITY_LEVEL[offering.offering_maturity_level] === true) {
    // console.log('true');
    return true;
  }

  if (filters.GSP_INDUSTRYVERTICALS[offering.gsp_vertical] === true) {
    // console.log('true');
    return true;
  }

  // console.log('false');
  return false;

}

/*
 * Offerings are filtered by (A && B && C),
 * Returns:
 *  - true: offering matches ALL checkboxes in ALL filtering categories
 *  - false: offering is NOT a perfect match of ALL checkboxes in ALL filtering categories
 */
// export function isOfferingMatchOfAllFilters(testingOffering, testingFilters) {
export function isOfferingMatchOfAllFilters(offering, filters) {

  // console.log(offering.offering_maturity_level + ' ' + offering.gsp_vertical + ' ' + offering.offering_type);
  // console.log(filters);

  if (filters.MATURITY_LEVEL[offering.offering_maturity_level] === true
    && filters.OFFERING_TYPE[offering.offering_type] === true
    && filters.GSP_INDUSTRYVERTICALS[offering.gsp_vertical] === true) {
    // console.log('true');
    return true;
  }

  // console.log('false');
  return false;

}

// const testingOffering = {
//   "offering_name": "Summarization, Keywords and Classification of Documents using Deep Learning on AWS",
//   "delivery_kit": "https://w.amazon.com/bin/view/AWS_CAF/Platform/KnowledgeSummary/",
//   "wiki_link": "https://w.amazon.com/bin/view/AWS/Teams/Proserve/ETIP/AI",
//   "practice_group": "ETIP",
//   "offering_description": "This engagement describes how to build a production-ready serverless document management system utilizing custom Machine Learning algorithms and AWS Machine Learning services. Key information is analyzed, summarized and displayed so that the time it takes users to review or search documents is significantly reduced and productivity increases as a result.",
//   "offering_maturity_level": "3",
//   "capability": "AI/ML",
//   "offering_type": "Launch Offering",
//   "gsp_vertical": "AI",
//   "owner": "Charles Frenzel, Josiah Davis",
//   "caf_perspective": "Platform"
// }

// const testingFilters = {
//   OFFERING_TYPE: {
//     "Launch Offering": true,
//   },
//   MATURITY_LEVEL: {
//     "3": true,
//   },
//   GSP_INDUSTRYVERTICALS: {
//     "AI": true,
//   }
// }
