# TRAVL TRAKR:

Travel tracking app, for either future or past travel. Get ideas of what to do, and familiarize yourself with where you'll be.

### User Story

Initial Page: User can log in or register. To log in they provide username/password. To register, they provide username, email, password.

After login: User is taken to their page. It'll show their information, and then a list of their past or upcoming trips. The list will be displayed with links to the individual trip pages.

Trip showpage: This will contain information provided by the user regarding the trip in a notes location. It will also contact the Google Maps API to show a map of the city where the trip is to, and also the Yelp API to pull up a list and links to "hot and new" places in the location of the trip. From this page, the user can click on edit to be taken to the edit component.

Edit Trip: Here the user can update the date of the trip and the location of the trip, as well as additional notes they have for their travels. There will be a button to delete the trip.

All pages will have a nav bar up top that allows a user to go to a create trip page.

Create Trip: User provides the city, country, dates of travel, and any notes about their trip on this page. They will be redirected to the show page when they enter the trip.


### API usage

Local API holds the cities the user entered. Any notes they have about the places, name, country, dates of travel.

The remote APIs are google maps and Yelp’s API for some business information in the city.


### Forthcoming Features

		1.	Incorporate a social networking component, where users can access each other's pages and somehow interact. Or see other peoples trips, without the dates of travel (for security).
		2.	Have photos added.
		3.	More interactivity with the outside APIs to provide better and more focused information (food vs. events. Hot and new vs. most reviewed). Use some of the additional Google APIs (like street view).

## Technology Utilized

Express.js, Node.js, React, Mongodb, Mongoose, body-parser, Yelp API, Google API, yelp-fusion, google-maps-react, react-calendar, react-router, bcrypt.

Open license pictures utilized on the page.













