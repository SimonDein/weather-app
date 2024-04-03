# Weather App showcase
The app can be run by command `npm run dev` and exists on `http://127.0.0.1:5173/`

## Frameworks and libraries
The project is a **React** (for web) app, written in **Typscript**, and running on a **Vite** server.

**Tailwind** has been used for styling, as i've grown very fond of the library's utility-first approach and for the great dev-experience.

I've used the **Prettier** plugin from IntelliJ, for a consistent formatting. If the project was in a team, a config file would be used instead.

A small API library for Open Weather Map has been used for fetching data from the API.

## Some notes
The app is written in a functional style, with the use of React Hooks. I've tried to extract the components where i found it sensible, while iterating, though fx. `DetailsPage` should be split into smaller components fx.

The API is "public" in this project, and should generally never be done on any real project. In this case we make requests to Open Weather Map directly and the key is included in the query params directly, so there's really no point in trying to hide it for this showcase project. Instead it should be shared by other means, fx. as environment variables to the back-end server, that we would instead request from the front-end. The API key itself could be saved to fx. a password manager (or other protected isolated service) shared between team members.

I didn't get around to making a rendering dynamic weather icons based on the weather data, but it could be a getter function that uses an object lookup, based on the short weather desription from OWM, with keys for the the descriptions and icons (or icon names) for values.
