# care-package
CSSI Final Project for sending digital care packages



HERE ARE THE VARIABLE AND PAGE NAMES #nochill

PAGES
  '/'             home.html               MainHandler               home page, map
  '/inbox'        inbox.html              InboxHandler              shows all letters received
  '/outbox'       outbox.html             OutboxHandler             shows all letters sent/delivered
  '/newletter'    newletter.html          NewLetterHandler          form page to send new letter
  '/letter'       letter.html             LetterHandler             page to load specific letter received



USER class
  email           StringProperty        user email address
  name            StringProperty        user full name

  location        GeoPtProperty         user location         *not yet implemented*


LETTER class
  text            TextProperty          letter text
  theme           StringProperty        name of CSS stylesheet used to format letter
  deliverydate    DateTimeProperty      date to be delivered
  sender_key      KeyProperty           user who sent letter
  receiver_key    KeyProperty           user who letter is sent to
