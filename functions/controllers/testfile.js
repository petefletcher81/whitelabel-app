const arr = [
  {
    id: "e9141a1f-1214-47c5-8b32-d237a3698ba6",
    createdAt: "2021-01-23T18:36:58.799Z",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whitelabel-website-7d72b.appspot.com/o/brook-anderson-1M5W_Gni_N4-unsplash.jpg?alt=media",
    section: "home",
  },
  {
    createdAt: "2021-01-23T18:32:43.549Z",
    id: "bb3f4710-1c6f-4a79-8ed1-e2598227d5d9",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whitelabel-website-7d72b.appspot.com/o/farhan-khan-TEWmCKjBHMM-unsplash.jpg?alt=media",
    section: "home",
  },
  {
    section: "home",
    id: "d0fbfc0b-cfc6-4de0-a1f5-c5243fe76b27",
    banner:
      "https://firebasestorage.googleapis.com/v0/b/whitelabel-website-7d72b.appspot.com/o/samantha-sophia-l4RL-cUDrdI-unsplash.jpg?alt=media",
    createdAt: "2021-01-23T18:39:14.906Z",
  },
  {
    section: "aboutus",
    id: "d0fbfc0b-cfc6-4de0-a1f5-c5243fe76b27",
    banner:
      "https://firebasestorage.googleapis.com/v0/b/whitelabel-website-7d72b.appspot.com/o/samantha-sophia-l4RL-cUDrdI-unsplash.jpg?alt=media",
    createdAt: "2021-01-23T18:39:14.906Z",
  },
  {
    section: "aboutus",
    id: "d0fbfc0b-cfc6-4de0-a1f5-c5243fe76b27",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whitelabel-website-7d72b.appspot.com/o/samantha-sophia-l4RL-cUDrdI-unsplash.jpg?alt=media",
    createdAt: "2021-01-23T18:39:14.906Z",
  },
];

const collectionTallies = arr.reduce((tally, collection) => {
  // how to get banner key

  // I think this is already passed
  let imageType = Object.keys(collection)[2];
  let collectionSection = collection["section"];

  // check if the section exists
  if (tally[collectionSection]) {
    // as it nested we need to then check it the type exists
    // or it will be overridden
    if (tally[collectionSection][imageType]) {
      tally[collectionSection][imageType] += 1;
    } else {
      tally[collectionSection][imageType] = 1;
    }

    // if the sectrion doesnt exist it is fine to create it
    // the we assign the value
  } else {
    // need to initialize first as the image type will be undefined
    tally[collectionSection] = {};
    tally[collectionSection][imageType] = 1;
  }

  return tally;
}, {});

console.log(collectionTallies);
