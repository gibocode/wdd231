class Gallery {

    constructor(file, name) {
        this.file = file;
        this.name = name;
    }

    createItem() {
        const imageWrapper = document.createElement("div");
        const image = document.createElement("img");

        imageWrapper.className = "gallery-image-wrapper";
        image.className = "gallery-image";

        image.src = `./images/${this.file}`;
        image.alt = this.name;
        image.loading = "lazy";
        image.width = 600;
        image.height = 400;

        imageWrapper.appendChild(image);

        return imageWrapper;
    }
}

export function getGalleryImages() {
    const galleryContainer = document.querySelector("#gallery-container");
    for (let i = 1; i <= 8; i++) {
        const gallery = new Gallery(`gallery${i}.webp`, `Gallery Image ${i}`);
        const item = gallery.createItem();
        galleryContainer.appendChild(item);
    }
}
