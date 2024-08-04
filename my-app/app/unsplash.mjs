import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 's1qZpQcmK4gXPxzSet1tr08a8k1B5HIAxWyICJMq0Cc', // Replace 'YOUR_ACCESS_KEY' with your actual Unsplash access key
});

// Function to fetch images based on a search query
async function fetchImages(query, perPage=8) {
  try {
    // Use the search.getPhotos method to fetch photos
    const result = await unsplash.search.getPhotos({
      query: query,
      page: 1,
      perPage: perPage,
    });

    // Check if the request was successful
    if (result.errors) {
      // Log errors if the request failed
      console.error('Error occurred: ', result.errors.join(', '));
      return [];
    } else {
      // Handle success by logging or processing the response
      const photos = result.response.results;
      console.log(`Fetched ${photos.length} photos.`);
      photos.forEach(photo => {
        console.log(`${photo.description || 'No description'} - ${photo.urls.regular}`);
      });
      return photos.map(photo => photo.urls.regular);
    }
  } catch (error) {
    // Handle any other errors that may occur
    console.error('An error occurred:', error.message);
  }
}

// Call the function with your desired search query and number of images

// Export the fetchImages function for use in other modules
export { fetchImages };
