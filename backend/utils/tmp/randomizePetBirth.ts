const randomizePetBirth = (start: Date, end: Date) => {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
        .toISOString()
        .split("T")[0];
};

export default randomizePetBirth;
