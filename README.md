MeddTube Ruby on Rails Server - InnovateNYP Hackathon
========

###Like FunnyOrDie + Google Helpouts, for healthcare. So you don't, uh, die.



#####This is the base code to work off of using Ruby on Rails server.  

I (David Tsay) will have my own deployed version on Heroku server at http://meddtube.heroku.com (Check it out!)

To run the server:

1. Install RoR (see guide at http://guides.rubyonrails.org/getting_started.html)
2. Don't forget to create your database (run "rake db:migrate")
3. in your directory, run "rails server"
4. Direct your webbrowser (Chrome or Firefox) to http://localhost:3000

The server only loads the html, css, and javascript on demand, so you can edit these and just refresh your browser to see changes.

Briefly, how to deploy to your own heroku server:

1. Set up a heroku account at www.heroku.com
2. Install heroku toolkit on your machine
3. In the project directory, type 'heroku login'
4. 'heroku create'
5. 'heroku rename YOURAPPNAME'
5. 'git push heroku master'
6. See your results at YOURAPPNAME.heroku.com
7. Errors?? check 'heroku logs'

=============================

##Overall Goal - Redesign myNYP.org for the 21st century

####Assumptions 

####  1. Patients don't like to read - media is key! (Video / Data Visualization / Graphics).  Relevant media should just "pop up" to the user in one or two clicks.

1. Discharge Instructions
2. Medication Information
3. Disease Information
4. Lab information
5. Appointment Information
6. etc.

#### 2. Patients like to talk to their providers, not to a computer

-- VIDEO VIDEO VIDEO - Video chat with your favorite pharmacist / Nurse / Doctor
-- Teleappointments

#### 3. Patients don't like to figure anything out

-- Instructional videos should be sent to them via email/SMS etc
-- Everything on website should be stupidly simple and straightforward

--------------



##Component checklist in terms of most important to least (work on these in order)

####1. Landing HomePage - INCOMPLETE	

Should be simple, straightforward, aesthetically pleasing, judges will see this first

####2. Patient Dashboard - INCOMPLETE

User Login - I've already installed the DEVISE gem which should work for basic auth/login

Initial page for patient - everyone will be trying to make this as pretty as possible, we should make the design more about functionality, ?big video screen in center.  We should start mocking this up first in the beginning before coding.  This is going to be a lot of front-end coding with html/CSS/javascript/jquery.  

We need displays for:

a. Diseases
b. Medications
c. Most Recent Labs
d. Appointments/Doctors - (I think simple list of physicians with the next appointment adjacent listed might be good) also need some simple way to make appointments by clicking (Calendar modules, Makeplans.net + API)

Not sure how functional this page really has to be (how would they know whether it came from XML or we just populated it ourselves?) but it definitely has to seem functional and aesthetically pleasing.

?Bluebutton.js - unsure if can parse CCR data - XML data they sent has little information so might be easier to use an XML parser through Rails

####3. Patient Video Library (Youtube)- INCOMPLETE

I've already implemented a pop up box to allow links to Youtube videos.  Lets stick with Youtube videos for now so we don't have to handle the video files ourselves on the server.

Component 1: Find and tag videos - I will make a database so that we can enter Youtube video links, we need to figure out a good schema for tagging these videos (Disease, anything else)

Component 2: Funny or Die Social Voting scheme - figure out way of voting up good videos - we need to mock up how this is going to work exactly

Component 3: Creation of User-generated videos?? (Ziggeo API)

####4. Patient Video Conference) - Base code working (Tokbox), Wrapper INCOMPLETE

I've already figured how to use the TokBox API for video conferencing but we need to integrate it into the page.  CSS/javascript coding here will be useful to make it integrate well.

####5. Provider Lookup (Bloom API)

Way to search for a local provider and specialist with their info, may need a landing page or popup separately

####6. Insurance Eligibility Verification (Eligibile API)

Got no insurance or want to change? No problem we can verify immediately for you.  This is important as one of the judges is from Oscar, a new insurance, and we should address the need that Obamacare deadline is end of this month.  Patients should be able to view their insurance easily and understand how to switch, with good links or integration with the webpages.

####7. ANYTHING ELSE?? (If we get this far I personally would be very happy)

KEY POINT TO REMEMBER - Lets not get boggled down on adding "yet another feature"; user experience is key here and so focusing on the most on topic features will be key.  Making sure the whole site seems seamless is most important.  In our presentation, then we can espouse the cost savings and revenue potential of all these features.




