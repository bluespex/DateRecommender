import { Router } from 'express';
import axios, { AxiosResponse } from 'axios';

// Export module for registering router in express app
export const router: Router = Router();

const placesApiKey = "AIzaSyBI4nu6i39AMcIS6AbkWJMOSKAHacMyHEM";

// Define your routes here
router.post("/api/recommend", async (req, res) => {
    const data = req.body;
    console.log(data);
    let latitude = data.startingLatitude
    let longitude = data.startingLongitude

    let foodPlace: AxiosResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=event&inputtype=textquery&locationbias=point:${latitude},${longitude}&fields=formatted_address,name,rating,geometry&key=${placesApiKey}`);
    let eventPlace: AxiosResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=event&inputtype=textquery&locationbias=point:${latitude},${longitude}&fields=formatted_address,name,rating,geometry&key=${placesApiKey}`);

    let locations = {
        "food" : foodPlace.data,
        "event" : eventPlace.data
    }
    console.log(locations)
    return res.status(200).send({
        "food" : foodPlace.data.candidates,
        "event" : eventPlace.data.candidates
    });
});

