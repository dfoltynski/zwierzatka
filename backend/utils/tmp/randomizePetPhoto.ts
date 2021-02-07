import axios from "axios";

import breedList from "./breedList";

interface Photo {
    data: { message: string };
}

const randomizePetPhoto = async () => {
    const randomBreed = Math.floor(Math.random() * 58 + 0);
    const photo: Photo = await axios.get(
        `https://dog.ceo/api/breed/${breedList[randomBreed]}/images/random`
    );

    return photo.data.message;
};

export default randomizePetPhoto;
