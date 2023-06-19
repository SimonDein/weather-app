# Weather App showcase
The app can be run by command `npm run dev` and exists on `http://127.0.0.1:5173/`

## Frameworks and libraries
The project is a **React** (for web) app, written in **Typscript**, and running on a **Vite** server.

**Tailwind** has been used for styling, as i've grown very fond of the library's utility-first approach and for the great dev-experience.

I've used the **Prettier** plugin from IntelliJ, for a consistent formatting. If the project was in a team, a config file would be used instead.

A small API library for Open Weather Map has been used for fetching data from the API.


## Testing
I've realised a little late, that i've not gotten around to setting up automated tests, as i would have liked to showcase that as well.
For the sake of the technicality i would like to explain how and what i would like to test, if you would be interested.

Mainly i would focus on the critical parts of the application first.
In my opinion that would be mainly be a unit test of my hook `useCurrentWeatherDataForLocation` as well as the expected e2e of the app itself. 

The hook is the main entry point to Open Weather Map in the app. It supports fetching by a location that can consist of coordinates, city name or zip code, and will fetch from the different end-points based on what data is present.
The idea was that at some point i could allow a user to enter any of the three, and could fetch the data based on what the user prefered to enter.

1. Happy paths: On expected successful calls by coordinates, city name or zip code, i would fx. expect a successful response and maybe in a certain format.
2. Sad paths: Certain errors was not treated by the API as expected, i would fx. expect 404's to throw an error and not return a successful response. Some tests expecting certain error scenarios would be very helpful to ensure the integration with the API is working as expected.

Some E2E tests in Playwright would be really nice as well, and could work will in a CI/CD environment, to fx. ensure you're not releasing a broken app.
Some tests, navigating through the app, clicking around, interacting with the app, and ensuring the expected UI elements are present when they do.
Both successful and error states could be tested in a mocked environment, if we would want to isolate just the front-end.


## Some notes
The app is written in a functional style, with the use of React Hooks. I've tried to extract the components where i found it sensible, while iterating, though fx. `DetailsPage` should be split into smaller components fx.

I didn't get around to making a rendering dynamic weather icons based on the weather data, but it should be a getter function with with a switch or an object lookup.

I originally intended to write all the components in Storybook to isolate the UI development from the app itself, but due to time constraints i dwelled away from it.