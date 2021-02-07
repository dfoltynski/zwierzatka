import axios from "axios";

const randomizeOwner = async () => {
    const res = await axios.get("https://randomuser.me/api/");

    const owner = res.data.results[0];

    return {
        email: owner.email,
        password: "secret_password",
        owner_name: owner.name.first + " " + owner.name.last,
        owner_birth: owner.dob.date.split("T")[0],
        owner_gender: owner.gender,
        profile_picture: owner.picture.large,
    };
};

export default randomizeOwner;
