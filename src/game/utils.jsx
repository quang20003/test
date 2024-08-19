export const getRandomPosition = (containerWidth, containerHeight) => {
    const x = Math.random() * (containerWidth - 50);
    const y = Math.random() * (containerHeight - 50);
    return { top: y * 100 / containerHeight, left: x * 100 / containerWidth };
};