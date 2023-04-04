const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20);
        const camp = new Campground({
			author: '6251c2605381df42389fe92d',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
			//image:'https://source.unsplash.com/collection/483251', 
			description:'lorem ipsum ewrwerewrew wew rytryrtyr ty',
			price: price,
			geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
							  cities[random1000].longitude ]
            },
			images:[
				{
					url: 'https://res.cloudinary.com/dpib6cjvm/image/upload/v1650625529/YelpCamp/whrv3ycf55oi0aedu01e.jpg',
					filename: 'whrv3ycf55oi0aedu01e'
				},
				{
					url: 'https://res.cloudinary.com/dpib6cjvm/image/upload/v1650617286/YelpCamp/fxds43ehs1t4fciotkqk.jpg',
					filename: 'fxds43ehs1t4fciotkqk'
				}
			
			]
        })
        await camp.save();	
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})