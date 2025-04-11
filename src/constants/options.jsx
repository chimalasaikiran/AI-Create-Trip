
export const SelectTravelesList =[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'🚶‍♂️',
        people:'1'
    },
    {
        id:1,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🧑‍🤝‍🧑',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'👨‍👩‍👧‍👦',
        people:'3 to 5 people'
    },
    {
        id:1,
        title:'Friends',
        desc:'A bunch of thriill-seekes',
        icon:'👯',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'low',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont Worry about cost',
        icon:'🤑',
    },
]

export const AI_PROMPT='Generate Travel Plane for Location: {location}, for {totalDays}, for {traveler} with a {budget} budget ,give me a Hotels options list with HotelName,Hotal address,price,hotal image url,geo coordinates,rating,descriptions and suggest itinerary with placeName,place Details,place image Url,Geo coordinates,ticket pricing,Time travel each of the location for day:{totalDays} Days with each day plan with best time to vist in json format.';