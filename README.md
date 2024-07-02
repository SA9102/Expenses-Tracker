# Expenses Tracker

A simple application for keeping track of your expenses.

## Usage

The project is currently in its early stages so it is unusable at the moment.

<!-- ## Features

These are the features I intend to include as part of the main functionalities:

- Add an 'entry'. Each 'entry' has a name, a price, and a category it belongs to.
- Specify a budget limit for each category.
- Specify a warning for each category when you are close to reaching the budget limit. -->

## Motivation

In a world where it is easy to spend a lot of money, especially with the higher cost of living, I needed something to help me keep track of my expenses so that I could save as much as I could.

Even though there are plenty of expense-tracker apps out there, some of them come with features that I do not need, such as keeping track of how much money you are transferring to other people (which I never really do), as well as advertisements. I wanted something simple, yet something that is very easy to use.

## Features

These are some of the features I will include:

- Create, view, update and delete 'expense entries'
- Filter 'expense entries' by name, price and category
- View expenses for a specific month

## :desktop_computer: Tech Stack

- **React**, for the front-end
- **Vite**, as the build tool
- **TypeScript**

This will be my first complete project with unit and integration testing, specifically with:

- **Vitest**
- **React Testing Library**, for testing the UI

I chose Vitest since I used Vite as the build tool, and it requires less configuration than Jest.

I plan on using the **Mantine** component library for the styling.

I would also like to learn how to use some AWS services, such as DynamoDB for storing data. I plan on adding this later.

## Update Log

### 30th June 2024

- Edit entries
- Delete entries

### 27th June 2024

- Can cancel the creation of a category
- Renders correct currency

### 25th June 2024

- Can create new categories

### 24th June 2024

- First push to GitHub
- Can add entries
