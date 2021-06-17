# **<a href="https://investyx.netlify.app/"><img src="https://i.ibb.co/G9MrXrJ/Investyx-H-3c122dde.png" alt="Investyx-H-3c122dde" border="0" /></a>** 


<div align="center"> 
<img src="https://img.icons8.com/color/48/000000/react-native.png"/>
<img src="https://img.icons8.com/color/50/000000/html-5--v1.png"/>
<img src="https://img.icons8.com/color/48/000000/css3.png"/>
<img src="https://img.icons8.com/color/48/000000/javascript.png"/>
<img src="https://img.icons8.com/color/48/000000/bootstrap.png"/>
<img src="https://cdn.icon-icons.com/icons2/2415/PNG/48/jquery_plain_wordmark_logo_icon_146445.png" />

<img src="https://img.icons8.com/color/48/000000/django.png"/>
<img src="https://img.icons8.com/color/48/000000/python.png"/>
<img src="https://img.icons8.com/color/48/000000/tensorflow.png"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Keras_logo.svg/48px-Keras_logo.svg.png"/>

<img src="https://img.icons8.com/fluent/48/000000/mysql-logo.png"/>
<img src="https://img.icons8.com/color/48/000000/postgreesql.png"/>
</div>


## **Description:**

Investyx is a one-stop portal to solve all your financial questions such as when and where to invest using a powerful Machine Learning Algorithm. Investyx contains a variety of products through which an end user can predict how their financial investment would perform over a period of time

There are mainly 4 products

1. **Smart Stox:**
      - A Stock Price Prediction Platform that outputs the predicted price of a selected stock for the next Trading Seession
      - https://smartstox.netlify.app/
2. **Smart Funds:**
      - A Mutual Fund Growth Prediction Platform with a built in SIP Calculator
      - Coming Soon
3. **Smart Case:**
      - A Tool to forecast how the basket of stocks matures over a period of time
      - Coming Soon
4. **Smart Coin:**
      - Similar to Smart Stox except for one tine detail - It predicts Currency Exchanges and Cryptocurrencies
      - Coming Soon

The webapp is completely dynamic and runs without any user interference of any sort. To use a product such as "Smart Stox" the end user must have an active and working Investyx account which can be created at https://investyx.netlify.app/.

The Frontend section is hosted using "Netlify's services" but due to Keras Runtime serving as a limitation, the backend is not hosted. Hence to run the software, follow the following steps:
   
        1. Clone the Repositiory
        
        2. Open the Backend Folder with VSCode / Terminal / Or any text editor of your choice
        
        3. Install the requirements listed in requirements.txt by using  "pip install -r requirements.txt"
        
        4. Open the BackendScripts/mysql_details.py in Edit mode and replace the Host, Username, Password with your MySQL Details
        
        5. Run "python manage.py makemigrations" in the terminal
        
        6. Run "python manage.py migrate" in the terminal
        
        7. Run "python manage.py runserver" in the terminal
        
        8. If there are no errors, you would find a "Started server..." as an output after which you can use Investyx and its services
   
****

## **Technical Details:**

### **Model:**

The Stock Price Prediction Model is built using the Closing Price of a Selected Stock listed on NSE or BSE on a 2 Year Period. Everyday at 5:30pm IST, the latest closing price is appended and the oldest is removed hence creating a rolling 2 year of sorts.

The model is trained for 300 epochs with a batchsize of 128 with the basic idea of the data being used as a time series dataset and hence gives us an accuracy fo 80% when compared to actual closing prices

The selected stock's sentiment is also analysed using a point based system from a bag of words on the 4 latest news which is then scaled to be between 0 and 100 with 50 being its mean

The Model is defined in Backend/BackendScripts/predict.py
        
<br>

### **Web App:**

The Frontend is created using ReactJS from scratch and also uses jQuery, Bootstrap, and various other frameworks and libraries.

The Frontend is hosted on Netlify and hence the user can solely concentrate on locally hosting the Server.

The Products like "Smart Stox" would require an Investyx account to run hence it is advisable for the user to create an account on Investyx after setting the Server up
        
<br>

****

## **Links and Sources:**

Prices and Stock Details:

    https://in.finance.yahoo.com/

News:

    https://economictimes.indiatimes.com/

Active Stocks:

    https://www.moneycontrol.com/

Investyx:

    https://investyx.netlify.app/

Smart Stox:

    https://smartstox.netlify.app/
