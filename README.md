# TRAVL TRAKR:

Travel tracking app, for either future or past travel. Get ideas of what to do, and familiarize yourself with where you'll be.

### User Story

Initial Page: User can log in or register. To log in they provide username/password. To register, they provide username, email, password.

After login: User is taken to their page. It'll show their information, and then a list of their past or upcoming trips. The list will be displayed with links to the individual trip show pages.

Trip showpage: This will contain information provided by the user regarding the trip in a notes location. It will also contact the Google Maps API to show a map of the city where the trip is to, and also the Yelp API to pull up a list and links to "hot and new" places in the location of the trip. From this page, the user can click on edit to be taken to the edit component.

Edit Trip: Here the user can update the date of the trip and the location of the trip, as well as additional notes they have for their travels. There will be a button to delete the trip.

All pages will have a nav bar up top that allows a user to go to a create trip page.

Create Trip: User provides the city, country, dates of travel, and any notes about their trip on this page. They will be redirected to the show page when they enter the trip.


### API usage

Local API would be the cities the person entered. Any notes they have about the places, name, country, dates, etc.

The remote API would be the google maps/google information and Yelp’s API for some business information in the city.

I’ve already signed up for the APIs for Yelp and Google


### React breakdown

App container will hold a user container and city container.
User container has the user renders for the user page.
City container will hold the city renders which have the edits, and shows for the cities.


### Backend

SERVER INFORMATION:

Routes: Post '/login' login.
		Post to '/' to add user.
		Get '/user/:id' to get information re: user.
		Put '/user/:id/' will edit the users information. Name, email, password.
		Delete '/user/:id' will remove the user.
		Get '/cities' will get all the trips a person is taking.
		Post '/cities' will add the trip using the model.
		Get '/cities/:id' will get the information for the specific trip.
		Put '/cities/:id' will edit the information re: the trip.
		Delete '/cities/:id' will delete the trip from the user and the database.


SERVER MODELS: 
	User: {
		name: '',
		email: '',
		password: '',
		trips: [{trip model}]
	}

	Trip: {
		name: '',
		country: '',
		dateArrived: //,
		dateLeft: //,
		Notes: ['','']
	}

### Goals

	MVP: Have the app allow users to be made, edited and deleted. Keep their trips. Access some outside information (map, places to visit). Fullfil CRUD for users and trips.

	Stretch: 
		1.	Incorporate a social networking component, where users can access each other's pages and somehow interact. Or see other peoples trips, without the dates of travel (for security).
		2.	Have photos added.
		3.	More interactivity with the outside APIs to provide better and more focused information (food vs. events. Hot and new vs. most reviewed). Use some of the additional Google APIs (like street view).














