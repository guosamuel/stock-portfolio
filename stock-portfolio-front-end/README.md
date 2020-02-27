Stock Portfolio
========================

Welcome to Stock Portfolio! This is the front-end portion of this application.

## Description
Stock Portfolio is an application to purchase stocks with a limited amount of cash in your account. All stock purchases are based on the IEX Cloud API. As a user, you will be able to see your list of all your transactions for auditing purposes and if your stocks are doing well to date.

## Framework
Built with [React](https://reactjs.org/)

## Features
***Note:*** These are features of the overall application (i.e., front-end and back-end)

Transactions - Your entire transaction history on the amount of shares purchased with each stock.

Portfolio - Shows a list of all your most recent unique stocks and show if it is performing well based on the current date's opening price.

Interactive Feedback - Messages will appear on the page if the actions the user performed were successful or not.

Auto Login - Automatically logs you back in if you accidentally closed the browser and want to continue from where you left off.

Auto Updates - Whenever a stock is purchase, it will automatically update to your portfolio and your transaction history.

## Installation
1. Install the [Stock Portfolio Back-End](https://github.com/guosamuel/stock-portfolio/tree/master/stock-portfolio-back-end) server. Instructions will be in the repository's ReadMe.
2. Fork and clone this repository into your local computer.
3. Navigate to the directory where it was cloned and run the following command: `npm install` (This may take a few minutes.)

## How To Use
1. Before starting the front-end, ensure that the back-end server is running. Change the appropriate URLs where so that the fetch requests routes to your local back-end server. The appropriate URLs are the ones that do not require "TOKEN" in its URL.

2. To run the front-end, run the following command: `npm start`

3. The first page should look like the following picture below:

![Log In Page](https://github.com/guosamuel/stock-portfolio/blob/master/stock-portfolio-front-end/src/ReadMePhotos/1.%20Login%20Page.png)

4. You can either sign up as a new user or log in as an existing user.

Once you log in, the page should now look like the following picture below:

![Portfolio Page](https://github.com/guosamuel/stock-portfolio/blob/master/stock-portfolio-front-end/src/ReadMePhotos/2.%20Portfolio%20Page.png)

The Portfolio page consists of two major parts of the application, how well your portfolio is doing and a purchase form to purchase new stocks.

5. On the left hand side of the page, it will show all of the different stocks you've purchased and the font will be color coded.

Red - the purchase price you bought it at is less than the opening day price

Green - the purchase price you bought it at is greater than the opening day

Grey - the purchase price you bought it at is the same as the opening day price.

Black - either not enough information or there is potentially an issue with the server.

6. On the right hand side of the page is the purchase form to purchase more stocks.

![Purchase Form](https://github.com/guosamuel/stock-portfolio/blob/master/stock-portfolio-front-end/src/ReadMePhotos/3.%20Purchase%20Form.png)

There are only two pieces of information you need to fill out: the ticker and the number of shares.

The ticker is the abbreviation of letters that represents the company of the stock that you would like to purchase from.

The number of share must be a whole number. If it is 0 or left blank, the purchase button will be disabled as shown by the picture below.

![Purchase Form Button Disabled](https://github.com/guosamuel/stock-portfolio/blob/master/stock-portfolio-front-end/src/ReadMePhotos/4.%20Purchase%20Form%20Button%20Disabled.png)

7. Once the information for the purchase form is completed properly, you may selected to purchase the stocks. You will see a message on top of the form if the purchase was successful, unsuccessful, or if there was an error with the server. The picture below shows an example of when a successful purchase was made.

![Successful Purchase](https://github.com/guosamuel/stock-portfolio/blob/master/stock-portfolio-front-end/src/ReadMePhotos/5.%20Successful%20Purchase.png)

8. Notice after the successful purchase, the left side of was page was automatically populated. This ties back into point number 5 that was mentioned earlier.

9. If you click on the Transactions link at the top right corner of the page, it will bring you your transactions history. It should look like the following picture below.

![Transaction History](https://github.com/guosamuel/stock-portfolio/blob/master/stock-portfolio-front-end/src/ReadMePhotos/6.%20Transaction%20History.png)

From the top to the bottom, it provides a list of all your transactions from least to most recent.

## API

All information in regards to stocks for this application has been suppled by ![IEX Cloud](https://iexcloud.io).
