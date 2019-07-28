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
 * Returns .
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
export function isOfferingMatchOfAllFilters(offering, filters) {

  if (filters.OFFERING_TYPE[offering.offering_maturity_level] === true
    && filters.MATURITY_LEVEL[offering.offering_type] === true
    && filters.GSP_INDUSTRYVERTICALS[offering.gsp_vertical] === true) {
    return true;
  }

  return false;

}