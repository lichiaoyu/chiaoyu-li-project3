# Sudoku Project 3

## Deliverables

GitHub repo: https://github.com/lichiaoyu/chiaoyu-li-project3  
Render app: https://chiaoyu-li-project3.onrender.com/  
Video walkthrough: Not yet available  
Collaborators: Chiao-Yu Li

## Challenges Faced

A major challenge in this project was moving from a front-end Sudoku game to a full-stack application while keeping the gameplay consistent. In Project 2, most behavior lived entirely in React state, but in this version I had to redesign the flow so that login state, saved progress, high scores, and game persistence all worked correctly across the frontend, Express APIs, and MongoDB.

Another significant challenge was handling multiple users on the same puzzle. Early on, I ran into a bug where different users could enter the same puzzle and end up sharing the same result state. For example, if I logged in as user A and solved a puzzle, then logged out and logged in as user B, that same puzzle could incorrectly appear as completed for B as well, and B’s win count could increase even though B had not solved it. The root problem was that I was treating completion and progress too much like shared game data instead of user-specific data.

I solved this by separating puzzle-level data from user-level progress in the database. The Sudoku game itself still stores the shared puzzle information, but each user’s board state, completion status, and recorded result are tracked independently. I also updated the win-count logic so that a win is only recorded for the specific authenticated user who actually completes the puzzle, instead of any user who later opens that same game. This change fixed both the incorrect completed state and the incorrect winner-counting behavior.

Database and deployment setup also took more time than I expected. In local development, the app relied on Vite, local MongoDB, and separate frontend/backend processes. For deployment, I had to make sure the Express server could serve the built frontend, read environment variables correctly, and connect to MongoDB Atlas on Render. Some of the problems were small but time-consuming, like forgetting to bind the server to `0.0.0.0`, which meant the deployed app could not be accessed correctly. Debugging those configuration details was not conceptually difficult, but it still took a meaningful amount of time to get everything working smoothly.

## Additional Features or Design Changes

Given more time, one feature I would really want to add is the ability for the user who created a game to delete that board. I think this would be a very useful feature, especially if a user creates many games and wants a cleaner way to manage the list. Right now, users can create and play games, but there is no way for the original creator to remove a board they no longer want to keep.

I would also like to improve the leaderboard logic. At the moment, the high score page only counts total wins, but it does not consider completion time or puzzle difficulty. A more meaningful leaderboard would use timer results as part of the ranking and include difficulty as well, because winning two Easy games should not be treated the same as winning two Normal games. Adding time-based ranking and difficulty weighting would make the scoreboard feel much more fair and competitive.

I would also continue improving the puzzle randomization system. Right now, the game appears random by selecting from a relatively small puzzle bank, so it gives the impression of variety without being a true generator. In the future, I would like to expand the number of puzzle solutions and problem sets significantly, or eventually move toward stronger backend generation logic, so that newly created boards feel more genuinely unique.

## Assumptions Made

I assumed that logged-out users should be able to view all pages and Sudoku boards, but should not be able to interact with the game. This matched the assignment’s logged-out experience requirement.

I also assumed that multiple users should be able to access the same puzzle, but that each user’s progress should be stored independently. In other words, the puzzle itself is shared, but the board state and completion experience are user-specific.

For game creation, I assumed that the assignment required a new game object to be created through the backend API, but did not strictly require a fully algorithmic random Sudoku generator. Because of that, the puzzle is not truly generated from scratch each time. Instead, the app uses a set of puzzle banks and randomly picks from those stored puzzles based on difficulty, along with generating a unique three-word game name.

For the login/logout UI, I assumed that changing the navigation from a login button to a simple `Hello, {user}` display was enough to communicate the logged-in state. For the logged-out experience, I did not design an additional prompt such as “Do you want to log in?” or a more guided login callout. I assumed that a simpler navigation-based state change was sufficient for this project.

I also assumed that high scores should be based on completed games recorded in the backend and that users with zero wins should not appear on the high score page.

## Time to Complete

This assignment took approximately 40 hours, including backend API implementation, MongoDB setup, authentication, multi-user progress handling, styling fixes, deployment preparation, and debugging.

## Bonus Points Accomplished

I completed the AI survey and submitted the project early. Those are the bonus items I intentionally completed in addition to the required project features.
