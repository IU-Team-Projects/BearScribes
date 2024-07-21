const handleImageLoad = (
    coverImage: HTMLImageElement,
    infoBlock: HTMLDivElement,
) => {
    const updateDimensions = () => {
        const imageHeight = coverImage.clientHeight;
        const imageWidth = coverImage.clientWidth;

        infoBlock.style.height = `${imageHeight}px`;
        infoBlock.style.width = `${imageWidth}px`;
    };

    coverImage.onload = updateDimensions;

    if (coverImage.complete) {
        updateDimensions();
    }
};

export default handleImageLoad;
