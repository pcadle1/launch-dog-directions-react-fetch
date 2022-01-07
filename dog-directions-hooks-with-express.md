# Directions from Dog

Hi, I'm Bruce.

![alt text][bruce]

My human is well-intentioned, but sometimes needs some guidance. So I've made a list of how to do my favorite things so that my human can follow along.

We want to help Bruce better communicate with his human. Right now we have a React app that displays how to do Bruce's favorite things, but we think his human might need more guidance than that. Let's build the functionality to allow Bruce's human to highlight an individual instruction and follow along one step at a time.

## Getting Started
Run the following commands to get the app up and running

```no-highlight
et get dog-directions-hooks-with-express
cd dog-directions-hooks-with-express
yarn install
yarn run dev
```

Then navigate to `localhost:3000`.

**To debug, run `yarn run dev:debug`.**

## App Structure

This is a React app running on top of Express. It's the first time we're seeing a full-stack web application with Express and React! This structure is what we call our "monolith" application, where we combine our back-end Express app and our front-end React app into one big folder structure.

At first glance, it's going to seem complicated. We'll dive into this structure more in the coming weeks, but for now, here's what you need to know:

- All of your React code can be found inside of the `client` folder.
  - This will look largely the same as the React code you've been seeing so far, with two major changes:
    - Your `client/src/main.js` file looks a little more complicated than normal, because it's running something called `RedBox` in our development environment. `RedBox` will allow you to see big, red, ugly errors in your browser if and when you have a bug that impacts your React compilation. You should not need to update this file.
    - Your `client/src/components/App.js` is loading in something called `hot` from `"react-hot-loader/root"`. It is using this in the export: `export default hot(App)`. This is part of what allows Express and React to work together and automatically update your React code. Be sure to always include `hot(App)` in your export within this file to keep that working.
- All of your Express code can be found inside of the `server` folder.
  - You will notice a new router included: our `clientRouter`. You should not need to update this file at all (this week!). So long as you add any Express routes (such as API endpoints, e.g. `rootRouter.use("/api/v1/favorite-things", favoriteThingsRouter)`) _above_ the line referencing `clientRouter` in `server/src/routes/rootRouter.js`, your app will work just fine.

Other than that, you don't need to worry too much about the extra files included so far. We'll continue to learn more about those over the next few weeks.

### What's going on here

Let's take a look at what the code is doing. The `client/src/main.js` file is importing a constant called `data`, which stores all of the information about Bruce's favorite things. It then renders an `App` component and passes `data` to that component as `props`.

Within `App`, we isolate the `supplies` and `directions` from within the `data` props and then hand them into our `SuppliesList` and `DirectionsList` components, respectively. This component `return`s a header with the name of the activity, a `SuppliesList`, a `DirectionsList`, and a `FetchButton` (not functional as of right now).

Inside `SuppliesList` and `DirectionsList`, we `map` over the items, returning `SupplyTile`s or `DirectionTile`s, respectively. These components ultimately `return` a header with the name of the section, and their appropriate item arrays.

## Instructions

Right now, when we boot up our app and take a look, we can see that we have a list of supplies and instructions. We currently don't have any way to interact with this page - clicking around doesn't change anything!

What we want to do is make it so that upon clicking on each individual step in our instructions, it highlights that step (and only that step!) in blue. We will do this by defining state in our app to keep track of which `DirectionTile` is selected. We'll walk through how we would approach this below.

### Setting the State

Let's first set up our app to track which step is selected in `state`.

In your `DirectionsList` component:

- Use `useState` to create a `selectedId` piece of state with an initial value of `null`
- Uncomment the `setSelectedDirectionClosure` **closure** function within `props.directions.map`. This function doesn't take in any arguments, but when it is invoked, it will call your new `setSelectedId` function with an argument of the id of the direction currently being mapped over. Inside `setSelectedDirectionClosure`, hand `setSelectedId` the appropriate id for each direction.

