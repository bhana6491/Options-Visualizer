from flask import Flask, flash, redirect, url_for, render_template, request
from flask_sqlalchemy import SQLAlchemy
import random
import sys
import string
from datetime import timedelta
from scraper import *
app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route("/")
def home():
    #Ressetting all required variables
    expiry_list.clear()
    final_put.clear()
    final_call.clear()
    price.clear()
    return render_template("index.html")

@app.route("/", methods = ["GET", "POST"])
def enter_ticker():
    if request.method == "POST":
        ticker = request.form["ticker"]
        if ticker == "": 
            a("Enter a ticker")
            return redirect(url_for("home"))  
        else:
            if (scrape(ticker) == 1):
                return redirect(url_for("options_table",ticker=ticker))  
            elif (scrape(ticker) == -1):
                flash("No Options for Ticker")
                return redirect(url_for("home"))  
            else:
                flash("Invalid Ticker Symbol")
                return redirect(url_for("home"))  

    else:
        return render_template("index.html")
        


@app.route("/<ticker>", methods = ["GET", "POST"])
def options_table(ticker):

    #Generating the options chain while saving prior user selection
    if request.method == "POST":
        option = request.form
        options = option.to_dict()
        
        for i in range(0, len(expiry_list)):
            if expiry_list[i] == options['expiry']:
                expiry = i

        #Get configurations from user to generate options chain
        if options['strategy'] == 'buy':
            buy = "checked"
            write = "unchecked"
        else:
            buy = "unchecked"
            write = "checked"
        if options['type'] == 'call':
            call = "checked"
            put = "unchecked"
            options_chain = final_call[expiry]
        else:
            call = "unchecked"
            put = "checked"
            options_chain = final_put[expiry]

        
        return render_template("base.html", dates = expiry_list, options_chain = options_chain, ticker = ticker, expiry = expiry, call = call, put = put, buy = buy, write = write, price = price[0])

    else:#on first load, prior to user generating their desired options_chain 
        expiry = 0
        buy = "checked"
        write = "unchecked"
        call = "checked"
        put= "unchecked"
        return render_template("base.html", dates = expiry_list, ticker = ticker, expiry = expiry, call = call, put = put, buy = buy, write = write, price = price[0])


if __name__ == "__main__":
    app.run(threaded = True, debug = True)
