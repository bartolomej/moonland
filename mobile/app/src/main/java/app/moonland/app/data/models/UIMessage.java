package app.moonland.app.data.models;

/**
 * Data structure that represents a error/info/warning UI message.
 */
public class UIMessage {

    public int title;
    public int description;
    public int imageResource;

    public UIMessage(int title, int description) {
        this.title = title;
        this.description = description;
    }

    public UIMessage(int title, int description, int image) {
        this.title = title;
        this.description = description;
        this.imageResource = image;
    }
}