>This concept of putting one function inside another can be confusing. We need to wrap our `setSelectedId` function like this before handing it down to a `DirectionTile` because each `DirectionTile` needs to run `setSelectedId` with a *DIFFERENT* id *WITHOUT* actually invocating. For example, the `DirectionTile` for the first direction needs to run `setSelectedId` with an input of `1`, whereas the `DirectionTile` for the fourth direction needs to run it with an input of `4`. Defining a function within the map allows us to use a single function (`setSelectedDirectionClosure`) that can call `setSelectedId` with whichever `id` corresponds to that `DirectionTile`! Wrapping our setter function in this closure function gives us the versatility to preload the id argument while still being able to pass our callback function to the onClick in DirectionTile.

This closure will be passed down to each of our direction tiles in the next step.

### Changing the State with Synthetic Events

Great! Now our app can handle state, but we have to make sure that Bruce's human can change the state by clicking around.

- Pass the `setSelectedDirectionClosure` function to `DirectionTile` as `props`
- In `DirectionTile`, use the `onClick` synthetic event on the `li` element to call the `setSelectedDirectionClosure` function we've now passed down through props.
- At this point, you should be able to `console.log(directionId)` in the `App` and see the `state` change as you click!

### Adding Dynamic Styling as Visual Feedback

We're getting really close now! Since we're good UX designers, we want to make sure that Bruce's human can actually _see_ the state being set, instead of just being able to `console.log` it. Let's turn the selected step blue to make it easy to follow along.

Try the next steps on your own, then check the hint below to see if you've got it right!

- Add a `className` variable within the `props.directions.map` function (be sure to use `let` so you can reassign it later!)

- For each `DirectionTile`, we want to check whether the direction we're putting on the page is the _selected_ direction: i.e., that the `direction`'s `id` is the same as the `selectedId` stored in our `state`. If it is, we'll change the value of `className` to `selected`.

- Pass that `className` variable down as props to the `DirectionTile`.

**YOUR SOLUTION:** The map function should now look like this:

```javascript
const directionTiles = props.directions.map(direction => {
  // initialize the className variable
  let className
  // check whether the selected id is the id of this direction
  if (direction.id === selectedId) {
    className = "selected"
  }
  // no need for an `else`: we can just leave `className` as null if the ids are not equal!

  const setSelectedDirectionClosure = () => {
    setSelectedId(direction.id)
  }

  return (
    <DirectionTile
      step={direction.step}
      key={direction.id}
      id={direction.id}
      className={className}
      setSelectedDirectionClosure={setSelectedDirectionClosure}
    />
  )
})
```

- Update your `DirectionTile` to use this new `className` for styling purposes!
- The styling for the `.selected` (the class named `selected`) has already been defined for you in `client/public/home.css`. At this point, your app should have the selected step turn blue with each click!

### Use Data from our Backend!

Let's refactor to use `fetch` to get our data instead of importing `data.js` into `main.js`. To get set up:

* Write an additional function `fetchData` in `App` that makes a fetch request to `/api/v1/favorite-things`. This endpoint has been set up for you in `server/src/routes/api/v1/favoriteThingsRouter.js`, so you don't need to do anything to get it up and running (you could even visit `http://localhost:3000/api/v1/favorite-things` in your browser if you want to check it out!).

- Once the data has been fetched, it should be stored in state. This will mean you will need new invocation(s) of `useState`.
- `fetchData` should be called when the `FetchButton` is clicked. Once your state has been updated with the new data, you will want to refactor `App` to read the data from your newly created state instead of from `props`.
- Once the change has been implemented, you should start out with a page with the button and no lists and then see the lists appear after the button has been clicked!

### Tips

- Remember that your component will re-render every time the state changes (when you call your state setter function). Placing a `debugger` or `console.log` at the top of any callback functions or at the top of your component are good places to see what's going on.
- Remember that we **never** directly mutate a piece of `state` without using the function provided by `useState`.

[bruce]: https://s3.amazonaws.com/horizon-production/images/bruce.jpg "dog photo"
