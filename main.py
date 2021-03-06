import base64
import webapp2
import jinja2
import os
from google.appengine.api import users
from google.appengine.ext import ndb
import time
import datetime
from datetime import date
import logging
import time

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(template_dir))

class Letter(ndb.Model):
    text = ndb.TextProperty()
    theme = ndb.StringProperty()
    location = ndb.StringProperty()#Juan Did this
    deliverydate = ndb.DateProperty()
    sender_email = ndb.StringProperty()
    receiver_email = ndb.StringProperty()
    writtendate = ndb.DateTimeProperty(auto_now_add = True)
    image = ndb.BlobProperty()

class MainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()

        if user:
            email = user.email().lower()
            logout_url=users.CreateLogoutURL('/')

            letter = Letter.query(Letter.sender_email == email).fetch()#juan did this
            location =[]
            for l in letter:
                location.append(l.location)

            template = jinja_environment.get_template("home.html")
            template_vals = {'email':email, 'logout_url':logout_url , 'local':location}


            self.response.write(template.render(template_vals))

        else:
            login_url = users.CreateLoginURL('/')
            template = jinja_environment.get_template("login.html")
            self.response.write(template.render())



class InboxHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("inbox.html")
        user = users.get_current_user()
        email = user.email().lower()

        present = datetime.date.today()


        letters = Letter.query(Letter.deliverydate <= present,Letter.receiver_email == email).order(-Letter.deliverydate).order(-Letter.writtendate).fetch()#juan swithced filters.That was alll!!!!

        template_vals = {'letters':letters}


        self.response.write(template.render(template_vals))

class OutboxHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("outbox.html")
        user = users.get_current_user()
        email = user.email().lower()
        # year = int(time.strftime("%Y"))
        # month = int(time.strftime("%m"))
        # day = int(time.strftime("%d"))
        #
        # present = date(year, month, day)
        # logging.info(present)
        # logging.info(type(present))
        #
        # present = present.date()
        present = datetime.date.today()


        logging.info(dir(Letter.deliverydate))
        undeliveredletters = Letter.query(Letter.sender_email == email, Letter.deliverydate > present).order(Letter.deliverydate).order(Letter.writtendate).fetch()
        deliveredletters = Letter.query(Letter.sender_email == email, Letter.deliverydate <= present).order(Letter.deliverydate).order(Letter.writtendate).fetch()


        template_vals = {'undeliveredletters':undeliveredletters, 'deliveredletters':deliveredletters}

        self.response.write(template.render(template_vals))

class NewLetterHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("newletter.html")
    #   template_vals = {'messages':messages, 'email':email, 'logout_url':logout_url}

        self.response.write(template.render())
    #   self.response.write(template.render(template_vals))
    def post(self):
        receiver_email = self.request.get('receiver').lower()
        text = self.request.get('text')
        theme = self.request.get('theme')
        datetemp = self.request.get('deliverydate')
        location = self.request.get('locate')#Juan Did this
        image = self.request.get('image')

        if datetemp == "":
            deliverydate = datetime.date.today()

        if (receiver_email == "") or ("@" not in receiver_email):
            template = jinja_environment.get_template("oops.html")
            template_vals = {'email':receiver_email, 'text':text, 'datetemp':datetemp, 'location':location}

            self.response.write(template.render(template_vals))

        elif (location == ""):
            template = jinja_environment.get_template("oops.html")
            template_vals = {'email':receiver_email, 'text':text, 'datetemp':datetemp, 'location':location}

            self.response.write(template.render(template_vals))

        else:

            if datetemp == "":
                deliverydate = datetime.date.today()
            else:
                dates = datetemp.split('-')
                year = int(dates[0])
                month = int(dates[1])
                day = int(dates[2])
                deliverydate = date(year, month, day)

            sender = users.get_current_user()
            sender_email = sender.email().lower()

            if "memegan" in text:
                theme = "meme"
                logging.info("operation meme complete")

            if "#cssi2016" in text:
                theme = "cssi"
                logging.info("operation cssi complete")

            if image == "":
                letter = Letter(text = text, theme = theme, sender_email = sender_email, receiver_email = receiver_email, deliverydate = deliverydate, location = location)#Juan did this location
            else:
                letter = Letter(text = text, theme = theme, sender_email = sender_email, receiver_email = receiver_email, deliverydate = deliverydate, location = location, image = image)#Juan did this location

            letter.put()
            self.redirect("/sent")

class SentHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("sent.html")

        self.response.write(template.render())

class OopsHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("oops.html")

        self.response.write(template.render())




class LetterHandler(webapp2.RequestHandler):
    def get(self):
        urlsafe_key = self.request.get('key')
        key = ndb.Key(urlsafe = urlsafe_key)
        letter = key.get()

        if (letter.image is None):
            image_content = ""
        else:
            image_content = base64.b64encode(letter.image)
        template = jinja_environment.get_template("letter.html")
        template_vals = {'letter':letter, 'image_content': image_content}

        self.response.write(template.render(template_vals))

class DeleteHandler(webapp2.RequestHandler):
    def post(self):
        urlsafe_key = self.request.get('key')
        logging.warn('Key: ', urlsafe_key)
        key = ndb.Key(urlsafe = urlsafe_key)
        letter = key.get()

        if letter is not None:
            letter.key.delete()

        self.redirect("/inbox.html")

class AboutHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("about.html")
    #   template_vals = {'messages':messages, 'email':email, 'logout_url':logout_url}

        self.response.write(template.render())
    #   self.response.write(template.render(template_vals))

class BoomHandler(webapp2.RequestHandler):
    def get(self):

        template = jinja_environment.get_template("side.html")


        self.response.write(template.render())



app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/home.html', MainHandler),
    ('/inbox.html', InboxHandler),
    ('/outbox.html', OutboxHandler),
    ('/newletter.html', NewLetterHandler),
    ('/letter', LetterHandler),
    ('/about.html', AboutHandler),
    ('/sent', SentHandler),
    ('/oops', OopsHandler),
    ('/delete', DeleteHandler),
    ('/BOOM',BoomHandler)
], debug=True)
