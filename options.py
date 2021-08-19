from flask import Flask, flash, redirect, url_for, render_template, request, session
from flask_sqlalchemy import SQLAlchemy
import random
import sys
import string
from datetime import timedelta
from scraper import *
app = Flask(__name__)
app.secret_key = "A42n32p32das"# Key required for sessions

@app.route("/")
def home():
    expiry_list.clear()
    final_put.clear()
    final_call.clear()
    return render_template("index.html")

@app.route("/", methods = ["GET", "POST"])
def posted():
    if request.method == "POST":
        ticker = request.form["ticker"]
        if ticker == "": #Gets the data that was put into the input box
            flash("Enter a ticker")
            return redirect(url_for("home"))  
        else:
            if (scrape(ticker) == 1):
                session["ticker"] = ticker #Using dictionary to add a new key-value pair
                return redirect(url_for("table"))  
            elif (scrape(ticker) == -1):
                flash("No Options for Ticker")
                return redirect(url_for("home"))  
            else:
                flash("Invalid Ticker Symbol")
                return redirect(url_for("home"))  

    else:
        return render_template("index.html")
        


@app.route("/main", methods = ["GET", "POST"])
def table():
    ticker = session["ticker"]
    ticker_price = price[0]

    if request.method == "POST":
        option = request.form
        options = option.to_dict()
        

        for i in range(0, len(expiry_list)):
            if expiry_list[i] == options['exampleRadios']:
                expiry = i

        if options['exampleRadios3'] == 'strat-option1':
            strat1 = "checked"
            strat2 = "unchecked"
        else:
            strat1 = "unchecked"
            strat2 = "checked"
        if options['exampleRadios2'] == 'type-option1':
            type1 = "checked"
            type2 = "unchecked"
            ticker_dict = final_call[expiry]
        else:
            ticker_dict = final_put[expiry]
            type1 = "unchecked"
            type2 = "checked"
        
        return render_template("base.html", dates = expiry_list, ticker_dict = ticker_dict, ticker = ticker, expiry = expiry, type1 = type1, type2 = type2, strat1 = strat1, strat2 = strat2, price = ticker_price)

    else:
        expiry = 0
        type1 = "checked"
        type2 = "unchecked"
        strat1 = "checked"
        strat2= "unchecked"
        return render_template("base.html", dates = expiry_list, ticker = ticker, expiry = expiry, type1 = type1, type2 = type2, strat1 = strat1, strat2 = strat2, price = ticker_price)


if __name__ == "__main__":
    app.run(threaded = True, debug = True)
