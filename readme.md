# Xing Connection Viewer

This project is an experiment in using the [XING API](http://dev.xing.com) to visualise which of your contacts share connections between each other.

## Instructions
Use the following steps to run the project

### 1. Install environment
Use Bundler to install gems: `bundle install`

If you do not yet have bundler: `gem install bundler`

### 2. Download profile data
Connect to the XING API and download all profile information using the `ruby.rb` file. This is as simple as using the terminal to run:

`ruby data.rb`

The downloader will attempt to open the XING authorisation URL in the browser and ask you for a PIN, which will be provided on the web page. Currently this project is a development example, so the authorisation page will give a warning.

Once complete, a new JSON file will be saved to the `data/` directory.

### 3. Open web interface
To view the shared connections, the web interface must be run on a web server (because the page makes a Ajax request for the JSON file). The simpilist way to do this is to simply run a simply Python HTTP server:

`python -m SimpleHTTPServer`

Then navigate to the following address in your webs browser:

`http://localhost:8000/web/`

