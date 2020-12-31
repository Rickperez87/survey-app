This app is a survey app. Functionality allows a admin user to set up survey questions. The survey can be text input or selct and it is emitted to other users via the socket.io protocols that are used. Runs on a express/socket.io backend and react front end.

9/8/20 - Extract common form state logic to a custom react hook.

Nov/20 - One issue i had to work through was using my useEffect for socket.on event listners. I hadn't set it correctly which was causing lots of issues. I refactored and optomized the number of props passing to child components to reduce rerenders also.

New Features -

Add input for user name. Use user name to show who answered waht in survey results - completed 12/2

Add ability to choose survey to be radio or open response text

Allow dialogs to be submitted with enter keystroke.- completed 12/3

12/31 - restrucred how i create survey and display. I can add and delete and update survey questions now.
in the question item object add a boolean to hold if it's free response quesiton. THis will then display with an input for user to answer. By default it will be a radio multiple chioce response.

I also need redo the display to use the new array of added question items.
