import webapp2
import jinja2
import os
from google.appengine.api import users
from google.appengine.ext import ndb

import logging

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(template_dir))

class Letter(ndb.Model):
    text = ndb.TextProperty()
    theme = ndb.StringProperty()
    deliverydate = ndb.DateProperty()
    sender_email = ndb.StringProperty()
    receiver_email = ndb.StringProperty()


class MainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()

        email = user.email()


        if user:
            logout_url=users.CreateLogoutURL('/')


            template = jinja_environment.get_template("home.html")
            template_vals = {'email':email, 'logout_url':logout_url}


            self.response.write(template.render(template_vals))

        else:
            login_url = users.CreateLoginURL('/')
            self.response.write('Logging Out')

class InboxHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("inbox.html")
        user = users.get_current_user()
        email = user.email()

        letters = Letter.query(Letter.receiver_email == email).fetch()


        template_vals = {'letters':letters}


        self.response.write(template.render(template_vals))

class OutboxHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("outbox.html")
        user = users.get_current_user()
        email = user.email()

        undeliveredletters = Letter.query(Letter.sender_email == email).fetch()
        deliveredletters = Letter.query(Letter.sender_email == email).fetch()


        template_vals = {'undeliveredletters':undeliveredletters, 'deliveredletters':deliveredletters}

        self.response.write(template.render(template_vals))

class NewLetterHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("newletter.html")
    #   template_vals = {'messages':messages, 'email':email, 'logout_url':logout_url}

        self.response.write(template.render())
    #   self.response.write(template.render(template_vals))
    def post(self):
        receiver_email = self.request.get('receiver')
        text = self.request.get('text')
        theme = "THIS IS A TEST"
        date = self.request.get('deliverydate')
        logging.info(date)
        dates = date.split('-')

            #NEED TO DO THE THING TO PASS THOSE INTO DATE PROPERTY YIKE

        sender = users.get_current_user()
        sender_email = sender.email()

        receiver = "testing"

        letter = Letter(text = text, theme = theme, sender_email = sender_email, receiver_email = receiver_email)
        letter.put()
        self.redirect("/")



class LetterHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("letter.html")
    #   template_vals = {'messages':messages, 'email':email, 'logout_url':logout_url}

        self.response.write(template.render())
    #   self.response.write(template.render(template_vals))

class AboutHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("about.html")
    #   template_vals = {'messages':messages, 'email':email, 'logout_url':logout_url}

        self.response.write(template.render())
    #   self.response.write(template.render(template_vals))



app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/inbox.html', InboxHandler),
    ('/outbox.html', OutboxHandler),
    ('/newletter.html', NewLetterHandler),
    ('/letter.html', LetterHandler),
    ('/about.html', AboutHandler)
], debug=True)
