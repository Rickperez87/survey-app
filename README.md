This app is a survey app. Functionality allows a admin user to set up survey questions. The survey can be text input or selct and it is emitted to other users via the socket.io protocols that are used. Runs on a express/socket.io backend and react front end.

9/8/20 - Extract common form state logic to a custom react hook.

Nov/20 - One issue i had to work through was using my useEffect for socket.on event listners. I hadn't set it correctly which was causing lots of issues. I refactored and optomized the number of props passing to child components to reduce rerenders also.

New Features -

Add input for user name. Use user name to show who answered waht in survey results

Add ability to choose survey to be radio or open response text
