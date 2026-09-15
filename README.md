# Kitchen Master

A single screen where you can see a menu for the week accessible at /{menuId}.

Clicking on any meal opens a dialog showing the recipes for the entire meal.

While displaying the menu, you can click on the cart icon.
A dialog will open showing you the list of ingredients needed to make your recipe.

## Contributing

Hello future me, here is how this project works and code organization so you don't go berserk and refactor everything
for no good reason

### Architecture

We do DDD and DI as provided by angular. Basically, each "notion" has its own module.Each module is neatly organized:
 - the interface folder: It holds the interfaces and types you use in the projects, think of it as your business logic.
 - the repository folder: It holds the data retrieving classes wether it is from a file or http.
 - the components folder: It holds all your components.
 - the external-apis folder: Its a collections of types and validators for data you get from external APIs. It's typically used in repositories. Think of it as adapters.

The typical view will be built the following way:
 1. Create a component
 2. If you need to get data from somewhere, you will use a repository, typed by its interface and injected via its concrete class token.

### Error handling

We don't throw intentionally here, we use results instead.
Basically, you are expected to write interfaces that return instances of `Result<ReturnedType, ErrorType>`.
In the implementation, you will use either `Result.ok(value)` or `Result.err(error)` to return values or errors.

Use comprehensive errors using codes as enums
