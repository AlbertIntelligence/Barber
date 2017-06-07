export let HOTELS = [
  {
    id: 1,
    name: "Mario Perfect Cut",
    rating: 5.0,
    price: 25,
    sale_price: 20,
    location: {
      lat: 45.5495467,
      lon: -73.7578152,
    },
    address: "1536 Boulevard Curé-Labelle Laval QC H7V 2W2",
    description: "Best Barber in town",
    location_text: "Best Barber in town",
    features: "Best Barber in town",
    room_amenities: "Best Barber in town",
    thumb: "assets/img/hotel/thumb/img_1.jpg",
    homeGalery: [
      "assets/img/hotel/thumb/img_1.jpg",
      "assets/img/hotel/thumb/img_2.jpg",
      "assets/img/hotel/thumb/img_3.jpg",
      "assets/img/hotel/thumb/img_4.jpg",
      "assets/img/hotel/thumb/img_5.jpg",
      "assets/img/hotel/thumb/img_6.jpg"
    ],
    viewMoreGalery: [
      "assets/img/hotel/thumb/img_1.jpg",
      "assets/img/hotel/thumb/img_2.jpg",
      "assets/img/hotel/thumb/img_3.jpg",
      "assets/img/hotel/thumb/img_4.jpg",
      "assets/img/hotel/thumb/img_5.jpg",
      "assets/img/hotel/thumb/img_6.jpg",
      "assets/img/hotel/thumb/img_5.jpg",
      "assets/img/hotel/thumb/img_5.jpg",
      "assets/img/hotel/thumb/img_5.jpg",
      "assets/img/hotel/thumb/img_5.jpg"
    ],
    images: [
      "assets/img/hotel/thumb/img_2.jpg",
      "assets/img/hotel/thumb/img_4.jpg",
      "assets/img/hotel/thumb/img_5.jpg",
      "assets/img/hotel/thumb/img_6.jpg",
      "assets/img/hotel/thumb/img_6.jpg",
      "assets/img/hotel/thumb/img_6.jpg"
    ],
    free_wifi: 1,
    services: [
      {
        id: 1,
        icon: "ios-checkmark-circle-outline",
        name: "Pool"
      },
      {
        id: 2,
        icon: "ios-wifi",
        name: "Internet"
      }
    ],
    numb_available_rooms: 5,
    reviews: [
      {
        id: 1,
        username: "David",
        from: "Ohio",
        title: "Nice place, as long as you don't want to leave",
        content: "My wife and myself had two stays in the past week broken by a visit to Holong Bay. The hotel staff were very helpful in all ways, nothing was too much trouble. The taxis that bear the Nikko name were always on hand and good operators (cheap to get around). The bar had a fantastic happy hour being good nibbles and great value. We were always being helped by the concierge operators when coming and going and always translated for us to the taxi drivers. One of my best hotels.",
        rating: 4
      },
      {
        id: 2,
        username: " epz",
        from: "z",
        title: "Close to old quarter",
        content: "4 nights. Nice suite Staff very helpful. Easy to get cabs",
        rating: 4
      },
      {
        id: 3,
        username: "Hui Lan",
        from: "Singapore",
        title: "Short stay",
        content: "We stayed for 1 night before travelling to Sapa. Hotel reception staff speak limited English and not so friendly. Access to nearby food & beverage outside the hotel is not convenient.",
        rating: 3
      },
      {
        id: 4,
        username: "David",
        from: "Singapore",
        title: "CONVENIENT LOCATION",
        content: "I BOOKED THIS HOTEL BECAUSE IT WAS CONVENIENT TO WHERE I NEEDED TO BE. IT WAS A PRETTY AVERAGE HOTEL IN MOST WAYS BUT PLEASANT ENOUGH.",
        rating: 4
      },
      {
        id: 5,
        username: "Chrissie",
        from: "",
        title: "Disappointing and overpriced",
        content: "Disappointing stay as the condition of the hotel was the exact opposite of hotel nikko in saigon- Do not eat the food in this hotel, it is not only overprized but it also lacks in freshness and quality. The pool and fitness area looked alrite. The staff was helpful. The bar only offered one type of wine by the glass. We saw a bottle of wine called 'Apothic Red' which cost $12 in Aspen, CO in a bottle shop and about $30 in an expensive restaurant in Aspen. The hotel offered this inexpensive wine for &100?? We had a laugh and ended up having a drink in a different hotel. I would highly recommend hotel nikko in Saigon BUT not in hanoi",
        rating: 4
      }
    ],
    rooms: [
      {
        id: 1,
        active: 1,
        name: "Deluxe Room",
        beds: "1 king bed or 1 twin bed",
        numb_available_rooms: 3,
        refundable: 0,
        room_info: "Free Parking \n Free Internet \n Free Welcome Drink",
        thumb: "assets/img/hotel/thumb/img_4.jpg",
        price: 78
      },
      {
        id: 2,
        active: 0,
        name: "Grand Deluxe",
        beds: "1 king bed or 1 queen bed",
        numb_available_rooms: 2,
        refundable: 0,
        room_info: "",
        thumb: "assets/img/hotel/thumb/img_2.jpg",
        price: 90
      },
    ]
  },
  {
    id: 2,
    name: "Hanoi Fortuna Hotel",
    rating: 3.7,
    price: 131,
    sale_price: 73,
    location: {
      lat: 21.021425,
      lon: 105.8158252,
    },
    address: "360 Kim Ma Street Hanoi 100000",
    description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
    location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
    features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
    room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
    thumb: "assets/img/hotel/thumb/img_7.jpg",
    images: [],
    services: [],
    numb_available_rooms: 5,
    reviews: [],
    rooms: []
  },
  {
    id: 3,
    name: "Pullman Hanoi Hotel",
    rating: 4.1,
    price: 93,
    sale_price: 88,
    location: {
      lat: 21.0295445,
      lon: 105.82603,
    },
    address: "360 Kim Ma Street Hanoi 100000",
    description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
    location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
    features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
    room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
    thumb: "assets/img/hotel/thumb/img_8.jpg",
    images: [],
    services: [],
    numb_available_rooms: 5,
    reviews: [],
    rooms: []
  },
  {
    id: 4,
    name: "Windy Hotel",
    rating: 3.3,
    price: 37,
    sale_price: 35,
    location: {
      lat: 21.0260087,
      lon: 105.8321135,
    },
    address: "360 Kim Ma Street Hanoi 100000",
    description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
    location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
    features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
    room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
    thumb: "assets/img/hotel/thumb/img_8.jpg",
    images: [],
    services: [],
    numb_available_rooms: 5,
    reviews: [],
    rooms: []
  },
  {
    id: 5,
    name: "Capital Garden Hotel",
    rating: 4.1,
    price: 37,
    sale_price: 35,
    location: {
      lat: 21.0154663,
      lon: 105.8109217,
    },
    address: "360 Kim Ma Street Hanoi 100000",
    description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
    location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
    features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
    room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
    thumb: "assets/img/hotel/thumb/img_9.jpg",
    images: [],
    services: [],
    numb_available_rooms: 5,
    reviews: [],
    rooms: []
  },
  {
    id: 6,
    name: "Hotel Nikko Hanoi",
    rating: 4.1,
    price: 37,
    sale_price: 35,
    location: {
      lat: 21.0179794,
      lon: 105.8397699,
    },
    address: "360 Kim Ma Street Hanoi 100000",
    description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
    location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
    features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
    room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
    thumb: "assets/img/hotel/thumb/img_10.jpg",
    images: [],
    services: [],
    numb_available_rooms: 5,
    reviews: [],
    rooms: []
  },
  {
    id: 7,
    name: "Parkside Sunline Hotel",
    rating: 4.0,
    price: 104,
    sale_price: 47,
    location: {
      lat: 21.0084391,
      lon: 105.8452307,
    },
    address: "360 Kim Ma Street Hanoi 100000",
    description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
    location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
    features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
    room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
    thumb: "assets/img/hotel/thumb/img_11.jpg",
    images: [],
    services: [],
    numb_available_rooms: 5,
    reviews: [],
    rooms: []
  },
  {
    id: 8,
    name: "Pullman Hanoi Hotel",
    rating: 4.1,
    price: 93,
    sale_price: 0,
    location: {
      lat: 21.032786,
      lon: 105.812913,
    },
    address: "360 Kim Ma Street Hanoi 100000",
    description: "Family-friendly Hanoi hotel in Ba Dinh, near Ho Chi Minh Mausoleum ",
    location_text: "This family-friendly Hanoi hotel is located in the business district, within 1 mi (2 km) of Thu Le Park, Vietnam Museum of Ethnology, and Giang Vo Exhibition Center. Ho Chi Minh Mausoleum and Temple of Literature are also within 2 mi (3 km). ",
    features: "Along with 3 restaurants, this hotel has a full-service spa and an outdoor pool. Free WiFi in public areas and free valet parking are also provided. Other amenities include a nightclub, a health club, and a bar/lounge. ",
    room_amenities: "All 411 rooms feature thoughtful touches like bathrobes and slippers, plus free WiFi, free wired Internet, and LCD TVs with satellite channels. Guests will also find sitting areas, 24-hour room service, and minibars. ",
    thumb: "assets/img/hotel/thumb/img_8.jpg",
    images: [],
    services: [],
    numb_available_rooms: 5,
    reviews: [],
    rooms: []
  }
]
