# ShareSoul

## Main Idea
ShareSoul is a social media Application.
People can share one photo and one story once.
If you find the user who has a wonderful photo and meaningful story of that, you can spend some "soul" (which is like credits in this app) to add that person as your soul fiend for the further chat. Maybe you will find a new place in the  world that you are willing to travel or an interesting person you can be well along with him or her.

## Technology
1. React, Redux (redux-logger, selector, persistor)
2. Firebase (Auth, User Database)
3. ChatKit (Web Chat API)

## 2020.01.12 -- Version 0.1 (Auth)
1. Setting up the ShareSoul project: basic react files and redux for user state. Building redux-persist cache system, redux-select system, redux-logger for eaiser tracking and debugging. 

## 2020.01.13 -- Version 0.1
1. Using Firebase to support Authentication system, and building user database

## 2020.01.14 -- Version 0.2 (User Data)
1. Designing the relation between story database and user database => user has 5 props now (userID, email, displayName, createTime, storyID[]), userID as the prime id and   storyID as the foreign id. Story database has 3 props (storyID, createTime, imageURL, storyText).
2. Building the function (extracting stories from database) in the main page and user own page.


## 2020.01.15 -- Version 0.2
1. Adding Material UI to decorate main page and user page.

## 2020.01.17 -- Version 0.3 (Web Chat)
1. Using ChatKit API to build the web chat page.