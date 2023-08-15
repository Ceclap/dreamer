1.Run 'npm i' command
2.Install Docker from https://docs.docker.com/get-docker/
3.Verify with 'Docker -v' command if Docker was installed successfully
4.Run 'Docker-compose up' command to start docker container
5.Run 'npm run start' command to start the server

//Docker

'docker ps --all' to see what containers you have and their status and hash of container
'docker start *container hash*' to start container
'docker stop *container hash*' to stop container
'docker rm *container hash*' to delete container

//EndPoint
//authentication
/sign-up(post) send a email with link and token for sing-up the user
/confirmationEmail/token is use in previous Email and It sing-up the user and redirect user to this page http://localhost:5173/success  
/sign-in(post) API for Login
/recover(Get) Send a email with a link for Recover Password
/recover(Patch) Modify the password
//User
/about(Post)[need token] Modify About component 
/about(Get)[need token] Send information about user using token
/aboutById/id(Get) Send information about user using id in link
/usersAll(Get) Send All Users Name
/subscribe[need token] Api for Subscribe Pop-up
//Dreams
/post(Post)[need token] Create the Dream
/dream/id(Get) Send information about Dream by Dream ID
/dreamAll(Get) Send information about All Dreams
//Comment
/createComment(Post)[need token] Create Comment
Payload
{
body: string
parentId: string
profileId: string
}
/modifyComment(Patch)[need token] Modify Comment
Payload
{
body:string
}
/deleteComment(Delete)[need token] Delete Comment
Payload
{
commentId:string
}

