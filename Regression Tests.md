# Regression tests

## NAVBAR

- to be visible throughout the site
- nav bar renders only the homepage / about / contact when not logged in
- when logged in renders dashboard and signout
- click the area and navigate to page
- click sign out icon and can sign out `needs a small refactor`
  - users cookie is cleared

## HOMEPAGE

- Content loads with images
- footer loads with data about company and socials
- socials clickable

## ABOUTUS

- Loads only content at the top of the page
- gallery loads with all the available images from the BE
- user clicks site and image loads in a modal
- user can close the modal clicking outside the modal
- 2nd content should load at the bottom of the gallery

## CONTACTUS

- Hero area should load with content and `contact us form`
- User can send request for `contact`
- content rendered / no images

#### Contact form

- user can send request and recieve message for success / error
  - [bug] need only to see the appropriate message never both
  - [bug] size needs adjusting for when the message is showing

## FOOTER

- footer loads with data about company and socials
- to be visible throughout the site

## SIGN IN

- user can sign in
- success message shown
- user details incorrect -> message is shown
- user can click password reset and it will send an email

#### in sign in

- user token added to cookies
- user redirected to homepage

## DASHBOARD

- [bug] user only sees update when refreshes
- user needs to be signed in and admin to implement any of the following:-

#### Manage Enquiries

- user clicks `edit` modal opens with correct details
- user can check / uncheck box and `save`
- user can `delete` content

#### Manage Content

- user clicks `edit` modal opens with correct details
- user can check / uncheck box and `save` BUG
- user **CANNOT** `delete` content
- user delete button should not show

##### Change Image

- user can select an image and save it to the new area in content
- An alert will appear with `Success` of `Error` message
- usre will be able to navigate to that page and see that image

#### Manage Images

- user can upload images to gallery
  - need to lock this down / make process easier
  - [bug] when image exists the wrong error is being surfaced
- user can click `edit` modal appears and then `delete` or `close` modal
  - if deleted then the user will see an alert with the `success` message
  - after refresh content will be updated

#### Manage Footer

- user can click `edit` and modal is shown where content can be edited
  - a message will be sent for the `success` or `error` within the modal

## SIGNOUT

- user can sign out
  - this will remove cookie and option to go to dashboard
