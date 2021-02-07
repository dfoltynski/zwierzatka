import breedList from "./breedList";

const randomizePetBreed = () => {
    const randomBreed = Math.floor(Math.random() * 58 + 0);
    return breedList[randomBreed];
};

export default randomizePetBreed;
