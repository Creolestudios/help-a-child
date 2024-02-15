# help-a-child

This project centers on assisting children whose parents are separated. The team facilitates the child in connecting with a suitable mentor and accommodation. Through the interactive forum, users can create and share blogs to raise awareness and provide opportunities for others to support children in need of a brighter future.

# Features

- A forum for children and young people to share their thoughts and chat with each other.
- Read the blog and add a comment or reply.
- Register as a volunteer

# Installation Guide

### Requirements

- [Nodejs](https://nodejs.org/en/download)
- [Directus](https://docs.directus.io/self-hosted/cli.html)

Node.js version 18.17 or higher is required for Directus.

## Usage

For ForntEnd take a pull using below command >git clone https://github.com/Creolestudios/help-a-child.git

For BackEnd Need to setup directus and add DB URL in Directus >npm init directus-project help-a-child-cms

## Install Dependencies for frontend

Now install the dependencies >cd help-a-child >npm i

We are almost done, Now just start the development server.

For Frontend.

    >npm run dev

For Backend.

    >npx directus start

Done! Now open localhost:3000 for front end And http://0.0.0.0:8055/admin/login for backend in your browser.

## Build & Deploy

```

# Create frontend prod build

>npm run build

```
