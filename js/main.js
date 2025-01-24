function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    return `<div class="col-4">
      <div class="listing card">
        <img
          src="${listing.picture_url || "https://placeholder.com/150"}"
          class="card-img-top"
          alt="${listing.name}"
        />
        <div class="card-body">
          <h2 class="card-title">${listing.name}</h2>
          <p><strong>Price:</strong> ${listing.price}</p>
          <p><strong>Description:</strong> ${listing.description || "No description available"}</p>
          <div class="host-info">
            <img src="${listing.host_thumbnail_url || "https://placeholder.com/150"}" alt="Host Photo" class="host-photo" />
            <p><strong>Host:</strong> ${listing.host_name || "Unknown"}</p>
          </div>
          <p><strong>Neighborhood:</strong> ${listing.neighbourhood_overview || "Not specified"}</p>
          <a href="${listing.listing_url}" class="btn btn-primary" target="_blank">View Listing</a>
        </div>
      </div>
    </div>`;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    try {
      const res = await fetch("./airbnb_sf_listings_500.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const listings = await res.json();
      console.log("Loaded Listings:", listings); 
      me.redraw(listings.slice(0, 50));
    } catch (err) {
      console.error("Error loading JSON data:", err);
    }
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();
main.loadData();
