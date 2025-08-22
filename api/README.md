# Relationshipds and Associations

1. Recipes

    - recipe belongs_to user
    - recipe has_many reviews
    - recipe has_many favorites

2. Users

    - user has_one profile
    - user has_many recipes
    - user has_many reviews
    - user has_many favorites
    - admins - enhanced user abilities, normal users - CRUD own recipes, only Read other user's recipes.

3. Profile - belongs_to user
4. Reviews - review belongs_to recipe
5. Favorites - favorite recipe belongs_to the user

# Routes

1. Recipes

    - /recipes (all)
    - /recipes:id
    - /recipe-new
    - /recipe-update
    - /recipe-delete

2. User

    - /users (all)
    - /user:id (me)
    - /new-user
    - /user/:id (update)
    - /user/:id (delete)

3. Review

    - /new-review
    - /review:id (view)
    - /review:id (update)
    - /review:id (delete)

# Models

1. Recipes:

    - image
    - name
    - category
    - description
    - countryOfOrigin
    - servings
    - ingredients
    - instructions
    - cookingTime
    - servings
    - user -> user.Id

2. User:

    - username
    - email
    - password
    - passwordConfirmation

3. Review:

    - comment
    - rating
    - user -> user.Id

4. Profile:

    - username
    - email
    - avatar
    - user -> user.Id

# Controllers

1. Users

-   signUp(registering user)
-   getUser /getAllUsers
-   updateUser
-   deleteUser

2. Auth

-   login (authenticate user, return JWT)
-   logout (if managing sessions)
-   refreshToken(if implemented a refresh token)

