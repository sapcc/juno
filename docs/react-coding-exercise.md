# React & Rockets

![Falcon Heavy Launch](https://upload.wikimedia.org/wikipedia/commons/8/85/Falcon_Heavy_Demo_Mission_%2840126461411%29.jpg)

## Welcome to our rocket coding exercise! 👋 🚀

In this exercise, you'll have the chance to interact with data related to space launches and rockets using the SpaceX Open Source REST API. Let's dive in and start exploring!

## Exercise (approximately 1 hour)

### Preparation - Setup

- Create a new React application using your preferred method or framework.
- Set up the project structure and install necessary dependencies.
- Optional: Install and integrate a design system or style framework of your choice to enhance the UI/UX.

### TASK #1 - REST API Integration

- Fetch the list of launches from the SpaceX API using the provided endpoint: [endpoint](https://api.spacexdata.com/v4/launches), [definition](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v4/all.md)

### TASK #2 - Display Launch List

Display a list of launches with the following attributes:
- Launch Name
- Local Date
- Success/Failure info
- Launch Details
- Image
- Link to youtube

### TASK #3 - Implement Functionality

Implement functionality for sorting, filtering, and searching the launch list:
- **Sorting:** Allow users to sort launches by name or date.
- **Search:** Implement a search feature to find launches
- **Pagination:** Use pagination or a similar technique to avoid displaying all entries at once

## Additional Notes:

- Use modern React best practices, including functional components, hooks, and state management.
- Focus on clean code, modularization, and reusability of components.
- Consider error handling and loading states for API requests.
- Utilize loading indicators to provide visual feedback while data is being fetched from the API.
- Implement conditional rendering to display "No data" messages when no data can be displayed.
- Feel free to use any additional libraries or tools that you find appropriate for completing the tasks efficiently.

## Bonus
- Ensure responsive design for optimal viewing on different devices.
- Filtering: Provide options to filter launches based on specific criteria (e.g., upcoming, past).

## Useful links
https://github.com/r-spacex/SpaceX-API/tree/master/docs#rspacex-api-docs
