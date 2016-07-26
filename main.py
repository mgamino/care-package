import webapp2
import jinja2
import os
from google.appengine.api import users
from google.appengine.ext import ndb

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(template_dir))

class Letter(ndb.Model):
    text = ndb.TextProperty()
    theme = ndb.StringProperty()
    deliverydate = ndb.DateTimeProperty( auto_now_add = True)
    sender_id = ndb.StringProperty()
    receiver_id = ndb.StringProperty()


class MainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()

        email = user.email()


        if user:
            logout_url=users.CreateLogoutURL('/')


            template = jinja_environment.get_template("home.html")
#           template_vals = {'messages':messages, 'email':email, 'logout_url':logout_url}

            self.response.write(template.render())
#           self.response.write(template.render(template_vals))

        else:
            login_url = users.CreateLoginURL('/')
            self.response.write('Logging Out')

class InboxHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("inbox.html")
#       template_vals = {'messages':messages, 'email':email, 'logout_url':logout_url}

        self.response.write(template.render())
#       self.response.write(template.render(template_vals))

class OutboxHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("outbox.html")
#       template_vals = {'messages':messages, 'email':email, 'logout_url':logout_url}

        self.response.write(template.render())
#        self.response.write(template.render(template_vals))

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
        sender = users.get_current_user()
        sender_id = sender.user_id()

        receiver = "testing"

        letter = Letter(text = text, theme = theme, sender_id = sender_id, receiver_id = receiver)
        letter.put()

        sentletters = Letter.query(sender_id == users.get_current_user().user_id()).fetch()




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
