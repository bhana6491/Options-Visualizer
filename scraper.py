from bs4 import BeautifulSoup
import pandas as pd
from selenium import webdriver 
import time  
from boltons import iterutils
import re
import requests

final_call = []
final_put =[]
expiry_list = []
price = []
def scrape(ticker):

    url = "https://www.marketwatch.com/investing/stock/" + ticker +  "/options"
    page = requests.get(url)
    if (page.url == url):

        soup = BeautifulSoup(page.content, "html.parser")

        no_data = soup.find_all('p', class_ = "secondary")

        print(no_data[1].string)

        for sentence in no_data:
            if sentence.string == "No Data Available":
                return -1
        

        find = soup.find("bg-quote", class_ = "value")
        price.clear()
        price.append(find.string)

        data_list = []

        elements = soup.find_all("table", class_ = "table table--overflow")
        

        num_expirations = len(elements)

        for i in range (0, num_expirations):
            date = elements[i].find("span", class_ = "text")

            expiry_list.append((date.string)[7:])
            current_price = elements[i].find("tr", class_ = "table__row current-price")
            current_price["class"] = "Avoid scan"
            for row in elements[i].find_all( "tbody", class_= 'table__body'):
                for point in elements[i].find_all( "tr", class_= 'table__row'):
                    for col in point.find_all("td"):
                        for points in col.find_all("div", "option__cell"):
                            data_list.append(points.string)
            final_list = []
            temp_list =[]
            y = 0

            final_list = iterutils.chunked(data_list, 15)#Splits list into proper sub sections

            for i in final_list:
                for d in range(0,len(i)):
                    if (i[d] is None):
                        i[d] = "NA"
                        
            temp_call_dict = []
            temp_put_dict = []
            temp_dict = []

            for option_data in range(0, len(final_list)):
                temp_dict = [final_list[option_data][0],final_list[option_data][2], 
                                                        final_list[option_data][3], 
                                                        final_list[option_data][4], 
                                                        final_list[option_data][5], 
                                                        final_list[option_data][6], 
                                                        final_list[option_data][7]]
                temp_call_dict.append(temp_dict)
                temp_dict = []
                temp_dict= [final_list[option_data][0],final_list[option_data][9], 
                                                        final_list[option_data][10], 
                                                        final_list[option_data][11], 
                                                        final_list[option_data][12], 
                                                        final_list[option_data][13], 
                                                        final_list[option_data][13]]
                temp_put_dict.append(temp_dict)
                temp_dict = []


            final_put.append(temp_put_dict)
            final_call.append(temp_call_dict)
                 
            data_list.clear()
        return 1
    else:
        return 0

if __name__ == "__main__":
    scraper.py