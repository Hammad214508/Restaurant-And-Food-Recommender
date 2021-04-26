
# Restaurant and Food Recommender

  

## Overview

  

This is a full featured web application that can help users decide where and what to it based on their preferences and dietarity requirements. It uses Machine Learning techniques such as Collaborative Filtering.

  

This has been further extended to give group recommendations using Preference Aggregation Strategy. It also includes an easy way to create and manage events for a group by implementing LinkedIn like connections.

  
  

## Running locally

  
- Get XAMMP servers for the backend (PHP) https://www.apachefriends.org/download.html

- Import the Database schema and the data into PhpMyAdmin (Database.sql)
- Run the python websocket for the recommender system 

	`python3 websocket.py `

OR
- Create a python virtual environment and install the requirements.txt there,  a bash script has been provided for this
	`./install.sh`
	`./run.sh`

