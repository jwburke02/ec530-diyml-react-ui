# EC530 - DIY Maching Learning Frontend
## Note on Backend
The backend for this can be found here: https://github.com/jwburke02/EC530-diyml
## Application Features
This application has the following features:
- User creation and authentication
- Object detection project creation
- Single image upload
- Multiple image upload
- Model training
- Model publishing
- Personal model object detection inference
- User search model object detection inference
## Setup
In order to run the application, assuming the backend is running on the same machine already, perform the following:
1. Clone this repository to your machine where the backend is running.
2. Install dependencies using `npm i` in the root of this repository.
3. Run `npm run dev` to test the application or `npm run test` to run jest test suites for the application
Look at the README for https://github.com/jwburke02/ec530-diyml in order to run the backend.
# Project Components
## Home
The Home Screen is the start of the application. Once loading into the Web App, the first view is of the title and buttons to either create an account or to log into the application:
![UnauthenticatedHomeScreen](./Demonstration%20Images/UnauthenticatedHomeScreen.png)  

If one is logged into the application through Authentication, they have the following screen:
![AuthenticatedHomeScreen](./Demonstration%20Images/AuthenticatedHomeScreen.png)  

Once on the Home Screen and Authenticated, the user can either proceed to the Dashboard Screen or can search published projecst of other users.

## Authentication
Authentication is the means through which someone is able to create an account and access the service. There is both a display for account creation as well as for logging into one's account.  

Account creation display:
![SignupDisplay](./Demonstration%20Images/SignUpDisplay.png)
Account login display:
![LoginDisplay](./Demonstration%20Images/LogInDisplay.png)  

The only thing needed for account creation is a unique username and a password. If a user already exists with the username chosen, account creation will be unsuccessful and the user will not be signed into their new account.  

## Dashboard
The Dashboard is one of two features accessible from the Home Screen of the application. The Dashboard Screen shows the projects of the current user, and gives many options. These options include project deletion, class modification, data uploading, training, project inference, and publishing.

A Full Dashboard:
![FullDash](./Demonstration%20Images/DashboardScreenJoveve.png)
An Empty Dashboard
![EmptyDash](./Demonstration%20Images/DashboardScreenNewUser73.png)  

### Create Project
From the dashboard, one can create a project. When creating a project, only project type and project name can be specified. Here is what the creation screen looks like:
![CreateProject](./Demonstration%20Images/CreateProjectScreen.png)  

The user has the option to cancel, or create a project, after which it will be visible on their Dashboard Screen.

### Data Point Addition
From the Dashboard Screen, the Add Data button can be clicked for any active project. This will open a new screen in which the user is able to upload data for their project. The user can upload data through two seperate interfaces.

Single Data Point Upload:
![SingleDataPointAdd](./Demonstration%20Images/SingleDataPointAdd.png)
Multiple Data Point Upload:
![MultipleDataPointAdd](./Demonstration%20Images/MultipleDataPointAdd.png)   

When uploading multiple data points, the user has to upload data points of the same name as their labels. The user can upload however many images and text files they want as long as they all have matching names, so a.txt must be accompanied with an a.jpg or a.png. 

Txt files are used as the label markers. Each line corresponds to a different detection here is a label (label.txt):  
0 .53 .12 .04 .12  
1 .12 .14 .2 .4   

The example label.txt above would indicate that an object of class 0 has a bottom left corner 53% through the x axis and 12% through the y axis of the image, and its bounding box takes up 4% of the width and 12% of the height. It would also indicate that an object of class 1 has a bottom left corner 12% through the x axis and 14% through the y axis of the image, and 2% and 4% height width respectively. These percents are according to total image size. So a 32x32 square in the top right of a 64x64 grid would be denoted as:  
0 .5 .5 .5 .5  

Because it takes up half of the size of the image and starts at the center.
### Model Training
In order to train an object detection model from a project, a user just has to click the "Train Project" button on the dashboard for the project.
### Inference Screen
If the user clicks the Publish/Unpublish button on a trained model, it wil enable inference for this model. This enables both the creator and other users of the application to access the model.  

Here is what the inference screen looks like:
![InferenceScreen](./Demonstration%20Images/InferenceScreen.png)  

From this screen, the user can input an image file. The inference screen will process this request and will inform the user of any detections, or if there are no detections for the image.

Users are able to upload 
### Publish Search
If a user knows another user's username and knows they have published projects, they are able to search for that user's published projects and use them to make inferences on images themselves, testing the models.

Here is what that search screen looks like when searching for user Joveve's published projects:
![InferenceScreen](./Demonstration%20Images/ExamplePublishSearch.png)  

Whoever searches for this published project is able to then click on the "Make Inference" button to be sent to the Inference Screen above for the project.

# Demonstration Videos
Inside the folder `Demonstration Videos`, there are videos which show this Web Application as it is intended to work. There are the following Demo Videos present inside this repo:
1. AccountAndProjectCreation.mov 
    - This video consists of the creation of an account an subsequent navigation to the Dashboard
    - On the Dashboard, the user clicks to Create a Project
    - The user names the project and selects "Object Detection"
    - The user adds a class list to the project
    - The user adds a single data point with manual labling to the project
    - The user adds multiple data points with multiple image and text file upload
3. TrainPublishInference.mov
    - This video shows a user publish and unpublish a model, showing that the inference button is dependent on publishing status
    - The user publishes their project and makes an inference
    - The first inference is successful in showing a parking meter in the middle of the image
    - The second inference is unsuccessful, as there is nothing to detect in the Mango image according to the published model
4. UserSearchInference.mov
    - Similarly to the example above, both a successful and unsuccessful image are inferred
    - The difference in this video is that a new user is created and searches manually for the published project by Joveve
    - Inference process is same as above besides preliminary searching for the user
    - This video showcases object detection is capable of multiple object detection
    - This video showcases that only published projects are searchable, as Joveve's unpublished projects do not display for the new user
# Application Testing
The E530 DIYML Frontend Application is unit tested using the Jest package for React JS. This allows us to test jsx files, using Babel to convert between jsx and js for testing purposes.  

Currently, all tests are able to pass when ran locally. These are testing for correct component rendering given the state and props passed.  