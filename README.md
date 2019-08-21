# ProServe Portfolio Project

(v.0.2.9)
Last Updated: 2019/08/21

## Live links

- From CloudFront (dev-branch): <https://d1kwrbspoyxfwl.cloudfront.net/>
- From Deployment Pipeline (master-branch): <https://master.d2mlzdi9cwhxfg.amplifyapp.com/>

### Back-end

### Project Overview

> Project set-up:
>
> > CodeCommit - repository
> > CloudFront - static web hosting
> > Deployment pipeline - amplify build pipeline, draws commits and continuously builds from master

#### Data Layer

- [x] Database structure configured in DynamoDB
  - [x] Offerings Table
    - [x] Create Global Secondary indices (GSI)
      - [x] Short-Index - Returns only data necessary for short cards. Performance impact: data retrieval 2x as fast as full table scan.
      - [x] GSP-Index - Allows querying of the offerings table by GSP rather than offering name.
  - [x] OfferingSales Table
    - [x] Create Global Secondary indices (GSI)
      - [x] customer_name-index - executes rapid search on Customer_name to only retrieve customer name. This index enables auto-filled form suggestions for choosing the customer name.

#### Compute Layer

- [x] Lambda Compute Model
- [x] Lambda function for retrieving data from DynamoDB through API Gateway

#### API Layer

- [x] /api

  - [x] /customer
    - [x] /match
      - [x] `get`
      - [x] `options`
    - [x] /predict
      - [x] `get`
      - [x] `options`
  - [x] /db
    - [x] /query
      - [x] `get`
      - [x] `options`

- [x] API endpoint for offerings
  - [x] Enable parameter querying through API Gateway
- [x] Lambda function to generate suggestions
- [x] API endpoint for suggestions
- [ ] Login UI done, yet to add SSO
  - [x] Temp auth: `awsintern` | `proserveportfolio`

## Progress: (Front-end)

- [x] Project set-up:
  - [x] App structure / hierarchy
  - [x] ReactDOM & Webpack configs
  - [x] Router & Switch
  - [x] Styling: SCSS, Styled-Components, Bootstrap
  - [x] Assets: logos, backgrounds, constants, utilities, colors
  - [x] Storybook
- [x] Login page (UI only)
- [x] 404 page
- [x] Navigation Bar
- [x] Offerings page
  - [x] Fetch offerings data from API
  - [x] Render Cards as components
    - [x] Card component
  - [x] Filtering & Sorting
    - [x] Checkbox component
    - [x] FilterForm component
    - [x] FilterBar component
  - [x] Offering expanded view
    - [x] Modal component
      - [x] Logic & callback functions
      - [x] UI
- [x] Loading Spinner component
- [x] Customer page
  - [x] Added tables
  - [x] Modal cards expand on Suggestion click
  - [x] Auto-suggestion for customer name
  - [x] Retrieve customer data from Salesforce DynamoDB
- [x] Relations editor page

### To-do

See [Trello board](https://trello.com/b/RneQbm70/proserve-portfolio) for details.
