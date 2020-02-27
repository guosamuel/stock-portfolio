Stock Portfolio
========================

Welcome to Stock Portfolio! This is the back-end portion of this application.

## Description
Stock Portfolio is an application to purchase stocks with a limited amount of cash in your account. All stock purchases are based on the IEX Cloud API. As a user, you will be able to see your list of all your transactions for auditing purposes and if your stocks are doing well to date.

## Framework
Built with [Ruby on Rails](https://rubyonrails.org/)

## Features
***Note:*** These are features of the overall application (i.e., front-end and back-end)

Transactions - Your entire transaction history on the amount of shares purchased with each stock.

Portfolio - Shows a list of all your most recent unique stocks and show if it is performing well based on the current date's opening price.

Interactive Feedback - Messages will appear on the page if the actions the user performed were successful or not.

Auto Login - Automatically logs you back in if you accidentally closed the browser and want to continue from where you left off.

Auto Updates - Whenever a stock is purchase, it will automatically update to your portfolio and your transaction history.

## Installation
1. Fork and clone this repository into your local computer.
2. Navigate to the directory where it was cloned and run the following command: `bundle install`. This will install all the necessary files and gems to run the back end.
3. When the `bundle install` command completes, run the following command: `rails db:create`. This will create a new database table.
4. Run the following command: `rails db:migrate`. This will create the schema for the back end.

## How To Use
To run the back-end, run the following command: `rails s`

***Note:*** For the back end, take note of which port you are running it on. You will need to replace the appropriate URLs in the front end if you choose to run this application locally on your machine.

## Front-End Installation
After successfully installing the back-end, please refer to the [Stock Portfolio Front End repository](https://github.com/guosamuel/stock-portfolio/tree/master/stock-portfolio-front-end) for instructions on how to install the front-end as well as using the application.
