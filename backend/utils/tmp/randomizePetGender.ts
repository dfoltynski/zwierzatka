import randomizePetBreed from "./randomizePetBreed";

const randomizePetGender = () => {
    return Math.floor(Math.random() * 10) % 2 ? "Male" : "Female";
};

export default randomizePetGender;
