# ProServe Portfolio Project

(v.0.2.9)
Last Updated: 2019/07/28

## Live links

* From CloudFront (dev-branch): <https://d1kwrbspoyxfwl.cloudfront.net/>
* From Deployment Pipeline (master-branch): <https://master.d2mlzdi9cwhxfg.amplifyapp.com/>

## Progress: (Back-end)

* [x] Project set-up:
  * [x] CodeCommit
  * [x] CloudFront
  * [x] Deployment pipeline
* [x] Offerings data saved to DynamoDB
  * [x] Converted Offerings.csv into DynamoDB entries
  * [x] Create Geological Strength Index (GSI)
* [x] Lambda function for retrieving data from DynamoDB through API Gateway
* [x] API endpoint for offerings
  * [x] Enable parameter querying through API Gateway
* [x] Salesforce data saved to DynamoDB
* [x] Lambda function to generate suggestions
* [x] API endpoint for suggestions
* [ ] Login UI done, yet to add SSO
  * [x] Temp auth: `awsintern` | `proserveportfolio`

## Progress: (Front-end)

* [x] Project set-up:
  * [x] App structure / hierarchy
  * [x] ReactDOM & Webpack configs
  * [x] Router & Switch
  * [x] Styling: SCSS, Styled-Components, Bootstrap
  * [x] Assets: logos, backgrounds, constants, utilities, colors
  * [x] Storybook
* [x] Login page (UI only)
* [x] 404 page
* [x] Navigation Bar
* [x] Offerings page
  * [x] Fetch offerings data from API
  * [x] Render Cards as components
    * [x] Card component
  * [x] Filtering & Sorting
    * [x] Checkbox component
    * [x] FilterForm component
    * [x] FilterBar component
  * [ ] Offering expanded view
    * [x] Modal component
      * [x] Logic & callback functions
      * [ ] UI
* [x] Loading Spinner component
* [ ] Customer page
  * [x] Added tables
  * [x] Auto-suggestion for customer name
  * [x] Retrieve customer data from Salesforce DynamoDB
  * [ ] beautiful-skill-tree view

### To-do

See [Trello board](https://trello.com/b/RneQbm70/proserve-portfolio) for details.
