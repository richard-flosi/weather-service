# weather-service

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa8098ca-5ae5-4bde-ab44-b7ad957e1c9f/deploy-status)](https://app.netlify.com/sites/rflosi-weather-service/deploys)

Weather Service

# Getting started

## .env File

Copy the `.env.example` file to `.env` and set your Open Weather Map API Key.

## Install dependencies

Run `npm install` to install dependencies.

## Running locally

Run `npm start` to start the development server.

Visit [http://localhost:8888/](http://localhost:8888/) in your browser to load the site.

## Running tests

Run `npm test` to run the api test suite.

# Netlify integration

This application is integrated with Netlify for deployment to [https://rflosi-weather-service.netlify.app/](https://rflosi-weather-service.netlify.app/).

Instead of setting up a local `.env` file, the environment variables can been pulled in from Netlify by doing the following:

## Netlify login

Run `npx netlify login` to login to your Netlify account.

## Netlify link

Run `npx netlify link` to link your local project with your Netlify site.

## Netlify dev

If you omit the `.env` now, then the environment variables will be injected from Netlify when you start the server with `npm start`.
